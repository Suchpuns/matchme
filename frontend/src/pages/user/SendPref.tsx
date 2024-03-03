import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// dummy data
const totalChoices = 3;

// lmao
const SendPref = () => {
  const { eventName, userName, code } = useParams();
  const [prefs, setPrefs] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    console.log(eventName);
    const connect = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BE_URL}/events/roles?event_name=${eventName}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        },
      );
      const data = await res.json();
      console.log(data);
      const newRoles = [];
      for (const role of data.roles) {
        newRoles.push(role[0]);
      }
      setRolesList(newRoles);
    };

    connect();
  }, []);

  const handleRole = (newRole: string) => {
    prefs.includes(newRole)
      ? setPrefs([...prefs].filter(x => x != newRole))
      : setPrefs([...prefs].concat(newRole));
  };

  const submitPrefs = async () => {
    console.log(rolesList);
    const new_prefs = [];
    for (const pref of rolesList) {
      let i = 1;
      for (const role of prefs) {
        if (role === pref) {
          new_prefs.push(i);
          break;
        }
        i++;
      }
    }
    console.log(new_prefs);
    await fetch(`${import.meta.env.VITE_BE_URL}/form/${code}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ preferences: new_prefs }),
    });
    setSubmitted(true);
  };

  // lmao x2
  const showRoles = () =>
    rolesList.map(x =>
      prefs.includes(x) ? (
        <button
          className="bg-card-green p-3 rounded-xl hover:outline outline-offset-2 outline-card-green"
          onClick={() => handleRole(x)}
        >
          {x}
        </button>
      ) : (
        <button
          className="bg-card-orange p-3 rounded-xl hover:outline outline-offset-2 outline-card-orange"
          disabled={prefs.length >= totalChoices}
          onClick={() => handleRole(x)}
        >
          {x}
        </button>
      ),
    );

  const showPrefs = () =>
    prefs.map((x, i) => (
      <button
        className="border-2 border-black rounded-xl my-2 p-3 hover:bg-black/10"
        onClick={() => setPrefs([...prefs].filter(item => item != x))}
      >
        {i + 1}. {x}
      </button>
    ));

  return (
    <div className="flex flex-col w-full h-screen">
      <p className="ml-6 mt-8 leading-2 text-3xl font-bold text-theme-cream">{eventName}</p>
      <p className="ml-6 text-blue-300">
        Hiya {userName}, let us know your preferences to help us better assign a role to you!
      </p>

      <div className="grid grid-cols-5 gap-4 w-full h-full">
        <div className="col-span-3 p-5">
          <p className="text-theme-cream font-semibold text-l m-3">
            Click in order from most preferred to least preferred
          </p>
          <div className="bg-theme-cream/30 h-5/6 rounded-xl p-2 outline outline-white/30 outline-2 outline-offset-2">
            <div className="grid grid-cols-3 gap-4 items-start p-3 h-fit">{showRoles()}</div>
          </div>
        </div>

        <div className="col-span-2 p-5">
          <p className="text-theme-cream font-semibold text-l m-3">
            Your preferences ({prefs.length}/{rolesList.length})
          </p>
          <div className="flex flex-col p-3 h-4/6 bg-theme-cream/30 rounded-xl outline outline-white/30 outline-2 outline-offset-2">
            {showPrefs()}
          </div>
          <button
            onClick={submitPrefs}
            className="p-3 bg-card-orange hover:bg-card-green w-full my-7 rounded-xl font-semibold"
          >
            Submit
          </button>
          {submitted ? (
            <div className="bg-card-green rounded-xl mx-auto flex items-center">
              <p className="mx-auto">
                <b>SUBMITTED</b>
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SendPref;
