const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash')
require('dotenv').config();

const User = require('./model/User');
let app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected To MongoDB');
  })
  .catch((err) => {
    console.error('Connection Error: ', err.message);
  });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(
  require('express-session')({
    secret: 'Rusty is a dog',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success')
    next();
})

// Showing home page
app.get('/', function (req, res) {
  res.render('home');
});

// Showing secret page
app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret');
});

// Showing register form
app.get('/register', function (req, res) {
  res.render('register');
});

// Handling user signup
app.post('/register', async (req, res) => {
  try {
    const user = await User.register(new User({ username: req.body.username }), req.body.password);

    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Showing Login Form
app.get('/login', function (req, res) {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/flash-test', (req, res) => {
  req.flash('error', 'Flash is working');
  res.redirect('/login');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}



let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server Has Started on ${port}`);
});
