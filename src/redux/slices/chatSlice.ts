import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat, IMessage } from "../../types";

interface IChatSlice {
  chat: IChat | null;
}

const initialState: IChatSlice = {
  chat: null,
};

const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<IChat>) {
      state.chat = action.payload;
    },
    deleteChat(state) {
      state.chat = null;
    },
    updateChat(state, action: PayloadAction<IMessage>) {
      if (state.chat && state.chat.id === action.payload.chatId) {
        const isDuplicate = state.chat.messages.some(
          (msg) => msg.idMessage === action.payload.idMessage
        );
        if (!isDuplicate) {
          state.chat.messages.push(action.payload);
        }
      }
    },
  },
});

export const { addChat, updateChat, deleteChat } = chatsSlice.actions;

export default chatsSlice.reducer;
