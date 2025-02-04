import { Box, styled, Typography } from "@mui/material";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export default function ChatWindowMessages() {
  const { chat } = useSelector((state: RootState) => state.chat);
  return (
    <StyledChatWindowMessages>
      {chat!.messages.map((msg) => (
        <MessageContainer
          key={msg.idMessage}
          isOutgoing={msg.type === "outgoing"}
        >
          <StyledTypography isOutgoing={msg.type === "outgoing"}>
            {msg.textMessage}
          </StyledTypography>
        </MessageContainer>
      ))}
    </StyledChatWindowMessages>
  );
}

const StyledChatWindowMessages = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const MessageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isOutGoing",
})<{ isOutgoing: boolean }>(({ isOutgoing }) => ({
  display: "flex",
  justifyContent: isOutgoing ? "flex-end" : "flex-start",
  padding: "4px 8px",
}));

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isOutGoing",
})<{ isOutgoing: boolean }>(({ isOutgoing }) => ({
  maxWidth: "75%",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "14px",
  color: "#111",
  backgroundColor: isOutgoing ? "#DCF8C6" : "#FFF",
  boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
  position: "relative",
  wordWrap: "break-word",
}));
