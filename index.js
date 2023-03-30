const express = require('express');
const app = express();
const port = 3000;
const passport = require("passport");
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(passport.initialize());


const JWT_SECRET = 'my_secret_key';


const JWT_OPTIONS = {
  expiresIn: '1h',
};


const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  
  const user = getUserById(jwt_payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (isValidUser(username, password)) {
    const user = { id: getUserId(username) };
    
    const token = jwt.sign(user, JWT_SECRET, JWT_OPTIONS);
    res.json({ token: token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/api/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 + num2;
    res.send(result.toString());
  }
});

app.get('/api/subtract', passport.authenticate('jwt', { session: false }), (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 - num2;
    res.send(result.toString());
  }
});

app.get('/api/multiply', passport.authenticate('jwt', { session: false }), (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 * num2;
    res.send(result.toString());
  }
});

app.get('/api/divide', passport.authenticate('jwt', { session: false }), (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('the parameters are not valid');
  } else {
    const result = num1 / num2;
    res.send(result.toString());
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


function getUserById(id) {
  const users = [
    { id: 1, name: 'YYC', password: 'password1'},
    { id: 2, name: 'lS', password: 'password2' },
    { id: 3, name: 'WA', password: 'password3' },
    ];
    return users.find(user => user.id === id);
    }
    
    function isValidUser(username, password) {
    const users = [
    { id: 1, name: 'YYC', password: 'password1' },
    { id: 2, name: 'LS', password: 'password2' },
    { id: 3, name: 'WA', password: 'password3' },
    ];
    const user = users.find(user => user.name === username && user.password === password);
    return !!user;
    }
    
    function getUserId(username) {
    const users = [
    { id: 1, name: 'YYC', password: 'password1' },
    { id: 2, name: 'LS', password: 'password2' },
    { id: 3, name: 'WA', password: 'password3' },
    ];
    const user = users.find(user => user.name === username);
    return user.id;
    }
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
