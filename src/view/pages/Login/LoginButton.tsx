import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setUser } from "../../../redux/slices/userSlice";
import { validateLoginThunk } from "../../../redux/thunks/validateLoginThunk ";
import { useNavigate } from "react-router-dom";

interface ILoginButton {
  idInstance: string;
  apiTokenInstance: string;
}
export default function LoginButton({
  idInstance,
  apiTokenInstance,
}: ILoginButton) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.login);

  function handleLogin(): void {
    dispatch(validateLoginThunk({ idInstance, apiTokenInstance })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(setUser({ idInstance, apiTokenInstance }));
          navigate("/chatPage");
        }
      }
    );
  }

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 2 }}
      onClick={handleLogin}
      disabled={!idInstance.trim() || !apiTokenInstance.trim()}
    >
      {loading ? "Загружается..." : "Войти"}
    </Button>
  );
}
