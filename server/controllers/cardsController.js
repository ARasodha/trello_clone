// const Board = require("../models/board");
// const List = require("../models/list")
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

exports.getCard = getCard;