const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const session = require('express-session');
const bodyParser = require('body-parser');
const redisStore = require('connect-redis')(session);
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const { errorsMiddleware } = require('./middlewares/errors.middleware');
const { SESSION_COOKIE_MAX_AGE } = require('./constants/constants');

require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

const client = redis.createClient();

//app start
const app = express();

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new redisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      client: client,
    }),
    cookie: {
      httpOnly: true,
      maxAge: SESSION_COOKIE_MAX_AGE,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.use(errorsMiddleware);

app.listen(3000, () => console.log('Server started'));
