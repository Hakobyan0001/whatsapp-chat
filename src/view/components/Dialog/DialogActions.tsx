import { DialogActions, Button } from "@mui/material";

interface IDgActions {
  handleNewChat: () => Promise<void>;
  setInitialState: () => void;
}

export default function DgActions({
  handleNewChat,
  setInitialState,
}: IDgActions) {
  return (
    <DialogActions>
      <Button onClick={setInitialState}>Cancel</Button>
      <Button onClick={handleNewChat}>Create</Button>
    </DialogActions>
  );
}
