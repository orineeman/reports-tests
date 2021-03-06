import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import clsx from "clsx";
import AnswerToMessage from "../AnswerToMessage/AnswerToMessage";
import styles from "./MessageBox.module.css";

export default function MessageBox() {
  const [openAnswerToMessageDialog, setOpenAnswerToMessageDialog] =
    useState(false);
  const [messageIdToUpdate, setMessageIdToUpdate] = useState("");
  const [showLoading, setShowLoading] = useState(true);
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
        setAllMessages(allMessages);
        setShowLoading(false);
      })
      .catch(() => console.log("error"));
  }

  return (
    <div className={styles.content}>
      <div className={styles.title}>Message box</div>

      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
          <div className={styles.subTitle}>
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
    </div>
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
    {
      field: "message",
      headerName: "Message",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "answer",
      headerName: "Answer",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      type: "date",
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "isRead",
      headerName: "Is read",
      width: 70,
      headerClassName: "header",
      headerAlign: "center",
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
      <div style={{ height: 500, width: "45vw", marginTop: "20px" }}>
        <Box
          sx={{
            height: 500,
            "& .super-app.negative": {
              backgroundColor: "#B4EFBA",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "14px 16px",
              gap: "10px",
              borderRadius: "5px",
              color: "#1a3e72",
              fontWeight: "600",
            },
            "& .super-app.positive": {
              backgroundColor: "#FFA1A1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "14px 16px",
              gap: "10px",
              borderRadius: "5px",
              color: "#1a3e72",
              fontWeight: "600",
            },
          }}
        >
          <DataGrid
            sx={{
              "& .header": {
                fontWeight: 700,
                fontSize: "16px",
                color: "#040330",
              },
              borderColor: "#040330",
              "& .MuiDataGrid-cell:hover": {
                color: "#040330",
              },
            }}
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
