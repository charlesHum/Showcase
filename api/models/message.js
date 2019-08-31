const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Message = new Schema({
    name: {
        type: String
    },
    email: {
      type: String
    },
    content: {
      type: String
    },
    createdAt: {
       type: Date, required: true, default: Date.now
    }
},{
    collection: 'message'
    }
);

module.exports = mongoose.model('message', Message);
