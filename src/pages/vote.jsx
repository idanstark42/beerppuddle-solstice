import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

import { useData } from "../logic/data-access"
import Loader from '../components/loader'

export default function () { 
  // shows a list of all players by alphabetical order
  const { data, vote } = useData()
  const { id } = useParams()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState('loading')

  useEffect(() => {
    if (data.length === 0) {
      return
    }
    const player = data.find(player => player.id == id)
    if (player && player.vote !== 'none') {
      setSelected(player.vote)
    } else {
      setSelected('none')
    }
  }, [data])

  if (data.length === 0 || loading) {
    return <Loader />
  }

  async function submit () {
    setLoading(true)
    await vote(id, selected)
    setLoading(false)
  }

  const players = data.sort((a, b) => a['person name'] > b['person name'] ? 1 : -1)
  const current = players.find(player => player.id == id)

  const voteText = () => {
    if (selected === 'loading') {
      return ''
    }
    const serverVote = current.vote
    const selectedVote = selected
    if (serverVote === 'none' && selectedVote === 'none') {
      return 'vote'
    } else if (serverVote === 'none' && selectedVote !== 'none') {
      return `vote for ${players.find(player => player.id == selected)['person name']}`
    } else if (serverVote == selectedVote) {
      return `voted for ${players.find(player => player.id == selected)['person name']}`
    } else {
      return `vote for ${players.find(player => player.id == selected)['person name']}`
    }
  }

  const disabled = selected === 'loading' || selected === 'none' || selected === current.vote

  return <div className="vote-page">
    <div className="search-bar">
      <input type="text" placeholder="filter" value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    <div className="player-list">
      {players.filter(player => !Boolean(search) || player['person name'].toLowerCase().includes(search.toLowerCase())).map((player) =>
        <div key={player.id} className={`player ${player.id == selected ? 'selected' : ''}`} onClick={() => setSelected(player.id)}>
          <h3>{player['person name']}</h3>
        </div>)}
    </div>
    <div className="submit">
      <div className={`submit-button ${disabled ? 'disabled' : ''}`} onClick={submit}>{voteText()}</div>
    </div>
  </div>
}