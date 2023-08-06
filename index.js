const express = require('express');
const app = express();
const path = require('path'); 
require('dotenv').config();
require('./server/routes/auth');
const session = require('express-session');

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userDetailRou = require('./server/routes/userDetails');
const passport = require('passport');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/userDetails', userDetailRou);

app.get('/', (req, res) => {
  res.send(`<a href = "/auth/google"> Authenticate with Google </a>`)
});

app.get('/auth/google', 
passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback',
passport.authenticate('google', {
      successRedirect:'/protected',
      failureRedirect: '/auth/failure'
})
)

app.get('/protected', (req, res) => {
  res.send('Hello');
})
app.get('/auth/failure', (req, res) => {
  res.send('Something went wrong...');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
