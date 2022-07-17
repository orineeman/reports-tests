// import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./TeacherReports.module.css";

function dataProcessing(data, setTestsList, setGroupsList, setStudentsList) {
  setTestsList(data.tests);
  setGroupsList(data.groups);
  console.log(data.groups);
  const students = [];
  for (let group of data.groups) {
    students.push(group.students);
  }
  const mergedStudents = [].concat.apply([], students);
  setStudentsList(mergedStudents);
  console.log(mergedStudents);
}

function getDataFromServer(
  email,
  setData,
  setTestsList,
  setGroupsList,
  setStudentsList
) {
  fetch(`/api/teacher-reports/${email}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      dataProcessing(data, setTestsList, setGroupsList, setStudentsList);
      console.log("data", data);
    })
    .catch(() => console.log("error"));
}

const Search = async (valueToSearch, email) => {
  console.log("valueToSearch", valueToSearch);
  if (valueToSearch.test || valueToSearch.group || valueToSearch.students) {
    let searchByType = "";
    let idForSearch = "";
    if ("test" in valueToSearch) {
      searchByType = "test";
      idForSearch = valueToSearch.test._id;
    } else if ("group" in valueToSearch) {
      searchByType = "group";
      idForSearch = valueToSearch.group._id;
    } else if ("student" in valueToSearch) {
      searchByType = "student";
      idForSearch = valueToSearch.student._id;
    }
    console.log("searchByType", searchByType);
    fetch(`/api/teacher-reports/${searchByType}/${idForSearch}`, {
      method: "GET",
    });
    //     .then((res) => res.json())
    //     .then((teacherUpdate) => {
    //       console.log("the client side give-teacherUpdate:", teacherUpdate);
    //       alert("The test was saved successfully");
    //     })
    //     .catch(() => console.log("error"));
  } else {
    alert("Please select a value to search");
  }
};

export default function TeacherReports() {
  const [data, setData] = useState([]);
  const [testsList, setTestsList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [showValueSearched, setShowValueSearched] = useState([]);
  const [showStudentsOfGroup, setShowStudentsOfGroup] = useState([]);

  const filedsValue = {};
  const { data: session } = useSession();
  let email = "";
  if (session) {
    email = session.user.email;
  }
  useEffect(() => {
    if (email) {
      getDataFromServer(
        email,
        setData,
        setTestsList,
        setGroupsList,
        setStudentsList
      );
      filedsValue.email = email;
    }
  }, [email]);

  const valueToSearch = {};

  function handleFieldGroupName(event, value) {
    valueToSearch.group = value;
    console.log(valueToSearch);
    setShowStudentsOfGroup(valueToSearch.group.students);
    for (let group of data.groups) {
      if (group._id === valueToSearch.group._id) {
        setStudentsList(group.students);
        const testsOfGroup = [];
        for (let test of group.students[0].tests) {
          testsOfGroup.push(test.test);
        }
        setTestsList(testsOfGroup);
      }
    }
  }
  function handleFieldTestName(event, value) {
    valueToSearch.test = value;
    console.log(valueToSearch);
  }
  function handleFieldStudentName(event, value) {
    valueToSearch.student = value;
    console.log(valueToSearch);
  }
  return (
    <>
      <h2>Reports</h2>
      <h6>Select a test for his report view:</h6>
      <div className={styles.flex}>
        <Autocomplete
          disablePortal
          id="group-name-field"
          options={groupsList}
          sx={{ width: 300, marginTop: "20px" }}
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
        <Autocomplete
          disablePortal
          id="student-name-field"
          options={studentsList}
          sx={{ width: 300, marginTop: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search by student name" />
          )}
          onInputChange={(event, value) => handleFieldStudentName(event, value)}
        />
      </div>
      <div className="flex-div Search-button">
        <Button
          variant="contained"
          sx={{ margin: "15px", width: "150px" }}
          key="Search"
          type="Search"
          onClick={() => Search(valueToSearch, email)}
        >
          Search
        </Button>
      </div>
      <ol>
        {showStudentsOfGroup.map((student) => (
          <li key={student._id}>{student.label}</li>
        ))}
      </ol>
      {/* <DataTable
      showValueSearched={showValueSearched}
      /> */}
    </>
  );
}

function DataTable() {
  const columns = [
    { field: "age", headerName: "Age", width: 60 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "difficulty", headerName: "Difficulty", width: 110 },
    { field: "question", headerName: "Question", width: 130 },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];
  const rows = [];
  questions.map((question) => {
    const questionToRows = {
      subject: question.subject.subject,
      age: question.age.age,
      difficulty: question.difficulty.difficulty,
      question: question.content,
      id: question._id,
    };
    rows.push(questionToRows);
  });
  return (
    <>
      <div style={{ height: 500, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            valueToSearch.questions = newSelectionModel;
          }}
        />
      </div>
    </>
  );
}
