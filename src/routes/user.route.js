const express = require('express');
const userModel = require('../models/user.model');
const { generateHashFromPassword } = require('../utils/password.utils');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { UnauthorizedError, InternalServerError, BadRequest } = require('../errors/errors');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { firstName, lastName, password, username } = req.body;

  if (!(firstName && lastName && password && username)) {
    return next(new UnauthorizedError());
  }

  const doesUserExist = await userModel.exists({
    username,
  });
  if (doesUserExist) {
    return next(new BadRequest('User already exists'));
  }

  try {
    const hashedPassword = await generateHashFromPassword(password);
    const createdUser = await userModel.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
    });

    const { password: createdUserPassword, ...userDetails } = createdUser.toObject();
    res.status(200).send(userDetails);
  } catch (err) {
    next(new InternalServerError());
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const users = await userModel.find().select('-password');
  res.status(200).send(users);
});

module.exports = router;
