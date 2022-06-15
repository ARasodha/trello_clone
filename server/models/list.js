const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  boardId: { type: Schema.Types.ObjectId, ref: 'Board'},
  cards: [{
    type: Schema.Types.ObjectId, 
    ref: 'Card'
  }]
})

const List = mongoose.model('List', ListSchema);

module.exports = List;