import { List, styled, Box, IconButton } from "@mui/material";
import ChatListHeader from "./ChatListHeader";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ChatListItem from "./ChatListItem";
import { clearUser } from "../../../redux/slices/userSlice";

export default function ChatList() {
  const dispatch = useDispatch<AppDispatch>();
  const { chat } = useSelector((state: RootState) => state.chat);

  return (
    <StyledChatBox>
      <ChatListHeader />
      {chat && (
        <List sx={{ paddingTop: "0px" }}>
          <ChatListItem key={chat.id} chat={chat} />
        </List>
      )}
      <Box sx={{ mt: "auto", textAlign: "center" }}>
        <IconButton onClick={() => dispatch(clearUser())}>Logout</IconButton>
      </Box>
    </StyledChatBox>
  );
}

const StyledChatBox = styled(Box)({
  borderRight: "1px solid #ddd",
  display: "flex",
  flex: "1",
  flexDirection: "column",
});
