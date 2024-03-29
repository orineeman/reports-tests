import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UpdateQuestion from "../UpdateQuestion/UpdateQuestion";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import clsx from "clsx";
import styles from "./AdminReports.module.css";

export default function AdminReports() {
  const [openUpdateQuestionDialog, setOpenUpdateQuestionDialog] =
    useState(false);
  const [questionIdToUpdate, setQuestionIdToUpdate] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  const handleClickUpdateQuestionDialog = (questionId) => {
    setOpenUpdateQuestionDialog(true);
    setQuestionIdToUpdate(questionId);
  };

  const [allQuestions, setAllQuestions] = useState([]);
  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  useEffect(() => {
    if (email) {
      getQuestionDataFromServer();
    }
  }, [email]);

  function getQuestionDataFromServer() {
    fetch(`/api/admin/admin-reports`)
      .then((res) => res.json())
      .then((allQuestions) => {
        setAllQuestions(allQuestions);
        setShowLoading(false);
      })
      .catch(() => console.log("error"));
  }

  return (
    <div className={styles.content}>
      <div className={styles.title}>Question & answers reports</div>

      {showLoading && (
        <CircularProgress sx={{ color: "rgba(133, 64, 245, 0.97)" }} />
      )}
      {!showLoading && (
        <>
          <div className={styles.subTitle}>
            Click on a question to update its data:
          </div>
          <div>
            <DataTable
              handleClickUpdateQuestionDialog={handleClickUpdateQuestionDialog}
              allQuestions={allQuestions}
              openUpdateQuestionDialog={openUpdateQuestionDialog}
              setOpenUpdateQuestionDialog={setOpenUpdateQuestionDialog}
              questionIdToUpdate={questionIdToUpdate}
              getQuestionDataFromServer={getQuestionDataFromServer}
              setShowLoading={setShowLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}

function DataTable({
  handleClickUpdateQuestionDialog,
  openUpdateQuestionDialog,
  setOpenUpdateQuestionDialog,
  allQuestions,
  questionIdToUpdate,
  getQuestionDataFromServer,
  setShowLoading,
}) {
  const columns = [
    {
      field: "content",
      headerName: "Content",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "numberOfResponses",
      headerName: "responses",
      width: 110,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "amountOfRight",
      headerName: "Right",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "amountOfMistakes",
      headerName: "Mistakes",
      headerClassName: "header",
      headerAlign: "center",
      width: 100,
      type: "number",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value < 5,
          positive: params.value >= 5,
        });
      },
    },
  ];
  const rows = [];
  allQuestions.map((question) => {
    const studentToRows = {
      content: question.content,
      numberOfResponses: question.statistics.numberOfResponses,
      amountOfRight: question.statistics.amountOfRight,
      amountOfMistakes: question.statistics.amountOfMistakes,
      id: question.questionId,
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
            rows={rows}
            columns={columns}
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
            pageSize={10}
            rowsPerPageOptions={[10]}
            onSelectionModelChange={(questionId) => {
              handleClickUpdateQuestionDialog(questionId);
            }}
          />
        </Box>
      </div>
      <UpdateQuestion
        openUpdateQuestionDialog={openUpdateQuestionDialog}
        setOpenUpdateQuestionDialog={setOpenUpdateQuestionDialog}
        questionIdToUpdate={questionIdToUpdate}
        getQuestionDataFromServer={getQuestionDataFromServer}
        setShowLoading={setShowLoading}
      />
    </>
  );
}
