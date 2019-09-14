 const express = require('express'),
      app = express(),
      userRoutes = express.Router(),
      mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      config = require('../config'),
      nJwt = require('njwt'),
      { RateLimiterMemory } = require('rate-limiter-flexible');

let User = require('../models/user');

const opts = {
  points: 2, // 2 points
  duration: 1, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);

userRoutes.route('/login').post( function(req,res){
  rateLimiter.consume(req.headers.host, 2)
    .then((rateLimiterRes) => {
  User.find({email: req.body.email}, (err, user) => {
    if(user.length > 0){
      bcrypt.compare(req.body.password, user[0].password, function(err, valid) {
        if(valid){
          var jwt = nJwt.create({ id: user.id }, config.secret);
          jwt.setExpiration(new Date().getTime() + (24*60*60*1000));
          res.status(200).send({ auth: true, token: jwt.compact() });
        }
        else{
          res.status(400).json(false);
        }
      });
    }
    else{
      res.status(400).json(false);
    }
  })
  }).catch((rateLimiterRes) => {
    res.status(512).send(new Error('Overloaded'));
  });
})

userRoutes.route('/delete').post( function(req,res){
  rateLimiter.consume(req.headers.host, 2)
    .then((rateLimiterRes) => {
  User.find({email: req.body.email}, (err, user) => {
    if(user.length > 0){
      bcrypt.compare(req.body.password, user[0].password, function(err, valid) {
        if(valid){
          User.findByIdAndDelete(user[0]._id, (err, res) => {
            if (err) console.log(err)
            else res.status(200).send('success');
          });
        }
        else{
          res.status(400).json(false);
        }
      });
    }
    else{
      res.status(400).json(false);
    }
  })
  }).catch((rateLimiterRes) => {
    res.status(512).send(new Error('Overloaded'));
  });
})

module.exports = userRoutes;
