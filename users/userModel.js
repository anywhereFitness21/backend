const db = require('../database/dbconfig');

module.exports = {
  //export helper functions to 'authRouter'
  getUsers,
  getUserById,
  findBy,
  addUser,
  updateUser,
  deleteUser
};

//getUsers --> get all 'users'
function getUsers() {
  return db('users');
}

//getUserById --> get a single user by their 'id'
function getUserById(id) {
  return db('users')
    .where('id', id)
    .first();
}

//findBy --> login --> find a specific user by 'username'
function findBy(user) {
  return db('users')
    .where('username', user)
    .first();
}

//addUser --> create a new user
function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      // console.log(ids);
      return getUserById(ids[0]);
    });
}

// updates a user

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => getUserById(id))
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}