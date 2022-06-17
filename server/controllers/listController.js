const Board = require("../models/board");
const List = require("../models/list")
const Card = require("../models/card")
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const createList = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    List.create(req.body)
      .then((body) => {
        res.json({
          _id: body.list._id,
          title: body.list.title,
          boardId: body.board,
          createdAt: body.list.createdAt,
          updatedAt: body.list.updatedAt
        });
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.createList = createList;

