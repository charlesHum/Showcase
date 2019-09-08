
const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      bearerToken = require('express-bearer-token'),
      config = require('./DB');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
const msgRoute = require('./routes/message.route');
const projectRoute = require('./routes/project.route');
const userRoute = require('./routes/user.route');

const app = express();
app.use(cors());

app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/msg', msgRoute);
app.use('/project', projectRoute);
app.use('/auth', userRoute);

// app.use('/company', companyRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});


