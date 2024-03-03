import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

let idCounterRow = 0;

const createRow = () => {
  idCounterRow += 1;
  return { id: idCounterRow, role: "Role", group: "Group"};
};

let idCounterCol = -1;
const createCol = () => {
  idCounterCol += 1;
  return { field: 'group' + idCounterCol, headerName: 'Group ' + idCounterCol, width: 180, editable: true};
};
    

let columns: GridColDef[] = [
  { field: 'role', headerName: 'Role', width: 180, editable: true },
  { field: '', headerName: 'Group 1', width: 180, editable: true }
];

let group: {name: String, roleNames: String[], roleCount: number[]} = {
  name: "",
  roleNames: [],
  roleCount: []
}

let groups = [];


export default function EditableTable() {
  const [rows, setRows] = React.useState(() => [createRow()]);
  const [cols, setCols] = React.useState(() => [createCol()]);

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRow()]);
  };
  
  const handleAddColumn = () => {
    setCols((newCol: any) => [...newCol, columns.push(createCol())]);
  };

  const handleDeleteRow = () => {
    if (rows.length === 0) {
      return;
    }
    setRows((prevRows) => {
      const rowToDeleteIndex = prevRows.length - 1;
      return [
        ...rows.slice(0, rowToDeleteIndex),
        ...rows.slice(rowToDeleteIndex + 1),
      ];
    });
  };

  const handleDeleteCol = () => {
    if (columns.length == 1) {
      return;
    }
    setCols((newCol: any) => [...newCol, columns.pop()]);
    idCounterCol--;
  };

  const location = useLocation();
  useEffect(() => {
    /*
    groups = columns.map(column => {
      let group = {
        name: column.headerName,
        roleNames: [],
        roleCount: []
      }
    });
    */
    console.log(columns);
  }, [location]);
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
        <Button size="small" onClick={handleDeleteCol}>
          Delete a column
        </Button>
        <Button size="small" onClick={handleAddColumn}>
          Add a column
        </Button>
      </Stack>
      <div style={{ height: 500, width: '100%', backgroundColor: "white",}}>
        <DataGrid rows={rows} columns={columns.map(column => (column
        ))} />
      </div>
    </Box>
  );
}
