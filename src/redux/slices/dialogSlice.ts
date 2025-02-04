import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDialogState {
    isOpen: boolean;
}

const initialState: IDialogState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    handleDialog(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { handleDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
