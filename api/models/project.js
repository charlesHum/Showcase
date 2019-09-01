const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    name: {
        type: String
    },
    description: {
      type: String
    },
    imgpath: {
      type: String
    },
    createdAt: {
       type: Date, required: true, default: Date.now
    }
},{
    collection: 'project'
    }
);

module.exports = mongoose.model('project', Project);
