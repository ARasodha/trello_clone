import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const board = action.payload;
      const lists = board.lists; 
      const cards = [];
      lists.forEach(l => {
        console.log('from cards feature', l.cards)
        cards.push(...l.cards);
      })

      const filteredCards = state.filter(c => c.boardId !== board._id)
      return filteredCards.concat(cards);
    })
  }
})

export default cardSlice.reducer;