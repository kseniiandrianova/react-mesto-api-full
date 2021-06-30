require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const path = require('path');
const cookieParser = require('cookie-parser');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,

});

const options = {
  origin: [
    'https://kseniiamesto.students.nomoredomains.monster',
    'https://www.kseniiamesto.students.nomoredomains.monster',
    'https://api.kseniiamesto.students.nomoredomains.monster/users/me',
    'https://api.kseniiamesto.students.nomoredomains.monster',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/http(s)?:\/\/(www\.)?[a-zA-Z0-9-._~:\/?#[\]@!$&'()*\+,;=]{2,256}\.[a-z]{2,6}([a-zA-Z0-9-._~:\/?#[\]@!$&'()*\+,;=]{1,})?/),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), createUser);

app.use(auth);

app.use(routerUsers);
app.use(routerCards);
app.use(errorLogger);
app.use(errors());

app.all('/', (req, res, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.disable('x-powered-by');

app.listen(PORT);