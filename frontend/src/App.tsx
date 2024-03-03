import { useEffect } from "react";
import { Route, Routes } from "react-router";

import EventCreation from "./pages/admin/EventCreation.tsx";
import Events from "./pages/admin/Events.tsx";
import EventPrefs from "./pages/admin/EventPrefs.tsx";
import EventComplete from "./pages/admin/EventComplete.tsx";
import SendPref from "./pages/user/SendPref.tsx";
import TestDownload from "./components/testDownload.tsx";
import TestUpload from "./components/testUpload.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Events />} />
      <Route path="/test" element={<TestDownload />} />
      <Route path="/test2" element={<TestUpload />} />
      <Route path="/admin/:eventName/create" element={<EventCreation />} />
      <Route path="/admin/:eventName/preference" element={<EventPrefs />} />
      <Route path="/admin/:eventName/complete" element={<EventComplete />} />
      <Route path="/user/:eventName/:userName/:code" element={<SendPref />} />
    </Routes>
  );
}

export default App;
