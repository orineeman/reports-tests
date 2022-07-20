// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Autocomplete,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./TeacherReports.module.css";
import DataTableReportQuestion from "../DataTableReportQuestion/DataTableReportQuestion";

const valueToSearch = {};
function dataProcessing(data, setTestsList, setGroupsList) {
  setGroupsList(data.groups);
  const students = [];
  for (let group of data.groups) {
    students.push(group.students);
  }
  const mergedStudents = [].concat.apply([], students);
  console.log(mergedStudents);
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

const Search = async (
  valueToSearch,
  email,
  setShowValueSearched,
  setDisabledReportQuestions,
  setQuestionsOfTest,
  data,
  setStudentsToReportQuestion
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
    for (let student of students) {
      if (student.done) {
        for (let tes of data.tests) {
          if (tes._id === test._id) {
            questions.push(tes.questions);
          }
        }
      }
    }
    const [q] = questions;
    setQuestionsOfTest(q);
    setShowValueSearched(students);
    setDisabledReportQuestions(false);
  } else {
    alert("Please select a group and test to search");
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
  // const [studentsList, setStudentsList] = useState([]);
  // const [showStudentsOfGroup, setShowStudentsOfGroup] = useState([]);

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
    // setShowStudentsOfGroup(valueToSearch?.group?.students);
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
    <>
      <div className={styles.contentFlex}>
        <h2>Reports</h2>
        <div
          style={{
            width: 200,
            background: "rgb(235,235,235)",
            padding: 10,
            borderRadius: 15,
            display: "flex",
            fontSize: 12,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 18, px: 0.5 }} />
          <div>
            You have the option below to filter a group report by question
          </div>
        </div>
      </div>
      <div style={{ fontSize: 18, margin: 10 }}>
        Select a group & test for report view:
      </div>
      <div className={styles.selectFlex}>
        <Autocomplete
          disablePortal
          id="group-name-field"
          options={groupsList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Search by group name" />
          )}
          onChange={(event, value) => handleFieldGroupName(event, value)}
        />
        <Autocomplete
          disablePortal
          id="test-name-field"
          options={testsList}
          sx={{ width: 300, marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search by test name" />
          )}
          onChange={(event, value) => handleFieldTestName(event, value)}
        />
      </div>
      <div className="flex-div Search-button">
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="Search"
          type="Search"
          onClick={() =>
            Search(
              valueToSearch,
              email,
              setShowValueSearched,
              setDisabledReportQuestions,
              setQuestionsOfTest,
              data,
              setStudentsToReportQuestion
            )
          }
        >
          Search
        </Button>
        <DataTable showValueSearched={showValueSearched} />
        <SelectQuestion
          questionsOfTest={questionsOfTest}
          disabledReportQuestions={disabledReportQuestions}
          setShowReportQuestion={setShowReportQuestion}
          studentsToReportQuestion={studentsToReportQuestion}
        />
      </div>

      <DataTableReportQuestion showReportQuestion={showReportQuestion} />
    </>
  );
}

function DataTable({ showValueSearched }) {
  const columns = [
    { field: "name", headerName: "name", width: 120 },
    { field: "grade", headerName: "grade", width: 100 },
    { field: "done", headerName: "done", width: 80 },
    { field: "currentQuestion", headerName: "currentQuestion", width: 150 },
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
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
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
    <>
      <h6>Select a question to view its report</h6>
      <Select
        disabled={disabledReportQuestions}
        sx={{ width: "300px" }}
        id="Select-quetion"
        value={question}
        name="question"
        key="question"
        onChange={handleSelectQuestion}
      >
        {questionsOfTest.map((question) => (
          <MenuItem key={question._id} value={question._id}>
            {question.content}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
