import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

export const modalWindowSlice = createSlice({
  name: "modalWindow",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalWindowSlice.actions;

export default modalWindowSlice.reducer;