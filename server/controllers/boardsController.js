const Board = require("../models/board");
const List = require("../models/list")
const Card = require("../models/card")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").populate("lists").then((boards) => {
    res.json(boards);
  });
};

const getBoard = (req, res, next) => {
  let id = req.params.id;
  Board.findById(id).populate({path: 'lists', populate: { path: 'cards'}}).then((board) => {
    res.json(board);
  }).catch((e) => {
    console.error(e);
  })
};

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        res.json({
          title: board.title,
          _id: board._id,
          createdAt: board.createdAt,
          updatedAt: board.updatedAt,
        });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
exports.getBoard = getBoard;
