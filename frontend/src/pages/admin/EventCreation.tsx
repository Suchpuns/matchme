import EditableTable from "../../components/EditableTable";
import { useState } from "react";

interface Table {
  [tableName: string]: string[];
}

const EventCreation = () => {
  const [tables, setTables] = useState<Table>({ hello: [] });
  const [tableName, setTableName] = useState<string>("");

  const getTableRoles = (teamName: string) => {
    return tables[teamName];
  };

  const setTableRoles = (teamName: string, roles: string[]) => {
    tables[teamName] = roles;
    setTables(tables);
  };

  const updateTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const addTable = (e: React.MouseEvent<HTMLElement>) => {
    tables[tableName] = [];
    setTables(tables);
    setTableName(tableName + "a");
    setTableName(tableName);
  };

  return (
    <>
      <div className="flex flex-row gap-3 flex-wrap">
        <EditableTable
          teamName="hello"
          getTableRoles={getTableRoles}
          setTableRoles={setTableRoles}
        />
        {Object.keys(tables).map(teamName => {
          return (
            <EditableTable
              teamName={teamName}
              getTableRoles={getTableRoles}
              setTableRoles={setTableRoles}
            />
          );
        })}
        <div>
          <input onChange={updateTableName} value={tableName} className="h-5 ml-3 mr-3"></input>
          <button onClick={addTable}>Add team</button>
        </div>
      </div>
    </>
  );
};

export default EventCreation;
