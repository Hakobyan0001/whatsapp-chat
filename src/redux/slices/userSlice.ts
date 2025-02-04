import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  idInstance: string;
  apiTokenInstance: string;
}

const initialState: IUser = { idInstance: "", apiTokenInstance: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    clearUser: (state) => {
      state.idInstance = "";
      state.apiTokenInstance = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
