const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  description: {
    type: String,
  },
  listId: {
     type: Schema.Types.ObjectId,
      ref: 'List', 
      required: [true, 'The List Id is required']
  },
  boardId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Board',
    required: [true, 'The Board Id is required']
  },
  labels: {
    type: [ String ]
  }
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

// {
//   "_id": 9,
//   "title": "My new card",
//   "description": "",
//   "labels": [],
//   "listId": 13,
//   "position": 65535.0,
//   "archived": false,
//   "createdAt": "2020-10-08T17:54:55.285Z",
//   "updatedAt": "2020-10-08T17:54:55.285Z",
//   "dueDate": null,
//   "completed": false,
//   "boardId": 1,
//   "comments": [],
//   "actions": []
//   "commentsCount": 0
// }