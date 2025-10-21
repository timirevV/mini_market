import { Button, Input, styled, TextField } from "@mui/material";

export const SubmitButton = styled(Button)`
  margin-top: 10;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #1976d2;
  color: #fff;
  cursor: pointer;
`;

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
