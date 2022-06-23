import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

export const createList = createAsyncThunk(
  "lists/createBoard",
  async (newList, callback) => {
    const data = await apiClient.createList(newList);
    if (callback) {
      callback;
    }
    return data;
  }
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async (args) => {
    const {id, newTitle } = args;
    const payload = { title: newTitle }
    const data = await apiClient.updateList(id, payload)
    return data;
  }
)

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const filteredLists = state.filter(l => l.boardId !== action.payload._id);
      const {lists} = action.payload;

      const listsWithoutCards = lists.map(l => {
        const {cards, ...listWithoutCards} = l;
        return listWithoutCards;
      })
      return filteredLists.concat(listsWithoutCards)
    }),
    builder.addCase(createList.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    builder.addCase(updateList.fulfilled, (state, action) => {
      console.log(state)
      return state.map(list => {
        if (list._id === action.payload._id) {
          return action.payload;
        }

        return list;
      })
    })
  }
})

export default listSlice.reducer;