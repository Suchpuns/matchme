import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TextField, Tooltip, Paper } from "@mui/material";
import Header from "../../components/Header";

const EventPrefs = () => {
  const [users, updateUser] = useState<string[]>([]);
  const [username, updateUsername] = useState<string>("");
  const [links, setLinks] = useState<Record<string, string>>({});
  const { eventName } = useParams();
  const navigate = useNavigate();
  const groups = [
    {
      groupName: "jira",
      roles: [
        {
          roleType: "frontend",
          roleNum: 4,
        },
        {
          roleType: "backend",
          roleNum: 5,
        },
      ],
    },
    {
      groupName: "confluence",
      roles: [
        {
          roleType: "frontend",
          roleNum: 6,
        },
        {
          roleType: "backend",
          roleNum: 4,
        },
      ],
    },
  ];
  const colours = ["skyblue", "lightgreen", "orange"];
  let num = 0;

  const updateUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUsername(e.target.value);
  };

  const goComplete = () => {
    navigate(`/admin/${eventName}/complete`);
  };

  const addUser = async () => {
    if (username === "" || users.includes(username)) {
      return;
    }

    users.push(username);
    // Get link
    const res = await fetch(`${import.meta.env.VITE_BE_URL}/events/form_links`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ event_name: eventName, people: users }),
    });
    const data = await res.json();
    console.log(eventName);

    for (const link of data.links) {
      if (link["person_name"] == username) {
        console.log(link);
        const user_link = `http://localhost:5173/user/${link["event_name"]}/${link["person_name"]}/${link["person"]}`;
        links[username] = user_link;
        setLinks(links);
        updateUsername(username);
        updateUsername("");
      }
    }
    updateUser(users);
    updateUsername("");
  };
  const removeUser = (e: React.MouseEvent<HTMLElement>) => {
    const new_users = users.filter(user => user != e.currentTarget.id);
    updateUser(new_users);
  };

  const getColour = () => {
    num++;
    return colours[num % 3];
  };

  return (
    <>
      <Header eventName={eventName ? eventName : "New Event"} index="1" />
      <div className="ml-20 mx-auto gap-10 mt-5 mr-20">
        <div style={{ width: "60rem" }} className="mx-auto">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-amber focus:outline-blue-500">
              Add user
            </label>
            <TextField
              onChange={updateUsers}
              value={username}
              id="username"
              variant="outlined"
              className="bg-white rounded"
            ></TextField>
            <button
              onClick={addUser}
              className="ml-5 mt-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          {users.map(user => {
            return (
              <>
                <Paper
                  key={user}
                  sx={{ backgroundColor: getColour() }}
                  className="w-30 flex items-center mb-5 border-black rounded border-2"
                >
                  <p className="ml-20">{user}</p>
                  <p className="ml-auto mr-10 truncate w-60 text-blue-800 underline">
                    {links[user]}
                  </p>
                  <Tooltip title="Copy link">
                    <svg
                      className="mr-3 w-5 h-5 fill-gray-900 hover:fill-gray-600 active:fill-gray-400"
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        navigator.clipboard.writeText(e.currentTarget.id);
                      }}
                      version="1.1"
                      id={links[user]}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 352.804 352.804"
                    >
                      <g>
                        <path
                          d="M318.54,57.282h-47.652V15c0-8.284-6.716-15-15-15H34.264c-8.284,0-15,6.716-15,15v265.522c0,8.284,6.716,15,15,15h47.651
      v42.281c0,8.284,6.716,15,15,15H318.54c8.284,0,15-6.716,15-15V72.282C333.54,63.998,326.824,57.282,318.54,57.282z
       M49.264,265.522V30h191.623v27.282H96.916c-8.284,0-15,6.716-15,15v193.24H49.264z M303.54,322.804H111.916V87.282H303.54V322.804
      z"
                        />
                      </g>
                    </svg>
                  </Tooltip>

                  <button
                    type="button"
                    className="text-gray-900 mr-1 bg-transparent rounded-full text-sm p-0.5 m-1 inline-flex items-center hover:bg-red-500 hover:text-white"
                    id={user}
                    onClick={removeUser}
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
                </Paper>
              </>
            );
          })}
          <div className="grid col-span-2">
            <button
              onClick={goComplete}
              className="p-3 w-56 h-20 bg-card-orange hover:bg-card-green w-full my-7 rounded-xl font-semibold"
            >
              Go match!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPrefs;
