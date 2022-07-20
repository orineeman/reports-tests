// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UploadingQuestions from "../UpdateQuestion/UpdateQuestion";

function getDataFromServer(setAllQuestions) {
  fetch(`/api/admin/admin-reports`)
    .then((res) => res.json())
    .then((allQuestions) => {
      setAllQuestions(allQuestions);
    })
    .catch(() => console.log("error"));
}

export default function AdminReports() {
  const [openUpdateQuestionDialog, setOpenUpdateQuestionDialog] =
    useState(false);
  const [questionIdToUpdate, setQuestionIdToUpdate] = useState("");

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
      getDataFromServer(setAllQuestions);
    }
  }, [email]);

  return (
    <>
      <h2>Question & answers reports</h2>
      <div style={{ fontSize: 18, margin: 10 }}>
        Click on a question to update its data:
      </div>
      <div>
        <DataTable
          handleClickUpdateQuestionDialog={handleClickUpdateQuestionDialog}
          allQuestions={allQuestions}
          openUpdateQuestionDialog={openUpdateQuestionDialog}
          setOpenUpdateQuestionDialog={setOpenUpdateQuestionDialog}
          questionIdToUpdate={questionIdToUpdate}
        />
      </div>
    </>
  );
}

function DataTable({
  handleClickUpdateQuestionDialog,
  openUpdateQuestionDialog,
  setOpenUpdateQuestionDialog,
  allQuestions,
  questionIdToUpdate,
}) {
  const columns = [
    { field: "content", headerName: "Content", width: 100 },
    {
      field: "numberOfResponses",
      headerName: "responses",
      width: 110,
    },
    { field: "amountOfRight", headerName: "Right", width: 100 },
    { field: "amountOfMistakes", headerName: "Mistakes", width: 100 },
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
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(questionId) => {
            handleClickUpdateQuestionDialog(questionId);
          }}
        />
      </div>
      <UploadingQuestions
        openUpdateQuestionDialog={openUpdateQuestionDialog}
        setOpenUpdateQuestionDialog={setOpenUpdateQuestionDialog}
        questionIdToUpdate={questionIdToUpdate}
      />
    </>
  );
}
