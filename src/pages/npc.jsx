import { useState } from "react"

import { useData } from "../logic/data-access"

export default function () { 
  // shows a list of all players by alphabetical order
  const { data } = useData()
  const [search, setSearch] = useState('')

  const players = data.sort((a, b) => a['person name'] > b['person name'] ? 1 : -1)

  return <div className="player-list">
    <div className="search-bar">
      <input type="text" placeholder="filter" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    {players.filter(player => !Boolean(search) || player['person name'].toLowerCase().includes(search.toLowerCase())).map((player) => <div key={player.id} className={`player ${player.color}`}>
      <h2>{player['person name']}</h2>
      <h4>{player.color}</h4>
    </div>)}
  </div>
}