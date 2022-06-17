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
  }
})

export default listSlice.reducer;