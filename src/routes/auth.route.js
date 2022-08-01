const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { UnauthorizedError } = require('../errors/errors');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return next(new UnauthorizedError());
  }

  const user = await userModel.findOne({
    username,
  });

  const doesPasswordsMatch = await bcrypt.compare(password, user.password);

  if (doesPasswordsMatch) {
    req.session.regenerate((err) => {
      if (err) next(err);
      req.session.user = user._id;
      req.session.save((err) => {
        if (err) return next(err);
        res.status(200).send({ success: true });
      });
    });
  } else {
    next(new UnauthorizedError());
  }
});

router.post('/logout', authMiddleware, (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.status(200).send({ success: true });
  });
});

module.exports = router;
