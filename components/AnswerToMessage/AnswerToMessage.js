import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import adminContext from "../../Context/adminContext";
import styles from "./AnswerToMessage.module.css";

function getMessageFromServer(
  messageIdToUpdate,
  setShowLoading,
  setTeacherMessage
) {
  fetch("/api/contact-us", {
    method: "GET",
    headers: { pleaseget: "messageid", messageid: messageIdToUpdate },
  })
    .then((res) => res.json())
    .then((teacherMessage) => {
      setTeacherMessage(teacherMessage);
      setShowLoading(false);
    })
    .catch(() => console.log("error"));
}

const changesToUpdate = {
  answer: "",
  email: "",
  messageId: "",
};

function handleAnswerFieldChange() {
  changesToUpdate.answer = event.target.value;
}
function updateMassege(
  changesToUpdate,
  handleCloseDialog,
  setMessage,
  setShowMessage,
  teacherMessage,
  getAllMessageFromServer,
  getNumOfNewMessages,
  setNumOfMessages
) {
  changesToUpdate.teacherMessage = teacherMessage;
  fetch("/api/contact-us", {
    method: "PATCH",
    body: JSON.stringify(changesToUpdate),
  })
    .then(() => {
      if (changesToUpdate.answer) {
        setShowMessage(true);
        setMessage("The answer was sent by email to the teacher");
      }
    })
    .catch(() => console.log("error"));
  handleCloseDialog();
  getAllMessageFromServer();
  getNumOfNewMessages(setNumOfMessages);
  changesToUpdate.answer = "";
}
function deleteMassege(
  messageIdToUpdate,
  handleCloseDialog,
  setMessage,
  setShowMessage,
  getNumOfNewMessages,
  setNumOfMessages
) {
  fetch("/api/contact-us", {
    method: "DELETE",
    body: JSON.stringify(messageIdToUpdate),
  })
    .then(() => {
      setShowMessage(true);
      setMessage("The message has been successfully deleted");
    })
    .catch(() => console.log("error"));
  handleCloseDialog();
  getNumOfNewMessages(setNumOfMessages);
  changesToUpdate.answer = "";
}
export default function AnswerToMessage({
  openAnswerToMessageDialog,
  setOpenAnswerToMessageDialog,
  messageIdToUpdate,
  getAllMessageFromServer,
}) {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const { getNumOfNewMessages, setNumOfMessages } = useContext(adminContext);
  const [showLoading, setShowLoading] = useState(true);
  const [teacherMessage, setTeacherMessage] = useState();

  changesToUpdate.messageId = messageIdToUpdate;

  useEffect(() => {
    if (messageIdToUpdate) {
      getMessageFromServer(
        messageIdToUpdate,
        setShowLoading,
        setTeacherMessage
      );
    }
  }, [messageIdToUpdate]);

  const handleCloseDialog = () => {
    setOpenAnswerToMessageDialog(false);
    setShowLoading(true);
  };

  return (
    <div>
      <Dialog
        sx={{ margin: "0 auto", width: "40%" }}
        fullScreen={true}
        open={openAnswerToMessageDialog}
        onClose={() =>
          updateMassege(
            changesToUpdate,
            handleCloseDialog,
            setMessage,
            setShowMessage,
            teacherMessage,
            getAllMessageFromServer,
            getNumOfNewMessages,
            setNumOfMessages
          )
        }
      >
        {showLoading && (
          <CircularProgress
            style={{ margin: "auto", color: "rgba(133, 64, 245, 0.97)" }}
          />
        )}
        {!showLoading && (
          <>
            <DialogTitle className={styles.title}>
              Sending a reply to the teacher
            </DialogTitle>
            <DialogContent>
              <DialogContentText className={styles.subTitle}>
                Write an answer and send it to the teacher by email.
              </DialogContentText>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div className={styles.subTitle2}>
                  <div style={{ fontWeight: 600 }}>The teacher message</div>
                  <div>
                    massege:
                    <span style={{ color: "#140b53" }}>
                      {" "}
                      {teacherMessage.message}
                    </span>
                  </div>
                  <div>
                    date:{" "}
                    <span style={{ color: "#140b53" }}>
                      {teacherMessage.date}
                    </span>
                  </div>
                  <TextField
                    id="TextFieldAnswer"
                    label="Your reply"
                    sx={{ width: "90%", mt: 2 }}
                    onChange={handleAnswerFieldChange}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                className={styles.btn}
                onClick={() =>
                  updateMassege(
                    changesToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage,
                    teacherMessage,
                    getAllMessageFromServer,
                    getNumOfNewMessages,
                    setNumOfMessages
                  )
                }
              >
                Cancel
              </Button>
              <Button
                className={styles.btn}
                onClick={() =>
                  deleteMassege(
                    messageIdToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage,
                    getNumOfNewMessages,
                    setNumOfMessages
                  )
                }
              >
                Delete massege
              </Button>
              <Button
                className={styles.btn}
                onClick={() =>
                  updateMassege(
                    changesToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage,
                    teacherMessage,
                    getAllMessageFromServer,
                    getNumOfNewMessages,
                    setNumOfMessages
                  )
                }
              >
                Send reply
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
