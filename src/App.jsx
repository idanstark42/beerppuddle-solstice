import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import PlayerScreen from './pages/player'
import VoteScreen from './pages/vote'
import NPCScreen from './pages/npc'
import Balance from './pages/balance'

import { DataProvider } from './logic/data-access'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/player/:id" element={<DataProvider><PlayerScreen /></DataProvider>} />
        <Route path="/vote/:id" element={<DataProvider><VoteScreen /></DataProvider>} />
        <Route path="/npc/:name" element={<DataProvider reload><NPCScreen /></DataProvider>} />
        <Route path="/balance" element={<DataProvider reload><Balance /></DataProvider>} />
      </Routes>
    </Router>
  )
}

export default App
