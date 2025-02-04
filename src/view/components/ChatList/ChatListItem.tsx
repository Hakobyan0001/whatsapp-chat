import {
  ListItemText,
  styled,
  ListItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { IChat } from "../../../types";
import Delete from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteChat } from "../../../redux/slices/chatSlice";
interface IChatListItem {
  chat: IChat;
}

export default function ChatListItem({ chat }: IChatListItem) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <StyledListItem key={chat.id}>
      <StyledAvatar
        src={chat.avatar || "/default-avatar.png"}
        alt={chat.name}
      />
      <ListItemText primary={chat.name} secondary={chat.lastMessage} />
      <IconButton onClick={() => dispatch(deleteChat())}>
        <Delete />
      </IconButton>
    </StyledListItem>
  );
}

const StyledListItem = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
});

const StyledAvatar = styled(Avatar)({
  width: 45,
  height: 45,
  borderRadius: "50%",
});
