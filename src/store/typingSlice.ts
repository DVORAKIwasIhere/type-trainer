import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LetterStatus } from "../models/letter";

interface TypingState {
  items: LetterObject[];
  currentLetterIndex: number;
}

export interface LetterObject {
  id: number;
  expectedLetter: string;
  status: LetterStatus;
  printedLetter: string;
}

const initialState: TypingState = {
  items: [],
  currentLetterIndex: 0,
};

let letterID = 0;

export const typerSlice = createSlice({
  name: "typer",
  initialState,
  reducers: {
    parseText: (state, action: PayloadAction<string>) => {
      state.items = action.payload.split("").map((letter) => {
        return {
          id: letterID++,
          expectedLetter: letter,
          status: LetterStatus.Absent,
          printedLetter: "",
        };
      });
    },
    printLetter: (state, action: PayloadAction<string>) => {
      state.items[state.currentLetterIndex].printedLetter = action.payload;
      
      console.log(state.items);
    },
    incrementCurrentLetterIndex: (state) => {
      state.currentLetterIndex += 1;
    },
    validateKey: (state) => {
      const currentItem = state.items[state.currentLetterIndex];
      currentItem.status =
      currentItem.printedLetter === currentItem.expectedLetter
          ? LetterStatus.Correct
          : LetterStatus.Wrong;
    },
  },
});

export const {
  parseText,
  printLetter,
  incrementCurrentLetterIndex,
  validateKey,
} = typerSlice.actions;

export default typerSlice.reducer;
