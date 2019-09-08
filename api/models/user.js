const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
      type: String
    },
    password: {
      type: String
    },
    createdAt: {
       type: Date, required: true, default: Date.now
    }
},{
    collection: 'user'
    }
);

module.exports = mongoose.model('user', User);
