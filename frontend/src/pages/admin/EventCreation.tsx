import EditableTable from "../../components/EditableTable";
import Header from "../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Table {
  [tableName: string]: string[];
}

const EventCreation = ({ getEvents, setEvents }) => {
  const [tables, setTables] = useState<Table>({ undefined: [] });
  const [tableName, setTableName] = useState<string>("");
  const { eventName } = useParams();
  const navigate = useNavigate();
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
    setTableName("");
  };

  const submitTeam = async () => {
    if (eventName === undefined) {
      return;
    }

    // tables[table] = array of roles
    // tables[table] = "wand", "wand", "wand"

    const events = getEvents();
    const groups = [];
    for (const table of Object.keys(tables)) {
      const group = { groupName: table, roles: [] };
      if (table != "undefined") {
        const new_roles = [];
        for (const role of tables[table]) {
          // const got_role = new_roles.find(role_2 => {
          //   role_2["roleType"] === role;
          // });
          let got_role = undefined;
          for (const role_2 of new_roles) {
            if (role_2["roleType"] === role) {
              got_role = role_2;
            }
          }

          if (got_role != undefined) {
            got_role["roleNum"] += 1;
          } else {
            new_roles.push({
              roleType: role,
              roleNum: 1,
            });
          }
        }
        group.roles = new_roles;
        groups.push(group);
      }
    }
    events[eventName] = groups;
    const new_events = {};
    new_events[eventName] = groups;
    console.log(getEvents());
    setEvents(events);
    console.log(getEvents());
    await fetch(`${import.meta.env.VITE_BE_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ groups: new_events }),
    });
    navigate(`/admin/${eventName}/preference`);
    return;
  };

  return (
    <>
      <Header eventName={eventName ? eventName : "New Event"} index="0" />
      <div className="flex flex-row gap-3 flex-wrap">
        {Object.keys(tables).map(teamName => {
          console.log(teamName);
          if (teamName == "undefined") {
            return <></>;
          }
          return (
            <EditableTable
              teamName={teamName}
              getTableRoles={getTableRoles}
              setTableRoles={setTableRoles}
            />
          );
        })}
        <div>
          <input
            onChange={updateTableName}
            value={tableName}
            className="h-5 ml-3 mr-3 p-3 bg-card-green hover:bg-card-green w-full my-7 rounded-xl font-semibold"
          ></input>
          <button
            className="p-3 ml-3 bg-card-orange hover:bg-card-green w-full my-7 rounded-xl font-semibold"
            onClick={addTable}
          >
            Add team
          </button>
          <button
            className="p-3 ml-3 bg-card-green hover:bg-card-orange w-full my-7 rounded-xl font-semibold"
            onClick={submitTeam}
          >
            Submit teams
          </button>
        </div>
      </div>
    </>
  );
};

export default EventCreation;
