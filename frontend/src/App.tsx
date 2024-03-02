import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

import EventCreation from "./pages/admin/EventCreation.tsx"
import Events from './pages/admin/Events.tsx'
import EventPrefs from './pages/admin/EventPrefs.tsx'
import EventComplete from './pages/admin/EventComplete.tsx'

function App() {
  
  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then(resp => resp.json())
      .then((data) => {
        console.log(data)
      })
      .catch((e) => console.log(e))   
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Events/>}/>
      <Route path="/admin/:eventName/create" element={<EventCreation/>}/>
      <Route path="/admin/:eventName/preference" element={<EventPrefs/>}/>
      <Route path="/admin/:eventName/complete" element={<EventComplete/>}/>
    </Routes>
  )
}

export default App
