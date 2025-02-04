import { Box, Avatar, Typography, styled } from "@mui/material";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export default function ChatWindowHeader() {
  const { chat } = useSelector((state: RootState) => state.chat);

  return (
    <StyledChatWindowHeader>
      <Avatar
        sx={{ mr: 2 }}
        src={chat!.avatar || "/default-avatar.png"}
      ></Avatar>
      <Typography variant="h6">{chat!.name}</Typography>
    </StyledChatWindowHeader>
  );
}

const StyledChatWindowHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ddd",
  height: "60px",
  padding: "8px",
});
