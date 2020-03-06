// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//Db setup
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://myUserAdmin:1@localhost:27017/auth?authSource=admin',
                  { useNewUrlParser: true, useCreateIndex: true},
                  (error) => {
                    if(error) console.log("error -> ",error)
                  }
                );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected! to db");
});

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server setup
const port = process.env.PORT || 3099;
const server = http.createServer(app);
server.listen(port);

console.log(`Server listening on port: ${port}`);