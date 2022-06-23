const Board = require("../models/board");
const List = require("../models/list")
const Card = require("../models/card")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const sendList = (req, res) => {
  let list = req.list;
  res.json({
    _id: list._id,
    title: list.title,
    boardId: list.boardId,
    createdAt: list.createdAt,
    updatedAt: list.updatedAt
  });
}

const createList = (req, res, next) => {
  const errors = validationResult(req);
  const { list, boardId } = req.body;
  if (errors.isEmpty()) {
    List.create({title: list.title, boardId, cards: [] })
      .then((list) => {
        req.list = list
        next()
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

const updateList = (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  const list = req.body;
  if (errors.isEmpty()) {
    List.findByIdAndUpdate(id, {title: list.title})
      .then((list) => {
        res.json({
          _id: list._id,
          title: list.title,
          boardId: list.boardId,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt
        })
      })
    .catch((err) =>
        next(new HttpError("Editing list title failed, please try again", 500))
    );
  } else {
    return next(new HttpError("The edit list title field is empty.", 404));
  }
}

const addCardToList = (req, res, next) => {
  const cardId = req.card._id;
  const listId = req.card.listId;
  List.findByIdAndUpdate(listId, { $addToSet: { cards: cardId }}).then(() => next());
}

exports.createList = createList;
exports.sendList = sendList;
exports.updateList = updateList;
exports.addCardToList = addCardToList;

