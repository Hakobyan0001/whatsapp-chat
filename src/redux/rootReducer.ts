import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import dialogReducer from "./slices/dialogSlice";
const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  chat: chatReducer,
  dialog: dialogReducer,
});

export default rootReducer;
