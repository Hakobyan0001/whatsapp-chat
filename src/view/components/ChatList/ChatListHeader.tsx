import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Typography, IconButton, styled, Box } from "@mui/material";
import DialogComponent from "../Dialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { handleDialog } from "../../../redux/slices/dialogSlice";

export default function ChatListHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { chat } = useSelector((state: RootState) => state.chat);

  return (
    <>
      <StyledChatListHeader>
        <Typography variant="h6" sx={{ alignContent: "center" }}>
          Chats
        </Typography>
        <IconButton
          onClick={() => dispatch(handleDialog(true))}
          disabled={!!chat}
        >
          <AddCircleOutlineOutlined />
        </IconButton>
      </StyledChatListHeader>
      <DialogComponent />
    </>
  );
}

const StyledChatListHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid #ddd",
  height: "60px",
  padding: "10px",
});
