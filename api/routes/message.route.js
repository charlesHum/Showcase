const express = require('express'),
      app = express(),
      jwtAuth = require('../services/authService'),
      messageRoutes = express.Router(),
      Message = require('../models/message'),
      { RateLimiterMemory } = require('rate-limiter-flexible'),
      authService = require('../services/authService');

const opts = {
  points: 2, // 2 points
  duration: 1, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);

messageRoutes.route('/').get(authService, function(req,res){
  Message.find(function(err, messages){
      if(err){console.log(err)}
      else{
      res.json(messages);
      }
  })
})

messageRoutes.route('/add').post( function (req, res) {
  let message = new Message();
  rateLimiter.consume(req.headers.host, 2) // consume 2 points
    .then((rateLimiterRes) => {
      message.name = req.body.name;
      message.email = req.body.email;
      message.content = req.body.content;
      message.save().then(_ => {
        res.status(200).json('Success');
      }).catch(err => res.status(512).json('Saving message went wrong, try other way of communication'))
    })
    .catch((rateLimiterRes) => {
      res.status(512).send(new Error('Overloaded'));
    });
});

messageRoutes.route('/:id').delete(jwtAuth, function (req, res) {
  Message.findByIdAndDelete(req.params.id, (err, succ) => {
    if(succ){
      res.send(true);
    }
  })
});

module.exports = messageRoutes;
