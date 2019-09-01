const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./DB');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);
const msgRoute = require('./routes/message.route');
const projectRoute = require('./routes/project.route');


const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/msg', msgRoute);
app.use('/project', projectRoute);

// app.use('/company', companyRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
