import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styles from "./BaseDataUpdates.module.css";
import DeleteBaseData from "../DeleteBaseData/DeleteBaseData";
import messageContext from "../../Context/messageContext";

function showDataToUpdate(
  event,
  setData,
  setDisabledAddButton,
  setButtonValue,
  setValueOfAddField
) {
  const dataToUpdate = event.target.value;
  getDataFromServer(dataToUpdate, setData);
  setButtonValue(dataToUpdate);
  setDisabledAddButton(false);
  setValueOfAddField("");
}

function getDataFromServer(dataToUpdate, setData) {
  fetch("/api/admin/base-data-updates", {
    method: "GET",
    headers: { pleaseGet: dataToUpdate },
  })
    .then((res) => res.json())
    .then((dataToUpdate) => {
      setData(dataToUpdate);
    })
    .catch(() => console.log("error"));
}
function add(setDisabledAddField) {
  setDisabledAddField(false);
}
function handleAddFieldChange(
  event,
  buttonValue,
  setDisabledSaveButton,
  setValueToAdd,
  setValueOfAddField
) {
  setDisabledSaveButton(false);
  setValueOfAddField(event.target.value);
  const newValue = { type: buttonValue, value: event.target.value };
  setValueToAdd(newValue);
}
async function save(
  valueToAdd,
  setValueOfAddField,
  setMessage,
  setShowMessage
) {
  try {
    const json = await fetch("/api/admin/base-data-updates", {
      method: "POST",
      body: JSON.stringify(valueToAdd),
    });
    const data = await json.json();
    console.log(data);
    setShowMessage(true);
    setMessage("Insert done");
  } catch (err) {
    console.log(err);
  }
  setValueOfAddField("");
}

export default function BaseDataUpdates() {
  const [data, setData] = useState([]);
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [disabledAddField, setDisabledAddField] = useState(true);
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [buttonValue, setButtonValue] = useState("");
  const [valueToAdd, setValueToAdd] = useState({});
  const [valueToDelete, setValueToDelete] = useState({});
  const [valueOfAddField, setValueOfAddField] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { setMessage, setShowMessage } = useContext(messageContext);

  return (
    <div className={styles.content}>
      <div className={styles.title}>Base data updates</div>

      <div className={styles.subTitle}>
        Select the data you want to update, and click the field you want to
        update or delete
      </div>
      <div>
        <Button
          className={styles.updateBtns}
          variant="outlined"
          key="permissions"
          type="permissions"
          value="permissions"
          onClick={(event) =>
            showDataToUpdate(
              event,
              setData,
              setDisabledAddButton,
              setButtonValue,
              setValueOfAddField
            )
          }
        >
          Permissions
        </Button>
        <Button
          className={styles.updateBtns}
          variant="outlined"
          key="ages"
          type="ages"
          value="ages"
          onClick={(event) =>
            showDataToUpdate(
              event,
              setData,
              setDisabledAddButton,
              setButtonValue,
              setValueOfAddField
            )
          }
        >
          Ages
        </Button>
        <Button
          className={styles.updateBtns}
          variant="outlined"
          key="subjects"
          type="subjects"
          value="subjects"
          onClick={(event) =>
            showDataToUpdate(
              event,
              setData,
              setDisabledAddButton,
              setButtonValue,
              setValueOfAddField
            )
          }
        >
          Subjects
        </Button>
        <Button
          className={styles.updateBtns}
          variant="outlined"
          key="difficulties"
          type="difficulties"
          value="difficulties"
          onClick={(event) =>
            showDataToUpdate(
              event,
              setData,
              setDisabledAddButton,
              setButtonValue,
              setValueOfAddField
            )
          }
        >
          Difficulties
        </Button>
      </div>

      <DataTable
        data={data}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        valueToDelete={valueToDelete}
        setValueToDelete={setValueToDelete}
      />
      <div>
        <Button
          className={styles.addButton}
          variant="contained"
          sx={{ margin: "15px" }}
          key="AddButton"
          type="AddButton"
          disabled={disabledAddButton}
          onClick={() => add(setDisabledAddField)}
        >
          Add {buttonValue}
        </Button>
        <TextField
          autoFocus
          value={valueOfAddField}
          disabled={disabledAddField}
          sx={{ width: "300px", margin: "10px" }}
          type="text"
          label={buttonValue}
          key={buttonValue}
          variant="outlined"
          onChange={() =>
            handleAddFieldChange(
              event,
              buttonValue,
              setDisabledSaveButton,
              setValueToAdd,
              setValueOfAddField
            )
          }
        />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ margin: "15px" }}
          key="save"
          type="save"
          disabled={disabledSaveButton}
          onClick={() =>
            save(valueToAdd, setValueOfAddField, setMessage, setShowMessage)
          }
        >
          save
        </Button>
      </div>
    </div>
  );
}

function DataTable({
  data,
  openDeleteDialog,
  setOpenDeleteDialog,
  valueToDelete,
  setValueToDelete,
}) {
  let dataToTable = [];
  let rows = [];
  let columns = [];
  let field = "";
  let headerName = "";

  if (data.value === "permissions") {
    dataToTable = data.permissions;
    field = "fullName";
    headerName = "Full name";
  }
  if (data.value === "ages") {
    dataToTable = data.ages;
    field = "age";
    headerName = "Ages";
  }
  if (data.value === "subjects") {
    dataToTable = data.subjects;
    field = "subject";
    headerName = "Subjects";
  }
  if (data.value === "difficulties") {
    dataToTable = data.difficulties;
    field = "difficulty";
    headerName = "Difficulties";
  }

  columns = [
    {
      field: field,
      headerName: headerName,
      width: 200,
      headerClassName: "header",
      headerAlign: "center",
    },
  ];

  dataToTable.map((item) => {
    const itemsToRows = {
      [field]: item[field],
      id: item._id,
    };
    rows.push(itemsToRows);
  });
  return (
    <>
      <div style={{ height: 250, width: "52vw", marginTop: "20px" }}>
        <DataGrid
          rows={rows}
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
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onSelectionModelChange={(idToUpdate) => {
            handleClickUpdateData(
              idToUpdate,
              field,
              setOpenDeleteDialog,
              setValueToDelete
            );
          }}
        />
      </div>
      <DeleteBaseData
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        valueToDelete={valueToDelete}
      />
    </>
  );
}

function handleClickUpdateData(
  idToUpdate,
  field,
  setOpenDeleteDialog,
  setValueToDelete
) {
  setOpenDeleteDialog(true);
  const id = idToUpdate[0];

  setValueToDelete({ id, field });
}
