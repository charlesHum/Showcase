const express = require('express'),
      app = express(),
      projectRoutes = express.Router(),
      multer = require('multer'),
      fs = require('fs'),
      PATH = './uploads/project',
      mongoose = require('mongoose'),
      { RateLimiterMemory } = require('rate-limiter-flexible');
let Project = require('../models/project')

const opts = {
  points: 2, // 2 points
  duration: 1, // Per second
};
const rateLimiter = new RateLimiterMemory(opts);


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  limits: { fileSize: 10485760 },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const name = file.fieldname + '-' + Date.now() + '.' + ext;
    cb(null, name);
    return name;
  }
});

let upload = multer({
  storage: storage
});

projectRoutes.route('/').get( function(req,res){
  Project.find(function(err, projects){
      if(err){console.log(err)}
      else{
      res.json(projects);
      }
  })
})

projectRoutes.route('/getPic/:imagepath').get( function(req,res){
  Project.find(function(err, projects){
    if(err){console.log(err)}
    else{
      res.json(projects);
      fs.readFile(PATH + '/' + req.param.imagepath, (err, data) => {
        console.log(data);
      })
      // res.sendFile();
      // todo nowy observable
      // napierdol json a pozniej filesem dla kazdego innego
      // a pozniej done
      // todo dostarczyc filesy
    }
  })
})


projectRoutes.route('/addPic').post(upload.single('image'), function (req, res) {
  if (!req.file) {
    return res.send(
      false
    );
  } else {
    res.status(200).json(req.file.filename);
  }
});


projectRoutes.route('/add').post(function (req, res) {
  let project = new Project();
  rateLimiter.consume(req.headers.host, 2) // consume 2 points
    .then((rateLimiterRes) => {
      project.name = req.body.name;
      project.description = req.body.description;
      project.imgpath = req.body.filename;
      project.save().then(project => {
        res.status(200).json(project);
      }).catch(err => {
        fs.unlink(PATH + req.body.filename, (err) => console.log(err));
        res.status(512).json('Saving project went wrong')
      })
    })
    .catch((rateLimiterRes) => {
      fs.unlink(PATH + req.body.filename, (err) => console.log(err));
      res.status(512).send(new Error('Overloaded'));
    });
});

projectRoutes.route('/:id').delete( function (req, res) {

  Project.findById(req.params.id, (err, succ) => {
    if(succ){
      if(succ.imgpath){
        fs.unlink(PATH + '/' + succ.imgpath, (err) => console.log(err));
      }
      Project.findByIdAndDelete(req.params.id, (err, succ) => {
        res.send(true);
      })
    }
  })
});

module.exports = projectRoutes;
