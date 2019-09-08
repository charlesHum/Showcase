const bcrypt = require('bcrypt');
const saltRounds = 15;


function hashPassword(password){
  return new Promise(function(resolve,reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) reject(err)
      bcrypt.hash(password, salt, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
      });
    });
  })
}

module.exports = hashPassword;
