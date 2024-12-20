import React from 'react'
import { Outlet } from 'react-router-dom'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <div className="App app-container">
      <header className="py-4 mb-4 border-b">
        <h1 className="text-2xl font-bold text-primary">Newsletter Discovery</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
