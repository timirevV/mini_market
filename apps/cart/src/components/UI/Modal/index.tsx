import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = ({
  open,
  onClose,
  title = "Оплата заказа",
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, outline: "none" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
