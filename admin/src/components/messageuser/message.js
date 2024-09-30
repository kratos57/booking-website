import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const CustomModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We will review your request within 24 hours.
        </DialogContentText>
      </DialogContent>
      <Button onClick={handleClose} autoFocus>
        OK
      </Button>
    </Dialog>
  );
};

export default CustomModal;
