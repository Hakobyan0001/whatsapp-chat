import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../slices/userSlice";
import greenApiService from "../../services/GreenApiService";

export const validateLoginThunk = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("login/validateLogin", async (userData, { rejectWithValue }) => {
  const { idInstance, apiTokenInstance } = userData;

  try {
    const result = await greenApiService.validateLogin({
      id: idInstance,
      apiToken: apiTokenInstance,
    });
    if (result.success) {
      return userData;
    } else {
      return rejectWithValue(result.error || "Invalid credentials");
    }
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
