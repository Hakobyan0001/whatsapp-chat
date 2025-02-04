import { Box, styled } from "@mui/material";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowMessages from "./ChatWindowMessages";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const { chat } = useSelector((state: RootState) => state.chat);

  return (
    <StyledChatWindow>
      {chat ? (
        <StyledBox>
          <ChatWindowHeader />
          <ChatWindowMessages />
          <MessageInput />
        </StyledBox>
      ) : (
        <Box sx={{ margin: "auto" }}>select or create chat</Box>
      )}
    </StyledChatWindow>
  );
};

export default ChatWindow;

const StyledChatWindow = styled(Box)({
  display: "flex",
  flex: "3",
  backgroundColor: "#f0f0f0",
  height: "100%",
});

const StyledBox = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
});
