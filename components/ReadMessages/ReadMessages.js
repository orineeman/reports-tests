// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import clsx from "clsx";
import AnswerToMessage from "../AnswerToMessage/AnswerToMessage";

export default function ReadMessages() {
  const [openAnswerToMessageDialog, setOpenAnswerToMessageDialog] =
    useState(false);
  const [messageIdToUpdate, setMessageIdToUpdate] = useState("");
  const [showLoding, setShowLoding] = useState(true);
  const [allMessages, setAllMessages] = useState([]);

  const handleClickAnswerToMessageDialog = (messageId) => {
    setOpenAnswerToMessageDialog(true);
    setMessageIdToUpdate(messageId);
  };

  useEffect(() => {
    getAllMessageFromServer();
  }, []);
  function getAllMessageFromServer() {
    fetch(`/api/contact-us`)
      .then((res) => res.json())
      .then((allMessages) => {
        console.log(allMessages);
        setAllMessages(allMessages);
        setShowLoding(false);
      })
      .catch(() => console.log("error"));
  }

  return (
    <>
      <h2>Message box</h2>
      {showLoding && <CircularProgress />}
      {!showLoding && (
        <>
          <div style={{ fontSize: 18, margin: 10 }}>
            Click on a message to read & answer:
          </div>
          <div>
            <DataTable
              handleClickAnswerToMessageDialog={
                handleClickAnswerToMessageDialog
              }
              allMessages={allMessages}
              openAnswerToMessageDialog={openAnswerToMessageDialog}
              setOpenAnswerToMessageDialog={setOpenAnswerToMessageDialog}
              messageIdToUpdate={messageIdToUpdate}
              getAllMessageFromServer={getAllMessageFromServer}
            />
          </div>
        </>
      )}
    </>
  );
}

function DataTable({
  handleClickAnswerToMessageDialog,
  openAnswerToMessageDialog,
  setOpenAnswerToMessageDialog,
  allMessages,
  messageIdToUpdate,
  getAllMessageFromServer,
}) {
  const columns = [
    { field: "message", headerName: "Message", width: 100 },
    { field: "answer", headerName: "Answer", width: 100 },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      type: "date",
    },
    { field: "email", headerName: "Email", width: 100 },
    {
      field: "isRead",
      headerName: "Is read",
      width: 70,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        return clsx("super-app", {
          negative: params.value === true,
          positive: params.value === false,
        });
      },
    },
  ];
  const rows = [];
  allMessages.map((message) => {
    const studentToRows = {
      message: message.message,
      isRead: message.isRead,
      answer: message.answer,
      date: message.date,
      email: message.email,
      id: message._id,
    };
    rows.push(studentToRows);
  });
  return (
    <>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .super-app.negative": {
              backgroundColor: "rgba(157, 255, 118, 0.49)",
              color: "#1a3e72",
              fontWeight: "600",
            },
            "& .super-app.positive": {
              backgroundColor: "#d47483",
              color: "#1a3e72",
              fontWeight: "600",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onSelectionModelChange={(messageId) => {
              handleClickAnswerToMessageDialog(messageId);
            }}
          />
        </Box>
      </div>
      <AnswerToMessage
        openAnswerToMessageDialog={openAnswerToMessageDialog}
        setOpenAnswerToMessageDialog={setOpenAnswerToMessageDialog}
        messageIdToUpdate={messageIdToUpdate}
        getAllMessageFromServer={getAllMessageFromServer}
      />
    </>
  );
}
