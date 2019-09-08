
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      email = process.argv[2],
      password = process.argv[3],
      validEmail = emailRegexp.test(email),
      config = require('./DB'),
      hashPass = require('./services/hashPass'),
      mongoose = require('mongoose'),
      User = require('./models/user');
      ;

if(password.length < 8){
  console.log('Password is too short');
}
else if(!validEmail){
  console.log('Email is not valid')
}
else{
  hashPass(password).then( hashed => {
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {
        console.log('Database is connected');
        User.find( {email: email} ,(err, user) => {
          if(err) mongoose.disconnect();
          if(user.length >= 1){
            console.log(' Email has been already registered ');
            mongoose.disconnect();
          }
          else{
            let user = new User();
            user.email = email;
            user.password = hashed;
            user.save().then( () => {
              console.log(' User succesfully created ');
              mongoose.disconnect();
            })
          }
        })
      },
      err => { console.log('Can not connect to the database'+ err)}
    );
  }).catch(err => console.log(err));
}
