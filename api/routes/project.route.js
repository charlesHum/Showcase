const express = require('express');
const app = express();
const projectRoutes = express.Router();
const mongoose = require('mongoose');
const { RateLimiterMemory } = require('rate-limiter-flexible');
let Project = require('../models/project')

const opts = {
  points: 2, // 2 points
  duration: 1, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);

projectRoutes.route('/').get( function(req,res){
  Project.find(function(err, projects){
      if(err){console.log(err)}
      else{
      res.json(projects);
      }
  })
})


projectRoutes.route('/add').post( function (req, res) {
  let project = new Project();
  rateLimiter.consume(req.headers.host, 2) // consume 2 points
    .then((rateLimiterRes) => {
      project.name = req.body.name;
      project.description = req.body.description;
      project.img = req.body.img;
      // TODO IMG
      project.save().then(_ => {
        res.status(200).json('Success');
      }).catch(err => res.status(512).json('Saving project went wrong'))
    })
    .catch((rateLimiterRes) => {
      res.status(512).send(new Error('Overloaded'));
    });
});

projectRoutes.route('/id').delete( function (req, res) {
    console.log(req);
    Project.find({_id: 1}).remove().exec();

});

module.exports = projectRoutes;
