import React from "react"

import Calendar from "../components/calendar"
import Player from "../components/player"

export default function Home() {
  return (
    <div>
      <h1>Entropy FM</h1>
      <h3>-----------</h3>
      <h3>Player</h3>
      <Player />
      <h3>-----------</h3>
      <Calendar />
    </div>
  )
}
