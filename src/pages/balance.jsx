
import { useData } from "../logic/data-access"

export default function Balance () {
  const { data } = useData()

  if (data.length === 0) {
    return <div>Loading...</div>
  }

  const whites = data.filter(player => player.color === 'white').length
  const blacks =  data.length - whites

  const white = whites / (whites + blacks)
  const black = blacks / (whites + blacks)

  console.log('white', white)
  console.log('black', black)

  return <div className="balance">
    <div className="balance-white" style={{ height: '100%', width: `${white * 100}%`, backgroundColor: 'white', position: 'absolute', top: 0, left: 0 }}></div>
    <div className="balance-black" style={{ height: '100%', width: `${black * 100}%`, backgroundColor: 'black', position: 'absolute', top: 0, right: 0 }}></div>
  </div>
}