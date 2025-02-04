import { Dialog, DialogTitle, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import greenApiService from "../../../services/GreenApiService";
import { IChat } from "../../../types";
import { handleDialog } from "../../../redux/slices/dialogSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import DgActions from "./DialogActions";
import { addChat } from "../../../redux/slices/chatSlice";

export default function DialogComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const { isOpen } = useSelector((state: RootState) => state.dialog);
  const [validationError, setValidationError] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  async function handleNewChat(): Promise<void> {
    if (phoneNumber) {
      const response = await greenApiService.validateWhatsAppNumber(
        phoneNumber
      );

      if (response.success && response.exists) {
        const contactInfo = await greenApiService.getContactInfo(phoneNumber);
        const chatMessages = await greenApiService.getChatMessages(
          contactInfo.chatId
        );

        const lastMessage =
          chatMessages.length > 0
            ? chatMessages[chatMessages.length - 1].textMessage
            : "";
        const unreadCount = 0;
        const newChat: IChat = {
          id: contactInfo.chatId,
          name: contactInfo.name,
          avatar: contactInfo.avatar || null,
          lastMessage,
          unreadCount,
          messages: chatMessages,
        };

        dispatch(addChat(newChat));
        setInitialState();
      } else {
        setValidationError("Invalid or unregistered phone number.");
      }
    }
  }

  function setInitialState(): void {
    setPhoneNumber("");
    dispatch(handleDialog(false));
    setValidationError("");
  }

  return (
    <Dialog open={isOpen} onClose={setInitialState}>
      <DialogTitle>New Chat</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Phone Number"
          type="text"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={!!validationError}
          helperText={validationError}
        />
      </DialogContent>
      <DgActions
        handleNewChat={handleNewChat}
        setInitialState={setInitialState}
      />
    </Dialog>
  );
}
