// server.js 
//

// Set up
var express  = require('express');  
var app      = express();
var mongoose = require('mongoose');
var morgan   = require('morgan');                 // log requests tothe console
var bodyParser     = require('body-parser');      // pull information from HTML POST (express 4)
var methodOverride = require('method-override');  // simulate DELETE and PUT

// Configuration

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu'); // connect to Mongo DB

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// define model
var Todo = mongoose.model('Todo', {
  text : String
});

app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error, send it.
    if (err)
      res.send(err)
    res.json(todos); // Return all todos in JSON format
  });
});

// create todos
app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text, 
    done : false
  }, function(err, todo) {
    if (err)
      res.send(err);
    
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos);
    });
  });;
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
      if (err)
        res.send(err);
      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        res.json(todos);
      });
     });
});

// application
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

// listen (start app with node server.js
app.listen(8080);
console.log('App listening on port 8080');
