import { useEffect, useState, createContext, useContext } from "react"

const DataContext = createContext()

const BASE_URL = 'https://script.google.com/macros/s/AKfycbxpqpXy15quX5wVTBLKIX6bvmo_p19bvPI5NyEa9SCcdsF87IAszpAAt6BEWghKANhK/exec'

export function DataProvider({ children, reload }) {
  const [data, setData] = useState([])
  const [updateTimeout, setUpdateTimeout] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}?action=load`)
      .then((res) => res.json())
      .then((data) => setData(data.state))
      .catch((err) => console.error(err))

    function reloadData () {
      if (updateTimeout) {
        clearTimeout(updateTimeout)
      }
  
      const timeout = setTimeout(() => {
        fetch(`${BASE_URL}?action=load`)
          .then((res) => res.json())
          .then((data) => setData(data.state))
          .catch((err) => console.error(err))
          .then(reloadData)
      }, 5000)
  
      setUpdateTimeout(timeout)
    }

    if (reload) {
      reloadData()
    }
  }, [])

  async function set (id, color) {
    return fetch(`${BASE_URL}?action=set&id=${id}&color=${color}`)
      .then((res) => res.text())
      .then((data) => {
        if (data === color) {
          setData((prev) => prev.map((player) => player.id == id ? { ...player, color } : player))
        } else {
          throw new Error(`Failed to update color for player ${id}`)
        }
      })
      .catch((err) => console.error(err))
  }

  return <DataContext.Provider value={{ data, set }}>{children}</DataContext.Provider>
}

export function useData() {
  return useContext(DataContext)
}
