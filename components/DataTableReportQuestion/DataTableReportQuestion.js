import { DataGrid } from "@mui/x-data-grid";

export default function DataTableReportQuestion({ showReportQuestion }) {
  const columns = [
    { field: "name", headerName: "name", width: 120 },
    { field: "answerCorrectly", headerName: "Answer correctly", width: 150 },
    { field: "responseTime", headerName: "Response time", width: 150 },
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
