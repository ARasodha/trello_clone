import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";
import { fetchBoard } from "../boards/boards";

const initialState = [];

export const fetchCard = createAsyncThunk(
  "cards/fetchCard",
  async (id) => {
    console.log('id from fetchcard feature', id)
    const data = await apiClient.getCard(id);
    console.log('from fetchcard', data);
    return data;
  })

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
        cards.push(...l.cards);
      })

      const filteredCards = state.filter(c => c.boardId !== board._id)
      return filteredCards.concat(cards);
    })
    builder.addCase(fetchCard.fulfilled, (state, action) => {
      const found = state.find(c => c._id === action.payload._id);

      if (!found) {
        return state.concat(action.payload);
      }

      return state.map(b => {
        if (b._id === action.payload._id) {
          return action.payload;
        }

        return b;
      })
    })
  }
})

export default cardSlice.reducer;