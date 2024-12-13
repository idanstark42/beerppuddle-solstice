import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useData } from '../logic/data-access'

export default function PlayerScreen () {
  const { id } = useParams()
  const { data, set } = useData()
  const [loading, setLoading] = useState(true)

  if (data.length === 0) {
    return <div>Loading...</div>
  }

  const player = data.find((player) => player.id == id)
  if (!player) {
    return <div>Player not found</div>
  }

  const color = player.color
  const opposite = (color === 'white') ? 'black' : 'white'

  async function update () {
    setLoading(true)
    await set(id, opposite)
    setLoading(false)
  }

  return <div className={`player-container ${loading ? 'loading' : ''}`} style={{ backgroundColor: opposite }}>
    <div className="player" onClick={update} style={{ backgroundColor: color, color: opposite }}>
      <h1>{player['person name']}</h1>
      <h2>attuned {color}</h2>
      <h4>click anywhere to switch</h4>
    </div>
  </div>
}