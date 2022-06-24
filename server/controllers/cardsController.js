// const Board = require("../models/board");
const List = require("../models/list")
const Card = require("../models/card")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getCard = (req, res, next) => {
  let id = req.params.id;
  Card.findById(id).then(card => {
    res.json(card);
  }).catch(e => {
    console.error(e);
  })
}

const createCard = (req, res, next) => {
  const errors = validationResult(req);

  const { card, listId } = req.body;
  if (errors.isEmpty()) {
    Card.create({ title: card.title, listId, boardId: req.boardId })
      .then((card) => {
        req.card = card
        next()
      })
      .catch((err) => {
        next(new HttpError("Creating card failed, please try again", 500))
      });
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};


const sendCard = (req, res, next) => {
  const cardId = req.card._id;
  Card.findById(cardId).then((card) => {
    res.send(card)
  });
}

exports.getCard = getCard;
exports.createCard = createCard;
exports.sendCard = sendCard;