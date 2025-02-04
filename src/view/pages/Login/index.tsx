import { useState } from "react";
import { Container, styled } from "@mui/material";

import LoginHeader from "./LoginHeader";
import LoginInputs from "./LoginInputs";
import LoginButton from "./LoginButton";
import LoginError from "./LoginError";

export default function Login() {
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");

  return (
    <StyledContainer maxWidth="xs">
      <LoginHeader />
      <LoginInputs
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        setIdInstance={setIdInstance}
        setApiTokenInstance={setApiTokenInstance}
      />
      <LoginButton
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
      />
      <LoginError />
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)({
  padding: "16px",
  textAlign: "center",
  border: "1px solid #ddd",
  borderRadius: 2,
});
