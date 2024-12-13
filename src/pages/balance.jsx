import { useState, useEffect } from "react"
import { useData } from "../logic/data-access"

const MAX_GRADIENT = 10
const MIN_GRADIENT = 0

const SPINNING_SPEED = 10
const BALANCE_SPEED = 10

export default function Balance () {
  const { data } = useData()
  const [angle, setAngle] = useState(90)
  const [gradient, setGradient] = useState({ value: MIN_GRADIENT, growing: true })

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + SPINNING_SPEED / 10) % 360)
      // setGradient((prev) => {
      //   const { value, growing } = prev
      //   const newGrowing = value >= MAX_GRADIENT ? false : value <= MIN_GRADIENT ? true : growing
      //   return { value: value + (newGrowing ? 1 : -1) * BALANCE_SPEED / 10, growing: newGrowing }
      // })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (data.length === 0) {
    return <div>Loading...</div>
  }

  const whites = data.filter(player => player.color === 'white').length
  const blacks =  data.length - whites

  const black = blacks / (whites + blacks)

  return <div className="balance"
    style={{
      background: `linear-gradient(${angle}deg, black 0%, black ${100 * black - gradient.value}%, white ${100 * black + gradient.value}%, white 100%)`
    }}
  />
}