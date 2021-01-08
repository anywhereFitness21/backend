const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/router');
const classRouter = require('../classes/classRouter');
const userRouter = require('../users/userRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

//initial get request to make sure api/ server up and running
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Api and server are up and running!' });
});

//routes go below
server.use('/api/auth', authRouter);
server.use('/api/classes', classRouter);
server.use('/api/users', userRouter);

module.exports = server;