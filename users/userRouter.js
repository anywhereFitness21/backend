const express = require('express');
const Users = require('../users/userModel');
const restricted = require('../auth/restricted-middleware');
const router = express.Router();

//getUsers from /api/users

router.get('/', (req, res) => {
  //add logic here
  Users.getUsers()
    .then(users => {
      // console.log('inside all getUsers', users);
      res.status(200).json(users);
    })
    .catch(error => {
      console.log('get users error', error);
      res.status(500).json({ message: 'No users returned from the server', error });
    });
});

//getUserById
//returns a list of a single 'user' by 'id' from /api/user /: id
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  Users.getUserById(userId)
    .then(user => {
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: `User with ${userId} not found` });
      }
    })
    .catch(error => {
      console.log('get user by Id error', error);
      res.status(500).json({ message: 'No user with that id returned from the server', error });
    });
});

// PUT(Updates user)
router.put('/:id', (req, res) => {
  Users.updateUser(req.params.id, req.body)
    .then(user => {
      console.log(req.body);
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'Server error, something went wrong' });
    });
});

//DELETE User
router.delete('/:id', (req, res) => {
  const deletedId = req.params.id;

  Users.deleteUser(deletedId)
    .then(user => {
      res.status(200).json(`id ${deletedId} was deleted`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error within the server' });
    });
});

module.exports = router;