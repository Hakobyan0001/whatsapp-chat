import { Routes, Route } from "react-router-dom";

import { CssBaseline, styled, Box } from "@mui/material";
import routes from "./routes";

function App() {
  return (
    <StyledApp>
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled(Box)({
  width: "70%",
  height: "100%",
  padding: "50px 0",
});
