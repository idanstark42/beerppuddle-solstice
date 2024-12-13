import { useEffect, useState } from "react"

import { useData } from "../logic/data-access"
import Loader from '../components/loader'

export default function () { 
  // shows a list of all players by alphabetical order
  const { data } = useData()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSearch('')
  }, [selected])

  if (data.length === 0) {
    return <Loader />
  }

  const players = data.sort((a, b) => a['person name'] > b['person name'] ? 1 : -1)

  const selectedPlayers = players.filter(player => selected.includes(player.id))
  const unselectedPlayers = players.filter(player => !selected.includes(player.id))

  return <div className="npc">
    <div className="search-bar">
      <input type="text" placeholder="filter" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div className="player-list">
      {selectedPlayers.map((player) =>
        <div key={player.id} className={`player ${player.color}`} onClick={() => setSelected(selected.filter(id => id !== player.id))}>
          <h3>{player['person name']}</h3>
          <div>{player.color}</div>
        </div>)}
      {selectedPlayers.length > 0 ? <div className="selected-players-seperator" /> : <div className="none-selected">No players selected</div>}
      {unselectedPlayers.filter(player => !Boolean(search) || player['person name'].toLowerCase().includes(search.toLowerCase())).map((player) =>
        <div key={player.id} className={`player ${player.color}`} onClick={() => setSelected([...selected, player.id])}>
          <h3>{player['person name']}</h3>
          <div>{player.color}</div>
        </div>)}
    </div>
  </div>
}