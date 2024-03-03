import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import * as React from "react";
import { Paper } from "@mui/material";

let idCounterRow = 0;

const createRow = () => {
  idCounterRow += 1;
  return { id: idCounterRow, name: "lol", role: "FKC" };
};

const columns: GridColDef[] = [{ field: "role", headerName: "Role", width: 180, editable: true }];

const dummyrows: GridRowsProp = [
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

interface TableProp {
  teamName: string;
  getTableRoles: (teamName: string) => string[];
  setTableRoles: (teamName: string, roles: string[]) => void;
}

export default function EditableTable(props: TableProp) {
  const [rows, setRows] = React.useState(() => [createRow()]);
  const [roleName, setRoleName] = React.useState<string>("");

  const updateRoleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  const addRole = (e: React.MouseEvent<HTMLElement>) => {
    const roles = props.getTableRoles(props.teamName);
    const newRoles = [...roles];
    newRoles.push(roleName);
    console.log(newRoles);
    props.setTableRoles(props.teamName, newRoles);
    setRoleName("");
  };

  const deleteRole = (e: React.MouseEvent<HTMLElement>) => {
    const roles = props.getTableRoles(props.teamName);
    const newRoles = [...roles];
    const i: number = Number(e.currentTarget.id);
    newRoles.splice(i, 1);
    console.log(newRoles);
    roles.splice(i, 1);
    props.setTableRoles(props.teamName, newRoles);
  };

  return (
    <Paper sx={{ backgroundColor: "lightblue" }} className="text-black w-80">
      <div className="flex items-center flex-col">
        <h1 style={{ color: "black" }} className="text-2xl font-bold mx-auto mt-3 mb-3">
          {props.teamName}
        </h1>
        {props.getTableRoles(props.teamName).map((role, index) => {
          return (
            <div key={role} className="">
              <div className="flex flex-row mb-3">
                <p>{role}</p>
                <button
                  type="button"
                  className="text-gray-900 ml-4 bg-transparent rounded-full text-sm p-0.5 inline-flex items-center hover:bg-red-500 hover:text-white"
                  id={String(index)}
                  onClick={deleteRole}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
        <div>
          <input onChange={updateRoleName} value={roleName}></input>
          <button
            onClick={addRole}
            className="ml-5 mb-5 mt-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Role
          </button>
        </div>
      </div>
    </Paper>
  );
}
