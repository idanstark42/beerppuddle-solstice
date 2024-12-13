import { useState, useEffect } from "react"
import { useData } from "../logic/data-access"
import Loader from "../components/loader"

const SPINNING_SPEED = 10

export default function Balance () {
  const { data } = useData()
  const [angle, setAngle] = useState(90)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + SPINNING_SPEED / 10) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (data.length === 0) {
    return <Loader />
  }

  const whites = data.filter(player => player.color === 'white').length
  const blacks =  data.length - whites

  const black = blacks / (whites + blacks)

  return <div className="balance"
    style={{
      background: `linear-gradient(${angle}deg, black 0%, black ${100 * black}%, white ${100 * black}%, white 100%)`
    }}
  />
}