import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CountButton } from "./style";
import { CartItem } from "../../interfaces";

interface CartTableProps {
  cartItems: CartItem[];
  cartSum: number;
  onRemove: (id: number) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

const CartTable = ({
  cartItems,
  cartSum,
  onRemove,
  onIncrease,
  onDecrease,
}: CartTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="cart table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#a1a1a1ff" }}>
            <TableCell>Товары</TableCell>
            <TableCell align="right">Количество&nbsp;(шт)</TableCell>
            <TableCell align="right">Стоимость</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="item">
                {item.name}
              </TableCell>
              <TableCell align="right">
                <Box>
                  <CountButton
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon />
                  </CountButton>
                  {item.quantity}
                  <CountButton onClick={() => onIncrease(item.id)}>
                    <AddIcon />
                  </CountButton>
                </Box>
              </TableCell>
              <TableCell align="right">{item.cost * item.quantity}</TableCell>
              <TableCell align="right">
                <Button onClick={() => onRemove(item.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table aria-label="summary" sx={{ backgroundColor: "#a1a1a1ff" }}>
        <TableBody>
          <TableRow>
            <TableCell>Общая сумма</TableCell>
            <TableCell align="right">{cartSum}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartTable;
