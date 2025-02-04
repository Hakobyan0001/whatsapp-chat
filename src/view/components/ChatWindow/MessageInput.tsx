import { Box, TextField, styled } from "@mui/material";
import { AppDispatch, RootState } from "../../../redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import greenApiService from "../../../services/GreenApiService";
import InputButton from "./InputButton";
import { updateChat } from "../../../redux/slices/chatSlice";
import { IMessage } from "../../../types";

export default function MessageInput() {
  const dispatch = useDispatch<AppDispatch>();
  const { chat } = useSelector((state: RootState) => state.chat);

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function sendMessage(): Promise<void> {
    setLoading(true);
    const response = await greenApiService.sendMessage(chat!.id, message);
    
    if (response.success && response.idMessage) {
      const newMessage: IMessage = {
        chatId: chat!.id,
        idMessage: response.idMessage,
        type: "outgoing",
        textMessage: message,
      };

      dispatch(updateChat(newMessage));
      setMessage("");
    }
    setLoading(false);
  }

  return (
    <StyledMessageInput>
      <TextField
        fullWidth
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ border: "none", "& fieldset": { border: "none" } }}
      />
      <InputButton
        loading={loading}
        message={message}
        sendMessage={sendMessage}
      />
    </StyledMessageInput>
  );
}

const StyledMessageInput = styled(Box)({
  display: "flex",
  alignItems: "center",
  p: 2,
  backgroundColor: "#fff",
  border: "1px solid #ddd",
});
