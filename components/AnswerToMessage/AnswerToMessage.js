import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import messageContext from "../../Context/messageContext";
import adminContext from "../../Context/adminContext";

function getMessageFromServer(
  messageIdToUpdate,
  setShowLoding,
  setTeacherMessage
) {
  fetch("/api/contact-us", {
    method: "GET",
    headers: { pleaseget: "messageid", messageid: messageIdToUpdate },
  })
    .then((res) => res.json())
    .then((teacherMessage) => {
      console.log("teacherMessage", teacherMessage);
      setTeacherMessage(teacherMessage);
      setShowLoding(false);
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
  console.log("changesToUpdate", changesToUpdate);
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
}
function deleteMassege(
  messageIdToUpdate,
  handleCloseDialog,
  setMessage,
  setShowMessage,
  getNumOfNewMessages,
  setNumOfMessages
  //   getAllMessageFromServer,
) {
  console.log("messageIdToUpdate", messageIdToUpdate);
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
  //   getAllMessageFromServer();
}
export default function AnswerToMessage({
  openAnswerToMessageDialog,
  setOpenAnswerToMessageDialog,
  messageIdToUpdate,
  getAllMessageFromServer,
}) {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const { getNumOfNewMessages, setNumOfMessages } = useContext(adminContext);
  const [showLoding, setShowLoding] = useState(true);
  const [teacherMessage, setTeacherMessage] = useState();

  changesToUpdate.messageId = messageIdToUpdate;

  useEffect(() => {
    if (messageIdToUpdate) {
      getMessageFromServer(messageIdToUpdate, setShowLoding, setTeacherMessage);
    }
  }, [messageIdToUpdate]);

  const handleCloseDialog = () => {
    setOpenAnswerToMessageDialog(false);
    setShowLoding(true);
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
        {showLoding && <CircularProgress style={{ margin: "auto" }} />}
        {!showLoding && (
          <>
            <DialogTitle>Sending a reply to the teacher</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Write an answer and send it to the teacher by email.
              </DialogContentText>
              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      color: "rgb(70, 145, 219)",
                      textDecoration: "underLine",
                    }}
                  >
                    The teacher message
                  </div>
                  <div style={{ color: "rgb(70, 145, 219)" }}>
                    massege:
                    <span style={{ color: "rgb(0, 0, 0)" }}>
                      {" "}
                      {teacherMessage.message}
                    </span>
                  </div>
                  <div style={{ color: "rgb(70, 145, 219)" }}>
                    date:{" "}
                    <span style={{ color: "rgb(0,0,0)" }}>
                      {teacherMessage.date}
                    </span>
                  </div>
                  <TextField
                    id="TextFieldAnswer"
                    label="Your regly"
                    sx={{ width: "90%", mt: 2 }}
                    onChange={handleAnswerFieldChange}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
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
                onClick={() =>
                  deleteMassege(
                    messageIdToUpdate,
                    handleCloseDialog,
                    setMessage,
                    setShowMessage,
                    getNumOfNewMessages,
                    setNumOfMessages
                    // getAllMessageFromServer,
                  )
                }
              >
                Delete massege
              </Button>
              <Button
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
