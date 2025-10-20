import { Box, Button, Grid, styled } from "@mui/material";

export const StyledCard = styled(Box)`
  width: 300px;
  height: 150px;
  border: 4px solid #215dff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: auto;
`;

export const StyledButton = styled(Button)`
  width: fit-content;
`;

export const GridContainer = styled(Grid)`
  display: flex;
  justify-content: center;
`;
