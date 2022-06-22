const express = require("express");
const router = express.Router();
const boardsController = require("../controllers/boardsController");
const listsController = require("../controllers/listsController");
const cardsController = require("../controllers/cardsController");
const { validateBoard, validateList, validateUpdatedList } = require("../validators/validators");

router.get("/boards", boardsController.getBoards);

router.get("/boards/:id", boardsController.getBoard);

router.post("/boards", validateBoard, boardsController.createBoard);

router.post("/lists", validateList, listsController.createList, boardsController.addListToBoard, listsController.sendList);

router.put("/lists/:id", validateUpdatedList, listsController.updateList)

router.get("/cards/:id", cardsController.getCard);

module.exports = router;
