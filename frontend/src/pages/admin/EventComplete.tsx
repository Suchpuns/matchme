import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useState } from "react";
import Parser from "@json2csv/plainjs/Parser.js";

const getNumberWithOrdinal = (n: number) => {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}


const EventComplete = () => {
  const { eventName } = useParams();
  console.log(eventName);

  const [data, setData] = useState([{"role": "Wand", "people": [{"name": "Dorian", "choice": 1}, {"name": "Dani", "choice": 3}]}, {"role": "Potion", "people": [{"name": "Monica", "choice": 1}]}, {"role": "Crystal Ball", "people": [{"name": "Nico", "choice": 1}]}])

  console.log(data)
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

  

  const roles = data.map(role => {
    const names = role.people.map(people => {
      
      return (
        <div className="flex justify-between">
          <div>{people.name}</div>
          <div><b>{getNumberWithOrdinal(people.choice)}</b></div>
        </div>
      )
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

  return (
    <>
      <Header eventName={eventName ? eventName : 'New Event'} index='2' />
      <div className="m-10 w-1/3">
        {roles}
        <div className="mt-4">
          <Button className="w-full" variant="contained" onClick={(e) => downloadAsCSV()}> Download Roles</Button>
        </div>
      </div>
    </>
  );
}

export default EventComplete;