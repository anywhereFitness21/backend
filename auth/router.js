const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const Users = require('../users/userModel');

const router = express.Router();

//register (POST) --> for endpoint beginning --> endpoint with /api/auth
router.post('/register', middleware.registerVerification, (req, res) => {
  //add here
  const newUser = req.body;

  //create the hash for 'password' using bcrypt
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  Users.addUser(newUser)
    .then(user => {
    

      const token = signToken(user); //invoke the function and pass in the 'user'
      res.status(200).json({ user: { id: user.id, username: user.username, email: user.email, role: user.role, token: token, message: `Welcome, ${user.username}. Thanks for registering as an ${user.role} today! ` } });
    })
    .catch(error => {
      console.log('inside authRouter error', error);
      res.status(500).json({ message: 'Sorry, no new user created on the server', error });
    });
});

//login (POST) endpoint with /api/auth
router.post('/login', (req, res) => {

  const { username, password, role } = req.body;

  Users.findBy(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ user: { id: user.id, message: `Welcome ${user.username}. Thank you for being our ${user.role} today! `, username: user.username, email: user.email, role: user.role, token: token } });
      } else {
        res.status(401).json({ message: 'Sorry, Invalid credentials' });
      }
    })
    .catch(error => {
      // console.log('inside authRouter findBy error', error);
      res.status(500).json({ message: 'Sorry, login not working on the server', error });
    });
});

function signToken(user) {
  const payload = {
    //data to store in token payload
    user
  };

  const options = {
    expiresIn: '1d'
  };

  //return and extract the secret away so it can required and used where needed
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;