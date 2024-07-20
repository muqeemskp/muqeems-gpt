import React from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/sidebar'
import PromptMain from './Components/prompt-main/prompt-main.jsx'

function App() {
  return (
    <div className="container">
      <Sidebar />
      <PromptMain/>
    </div>
  )
}

export default App;
