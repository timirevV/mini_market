import { styled, TextField } from "@mui/material";

export const SubmitInput = styled(TextField)`
  display: block;
  width: 100%;
  margin-bottom: 10;
  font-size: 16px;
  border-radius: 8px;
  outline: none;

  & .MuiOutlinedInput-root {
    width: -webkit-fill-available;
  }
`;