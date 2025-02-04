import { useEffect } from "react";
import { Box, styled } from "@mui/material";
import ChatWindow from "../../components/ChatWindow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import ChatList from "../../components/ChatList";
import greenApiService from "../../../services/GreenApiService";
import { updateChat } from "../../../redux/slices/chatSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { chat } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    if (chat) {
      async function fetchMessages(): Promise<void> {
        const response = await greenApiService.receiveNotification();
        if (response.success && response.newMessage) {
          dispatch(updateChat(response.newMessage));
        }
      }

      const interval = setInterval(fetchMessages, 3000);
      greenApiService.clearMessagesQueue();

      return () => clearInterval(interval);
    }
  }, [dispatch, chat]);

  return (
    <>
      <StyledHome>
        <ChatList />
        <ChatWindow />
      </StyledHome>
    </>
  );
}

const StyledHome = styled(Box)(() => ({
  display: "flex",
  flexGrow: "4",
  height: "100%",
  borderTopLeftRadius: "15px",
  border: "1px solid #c7c7c7",
  overflow: "hidden",
}));
