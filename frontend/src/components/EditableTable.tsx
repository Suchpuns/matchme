import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

let idCounterRow = 0;

const createRow = () => {
  idCounterRow += 1;
  return { id: idCounterRow, name: "lol", role: "FKC" };
};

let columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'role', headerName: 'Role', width: 180, editable: true }
];

let dummyrows: GridRowsProp = [
  {
    id: 1,
    name: "test",
    role: "FE",
  },
  {
    id: 2,
    name: "test2",
    role: "BE",
  },
  {
    id: 3,
    name: "test3",
    role: "FE",
  },
];

export default function EditableTable() {
  const [rows, setRows] = React.useState(() => [createRow()]);

  const handleAddRow = () => {
    setRows((prevRows) => [...prevRows, createRow()]);
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
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
        <Button size="small" onClick={handleAddRow}>
          Add a row
        </Button>
      </Stack>
      <div style={{ height: 300, width: '100%', backgroundColor: "white"}}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Box>
  );
}
