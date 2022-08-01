import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./TeacherReports.module.css";
import DataTableReportQuestion from "../DataTableReportQuestion/DataTableReportQuestion";
import messageContext from "../../Context/messageContext";

const valueToSearch = {};
function dataProcessing(data, setTestsList, setGroupsList) {
  setGroupsList(data.groups);
}

function getDataFromServer(email, setData, setTestsList, setGroupsList) {
  fetch(`/api/teacher-reports/${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      dataProcessing(data, setTestsList, setGroupsList);
    })
    .catch(() => console.log("error"));
}

const search = async (
  valueToSearch,
  email,
  setShowValueSearched,
  setDisabledReportQuestions,
  setQuestionsOfTest,
  data,
  setStudentsToReportQuestion,
  setMessage,
  setShowMessage
) => {
  if (valueToSearch.test && valueToSearch.group) {
    const { test, group } = valueToSearch;
    const students = [];
    const questions = [];
    for (let student of group.students) {
      for (let tes of student.tests) {
        if (tes.test === test._id) {
          const studentDetails = {
            currentQuestion: tes.currentQuestion,
            done: tes.done,
            grade: tes.grade,
            questions: tes.questions,
            test: tes.test,
            email: student.email,
            label: student.label,
            _id: student._id,
          };
          students.push(studentDetails);
          setStudentsToReportQuestion(students);
        }
      }
    }
    for (let tes of data.tests) {
      if (tes._id === test._id) {
        questions.push(tes.questions);
      }
    }
    const [q] = questions;
    setQuestionsOfTest(q);
    setShowValueSearched(students);
    setDisabledReportQuestions(false);
  } else {
    setShowMessage(true);
    setMessage("Please select a group and test to search");
  }
};

export default function TeacherReports() {
  const [data, setData] = useState([]);
  const [testsList, setTestsList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [questionsOfTest, setQuestionsOfTest] = useState([]);
  const [showValueSearched, setShowValueSearched] = useState([]);
  const [disabledReportQuestions, setDisabledReportQuestions] = useState(true);
  const [showReportQuestion, setShowReportQuestion] = useState([]);
  const [studentsToReportQuestion, setStudentsToReportQuestion] = useState([]);
  const { setMessage, setShowMessage } = useContext(messageContext);

  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  useEffect(() => {
    if (email) {
      getDataFromServer(email, setData, setTestsList, setGroupsList);
    }
  }, [email]);

  function handleFieldGroupName(event, value) {
    valueToSearch.group = value;
    for (let group of data.groups) {
      if (group._id === valueToSearch?.group?._id) {
        const testsOfGroup = [];
        for (let test of group.students[0].tests) {
          for (let t of data.tests) {
            if (test.test === t._id) testsOfGroup.push(t);
          }
        }
        setTestsList(testsOfGroup);
      }
    }
  }
  function handleFieldTestName(event, value) {
    valueToSearch.test = value;
  }

  return (
    <div className={styles.content}>
      <div className={styles.flexDiv}>
        <div className={styles.title}>Reports</div>
        <div className={styles.note}>
          <InfoOutlinedIcon sx={{ fontSize: 18, px: 0.5 }} />
          <div>
            After selecting a test, you have the option below to filter a group
            report by question
          </div>
        </div>
      </div>

      <div className={styles.subTitle}>
        Select a group & test for report view:
      </div>
      <div className={styles.selectFlex}>
        <Autocomplete
          disablePortal
          id="group-name-field"
          options={groupsList}
          sx={{ width: "23vw" }}
          renderInput={(params) => (
            <TextField {...params} label="Search by group name" />
          )}
          onChange={(event, value) => handleFieldGroupName(event, value)}
        />
        <Autocomplete
          disablePortal
          id="test-name-field"
          options={testsList}
          sx={{ width: "23vw", marginTop: "20px", marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search by test name" />
          )}
          onChange={(event, value) => handleFieldTestName(event, value)}
        />
        <Button
          variant="contained"
          className={styles.submitButton}
          sx={{ background: "rgba(133, 64, 245, 0.97)" }}
          key="Search"
          type="Search"
          onClick={() =>
            search(
              valueToSearch,
              email,
              setShowValueSearched,
              setDisabledReportQuestions,
              setQuestionsOfTest,
              data,
              setStudentsToReportQuestion,
              setMessage,
              setShowMessage
            )
          }
        >
          Search
        </Button>
      </div>
      <div className={styles.tableDiv}>
        <DataTable showValueSearched={showValueSearched} />
        <SelectQuestion
          questionsOfTest={questionsOfTest}
          disabledReportQuestions={disabledReportQuestions}
          setShowReportQuestion={setShowReportQuestion}
          studentsToReportQuestion={studentsToReportQuestion}
        />
      </div>

      <DataTableReportQuestion showReportQuestion={showReportQuestion} />
    </div>
  );
}

function DataTable({ showValueSearched }) {
  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 120,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "grade",
      headerName: "grade",
      width: 100,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "done",
      headerName: "done",
      width: 80,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "currentQuestion",
      headerName: "currentQuestion",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
    },
  ];
  const rows = [];
  showValueSearched.map((student) => {
    const studentToRows = {
      name: student.label,
      grade: student.grade,
      done: student.done,
      currentQuestion: student.currentQuestion,
      id: student._id,
    };
    rows.push(studentToRows);
  });
  return (
    <>
      <div style={{ height: 500, marginTop: "20px" }}>
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
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

function SelectQuestion({
  questionsOfTest,
  disabledReportQuestions,
  setShowReportQuestion,
  studentsToReportQuestion,
}) {
  const [question, setQuestion] = useState("");
  const handleSelectQuestion = (event) => {
    setQuestion(event.target.value);
    const StudentsQuestionDetails = [];
    for (let student of studentsToReportQuestion) {
      for (let question of student.questions) {
        if (question.questionId === event.target.value) {
          const StudentQuestionDetails = {
            name: student.label,
            answerCorrectly: question.answerCorrectly,
            responseTime: question.responseTime,
            _id: student._id,
          };
          StudentsQuestionDetails.push(StudentQuestionDetails);
        }
      }
    }
    setShowReportQuestion(StudentsQuestionDetails);
  };
  return (
    <div className={styles._content}>
      <div className={styles.flexDiv}>
        <div className={styles.subTitle}>
          Select a question to view its report
        </div>
        <div className={styles.note}>
          <InfoOutlinedIcon sx={{ fontSize: 18, px: 0.5 }} />
          <div>
            Students who did not answer the question are not presented in its
            report
          </div>
        </div>
      </div>
      <Select
        disabled={disabledReportQuestions}
        sx={{ width: "23vw" }}
        id="Select-quetion"
        value={question}
        name="question"
        key="question"
        onChange={handleSelectQuestion}
      >
        {questionsOfTest?.map((question) => (
          <MenuItem key={question._id} value={question._id}>
            {question.content}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
