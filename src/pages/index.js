import React from "react"

import Calendar from "../components/calendar"
import Header from "../components/header"
import Layout from "../components/layout"
import Player from "../components/player"

export default function Home() {
  return (
    <Layout>
      <Header />
      {/* <h3>-----------</h3>
      <h3>Player</h3>
      <Player />
      <h3>-----------</h3> */}
      <Calendar />
    </Layout>
  )
}
