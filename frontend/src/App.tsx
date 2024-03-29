import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import EventCreation from "./pages/admin/EventCreation.tsx";
import Events from "./pages/admin/Events.tsx";
import EventPrefs from "./pages/admin/EventPrefs.tsx";
import EventComplete from "./pages/admin/EventComplete.tsx";
import SendPref from "./pages/user/SendPref.tsx";
import TestDownload from "./components/testDownload.tsx";
import TestUpload from "./components/testUpload.tsx";

function App() {
  useEffect(() => {
    console.log("hey");
    console.log(events);
    fetch("http://127.0.0.1:5000")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      })
      .catch(e => console.log(e));
  }, []);

  const [events, setEvents] = useState({});

  const getEvents = () => {
    return events;
  };

  const updateEvents = events_ => {
    setEvents(events_);
    console.log(events);
    return;
  };

  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/test" element={<TestDownload />} />
      <Route path="/test2" element={<TestUpload />} />
      <Route
        path="/admin/:eventName/create"
        element={<EventCreation getEvents={getEvents} setEvents={updateEvents} />}
      />
      <Route path="/admin/:eventName/preference" element={<EventPrefs />} />
      <Route
        path="/admin/:eventName/complete"
        element={<EventComplete events={events} setEvents={setEvents} />}
      />
      <Route path="/user/:eventName/:userName/:code" element={<SendPref />} />
    </Routes>
  );
}

export default App;
