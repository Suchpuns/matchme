import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import Parser from "@json2csv/plainjs/Parser.js";
import RoleGrouping from "../../components/RoleGrouping";
import PersonRow from "../../components/PersonRow";

const EventComplete = () => {
  const { eventName } = useParams();

  // useEffect(() => {
  //   console.log(eventName)
  //   fetch(`http://localhost:5000/events/calculate?event_name=${eventName?.toLowerCase()}`)
  //   .then(resp => resp.json())
  //   .then(resp_data => {
  //     console.log("Response", resp_data)
  //     setData(resp_data.roles)
  //   })
  // },[])

  const [data, setData] = useState([{"role": "Wand", "people": [{"name": "Dorian", "choice": 1}, {"name": "Dani", "choice": 3}]}, {"role": "Potion", "people": [{"name": "Monica", "choice": 1}]}, {"role": "Crystal Ball", "people": [{"name": "Nico", "choice": 1}]}])

  const [groupData, setGroupData] = useState(
    {
      groups: [
        {
            groupName: "jira",
            roles: [
                {
                    roleType: "Wand",
                    roleNum: 2,
                },
                {
                    roleType: "Potion",
                    roleNum: 1,
                }
            ]
        },
        {
            groupName: "confluence",
            roles: [
                {
                    roleType: "Wand",
                    roleNum: 1,
                },
                {
                    roleType: "Crystal Ball",
                    roleNum: 1,
                }
            ]
        }
    ]
  })

  const [teams, setTeams] = useState([])

  function downloadAsCSV() {
      console.log("clicked")
      if (data !== null) {
          try {

              const flattened = []
              // Transform data to csv
              for (const role of data) {
                for (const person of role.people) {
                  flattened.push({"Name": person.name, "Assigned Role": role.role, "Choice": person.choice})
                }
              }
              
              const opts = { };
              const parser = new Parser(opts);
              const csv = parser.parse(flattened);

              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
              const url = URL.createObjectURL(blob)
                
              let pom = document.createElement('a');
              pom.href = url;
              pom.setAttribute('download', 'matchme.csv');
              pom.click();
          } catch (err) {
              console.error(err);
          }
      }
    }


  function sortUsers(){

    let flattened: any = {}
    // Transform data to csv
    for (const role of data) {
      flattened[role.role] = [];
      for (const person of role.people) {
        flattened[role.role].push(person)
      }
      flattened[role.role].sort(() => Math.random() - 0.5)
    }

    const groupAssignments: any = []
    for (const group of groupData.groups) {
      const groupDict: any = {
        "group_name": group.groupName,
        "roles": []
      }
      for (const role of group.roles) {
        if (role.roleType in flattened) {
          const num_to_take = Math.min(flattened[role.roleType].length, role.roleNum)
          const people = []
          let i = 0
          while (i < num_to_take) {
            const person = flattened[role.roleType].pop()
            people.push(person)
            i += 1;
          }
          groupDict.roles.push({
            "role_name": role.roleType,
            "names": people,
            "desired": role.roleNum
          })
        }        
      }
      groupAssignments.push(groupDict)
    }
    setTeams(groupAssignments)
  }

  useEffect(sortUsers, [])

  const roles = data.map(role => {
    const names = role.people.map(person => {
      return <PersonRow person={person}/>
    })

    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <b>{role.role}</b>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            {names}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  })

  const groups = teams.map(group=> {
    console.log(group)

    const roleList = group.roles.map(role => {
      return (
        <RoleGrouping role_name={role.role_name} people={role.names} desired={role.desired}/>
      )
    })

    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <b>{group.group_name}</b>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            {roleList}
          </div>
        </AccordionDetails>
      </Accordion>
    )
  })

  return (
    <div>
      <Header eventName={eventName ? eventName : 'New Event'} index='2' />
      <div className="h-screen">
        <div className="flex m-5 justify-between">
          <div className="mt-10 w-1/3" id="Role Assignments">
            {roles}
          </div>
          <div className="flex">
            <div className="my-auto">
            <Button variant="contained" className="w-64 h-64" onClick={sortUsers}>Randomly Assign teams</Button>
            </div>
          </div>
          <div className="mt-10 w-1/3">
            {teams === null ? <h1>Hi</h1> : groups}
          </div>
        </div>
        <div className="flex m-5 justify-between">
          <div className="w-1/3">
              <Button className="w-full" variant="contained" onClick={(e) => downloadAsCSV()}> Download Roles</Button>
          </div>
          <div className="w-1/3">
            <Button className="w-full" variant="contained" onClick={(e) => downloadAsCSV()}> Download Roles with Teams</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventComplete;