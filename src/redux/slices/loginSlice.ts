import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { validateLoginThunk } from "../thunks/validateLoginThunk ";

export interface ILoginState {
  loading: boolean;
  error: string | null;
}

const initialState: ILoginState = {
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearLoginState(state) {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateLoginThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        validateLoginThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );
  },
});

export const { clearLoginState } = loginSlice.actions;
export default loginSlice.reducer;
