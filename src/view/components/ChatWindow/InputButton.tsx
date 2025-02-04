import { SendOutlined, MicNoneOutlined } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

interface IInputButton {
  loading: boolean;
  message: string;
  sendMessage: () => void;
}
export default function InputButton({
  loading,
  message,
  sendMessage,
}: IInputButton) {
  const isButtonDisabled = loading || (!message && !loading);
  return (
    <Button disabled={isButtonDisabled} onClick={sendMessage}>
      {loading ? (
        <CircularProgress size={24} />
      ) : message ? (
        <SendOutlined sx={{ color: "black" }} />
      ) : (
        <MicNoneOutlined sx={{ color: "black" }} />
      )}
    </Button>
  );
}
