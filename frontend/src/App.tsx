import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

import EventCreation from "./pages/admin/EventCreation.tsx"

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
      <Route path="/" element={<EventCreation/>}/>
    </Routes>
  )
}

export default App
