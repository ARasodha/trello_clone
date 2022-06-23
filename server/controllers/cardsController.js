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
  console.log(errors);
  console.log(req.body)
  const { card, listId } = req.body;
  if (errors.isEmpty()) {
    console.log('INSIDE FIRST BLOCK')
    Card.create({title: card.title, listId })
      .then((card) => {
        console.log(card)
        req.card = card
        next()
      })
      .catch((err) =>
        next(new HttpError("Creating card failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const addBoardIdToCard = (req, res, next) => {
  const cardId = req.card._id;
  const listId = req.card.listId;
  const list = List.findById(listId);
  Card.findByIdAndUpdate(cardId, { boardId: list.boardId });
}

exports.getCard = getCard;
exports.createCard = createCard;
exports.addBoardIdToCard = addBoardIdToCard;