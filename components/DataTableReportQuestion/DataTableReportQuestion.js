import { DataGrid } from "@mui/x-data-grid";

export default function DataTableReportQuestion({ showReportQuestion }) {
  const columns = [
    {
      field: "name",
      headerName: "name",
      width: 120,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "answerCorrectly",
      headerName: "Answer correctly",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
    },
    {
      field: "responseTime",
      headerName: "Response time",
      width: 150,
      headerClassName: "header",
      headerAlign: "center",
    },
  ];
  const rows = [];
  showReportQuestion.map((student) => {
    const studentToRows = {
      name: student.name,
      answerCorrectly: student.answerCorrectly,
      responseTime: student.responseTime,
      id: student._id,
    };
    rows.push(studentToRows);
  });
  return (
    <>
      <div style={{ height: 400, marginTop: "20px" }}>
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
