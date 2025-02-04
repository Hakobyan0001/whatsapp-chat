import { styled, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import App from "../App";
import greenApiService from "../services/GreenApiService";

export default function Layout() {
  const navigate = useNavigate();
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.user
  );
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      greenApiService.setAuthParams({
        id: idInstance,
        apiToken: apiTokenInstance,
      });
      navigate("/");
    } else {
      navigate("/login");
    }
    setIsCheckingAuth(false);
  }, [idInstance, apiTokenInstance, navigate]);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <StyledLayout id="container">
      <App />
    </StyledLayout>
  );
}

const StyledLayout = styled(Box)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
