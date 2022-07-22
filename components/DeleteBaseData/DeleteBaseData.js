import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getDataFromServer(valueToDelete, setValueOfUpdateField) {
  fetch("/api/admin/base-data-updates", {
    method: "GET",
    headers: {
      idToUpdate: valueToDelete.id,
      valueToDelete: valueToDelete.field,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      if ("age" in data) {
        setValueOfUpdateField(data.age);
      }
      if ("subject" in data) {
        setValueOfUpdateField(data.subject);
      }
      if ("difficulty" in data) {
        setValueOfUpdateField(data.difficulty);
      }
      if ("fullName" in data) {
        setValueOfUpdateField(data.fullName);
      }
    })
    .catch(() => console.log("error"));
}

export default function DeleteBaseData({
  openDeleteDialog,
  setOpenDeleteDialog,
  valueToDelete,
}) {
  console.log("valueToDelete", valueToDelete);
  const [valueOfUpdateField, setValueOfUpdateField] = useState("");
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  useEffect(() => {
    if (valueToDelete) {
      console.log();
      getDataFromServer(valueToDelete, setValueOfUpdateField);
    }
  }, [valueToDelete]);
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"Update or Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you want to update the {valueToDelete.field}, change the value
            and click Save Change
            <br /> If you want to delete the {valueToDelete.field} click on
            Delete
          </DialogContentText>
          <TextField
            autoFocus
            value={valueOfUpdateField}
            sx={{ width: "300px", margin: "10px" }}
            type="text"
            variant="outlined"
            // onChange={() =>
            // handleAddFieldChange(
            // event
            // )
            // }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleClose}>Save Change</Button>
          <Button onClick={handleClose}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
