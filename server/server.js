const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const { mongoose } = require('./db/indexDB');
const { Todo } = require('./db/models/todo');
const { User } = require('./db/models/user');
const authenticate = require('./middleware/middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url} Requested METH: ${req.method}`);
  next();
});
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/todos', (req, res) => {
  let todo = new Todo({ text: req.body.text });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.sendStatus(404);
    }
  );
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user.toJson());
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user.toJson());
});

let server = app.listen(port, (req, res) => {
  console.log(`server is Listening to port: ${server.address().port}`);
});
