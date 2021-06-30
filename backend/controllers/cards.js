const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректный данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
      throw new ForbiddenError('Нельзя удалять чужую карточку');
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      }
      next(err);
    });
};
