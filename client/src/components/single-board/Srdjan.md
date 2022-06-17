/*
state = {
boards: [{id:1, title}, {id:2, title}],
lists: [{_id: 1, title, boardId: 2}, {_id: 2, title, boardId:2}]
cards: []
}

http://localhost:3000

API.fetchBoards -> [{id:1, title}, {id:2, title}] // backend it returns boards where each board has _id, title, createdAt, updatedAt

API.fetchBoard(2) -> {_id: 2, title, lists: [{_id: 1, title, cards}, {_id: 2, title, cards: []}]}

Hard refresh

state = {
boards: [],
lists: [],
cards: []
}

// do this in board component logic 
const board = useSelector(state => state.boards).filter(b => b.id === id) // added after Srdjans talk
if (!board) {
return null;
}

/boards/2

API.fetchBoard(2) -> {_id: 2, title, lists: [{_id: 1, title, cards}, {_id: 2, title, cards: []}]}

In boardSlice fetchBoard.fulfilled

const found = state.find(b => b._id === action.payload._id(2))

const {lists, ...something} = action.payload;

action.payload = {
_id: 1,
title: "My title",
lists: []
}

const something = {_id: action.payload._id, title: action.payload.title}

if (!found) {
return state.concat(something)
} else return state;

state = {
boards: [{id:1, title}, {id:2 title}],
lists: [{_id: 1, title, boardId: 2}, {_id: 2, title, boardId:2}, {_id: 3, title, cards, boardId: 1}, {_id: 1, title, boardId: 2}, {_id: 2, title,}]
cards: []
}

/boards/2

API.fetchBoards() -> [{id:1, title}, {id:2 title}]

/boards/1

API.fetchBoard(1) -> {_id: 1, title, lists: [{_id: 3, title, cards}]}

Back to the root API.fetchBoards()

I click board 2
API.fetchBoard(2) -> {_id: 2, title, lists: [{_id: 1, title, cards}, {_id: 2, title, cards: []}]}

// filter the list to remove all lists from the board that you got from the server and then concatenate lists from the server

const filteredLists = state.filter(l => l.boardId !== action.payload._id(2))
const {lists} = action.payload;
const listsWithoutCards = lists.map(l => {
const {cards, ...listWithoutCards} = l;
return listWithoutCards;
})
return filteredLists.concat(listsWithoutCards)

Friday:
board.lists.push(listId)
board.save(done)

*/