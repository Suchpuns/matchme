import React from "react";
import EditableTable from "../../components/EditableTable";
import { createContext, useState } from "react";

interface Table {
  [tableName: string]: string[];
}

interface Event {
	eventName: string,
	eventTeams: Team[],
}

interface Team {
	name: string,
	teamRoles: Role[]
}

interface Role {
	roleName: string,
	roleQuant: number
}

export const TableContext = createContext({});

const EventCreation2 = () => {
	const [teams, setTeams] = useState<Team[]>([]);
	const [teamName, setTeamName] = useState<string>("");
  const tableValue = [teams, setTeams];

	const addTeam = () => {
		const newTeam: Team = {
			name: String(teamName),
			teamRoles: []
		}
		setTeams([...teams].concat(newTeam))
	}
  


  return (
    <>
      <div className="flex flex-row gap-3 flex-wrap">

        <TableContext.Provider value={tableValue}>
          {Object.keys(tables).map(teamName => {
            return (
              <EditableTable
                teamName={teamName}
                getTableRoles={getTableRoles}
                setTableRoles={setTableRoles}
              />
            );
          })}
        </TableContext.Provider>

        <div>
          <input onChange={updateTableName} value={tableName} className="h-5 ml-3 mr-3"></input>
          <button onClick={() => addTable()}>Add team</button>
        </div>

      </div>
    </>
  );
};

export default EventCreation2;
