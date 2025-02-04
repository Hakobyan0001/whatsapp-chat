import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function LoginError() {
  const { error } = useSelector((state: RootState) => state.login);

  return (
    error && (
      <Typography color="error" sx={{ mt: 1 }}>
        {error}
      </Typography>
    )
  );
}
