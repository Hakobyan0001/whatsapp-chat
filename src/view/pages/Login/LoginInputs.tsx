import { TextField } from "@mui/material";

interface ILoginInputs {
  idInstance: string;
  apiTokenInstance: string;
  setIdInstance: (id: string) => void;
  setApiTokenInstance: (apiToken: string) => void;
}
export default function LoginInputs({
  idInstance,
  apiTokenInstance,
  setIdInstance,
  setApiTokenInstance,
}: ILoginInputs) {
  return (
    <>
      <TextField
        label="ID Instance"
        fullWidth
        margin="normal"
        value={idInstance}
        onChange={(e) => {
          setIdInstance(e.target.value);
        }}
      />
      <TextField
        label="API Token Instance"
        fullWidth
        margin="normal"
        type="password"
        value={apiTokenInstance}
        onChange={(e) => {
          setApiTokenInstance(e.target.value);
        }}
      />
    </>
  );
}
