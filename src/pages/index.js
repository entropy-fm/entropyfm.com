import React from "react"

import Calendar from "../components/calendar/calendar"
import Layout from "../components/common/layout"
import Player from "../components/player/player"

export default function Home() {
  return (
    <Layout>
      <Player
        streamUrl="https://s28.myradiostream.com/26952/listen.mp3"
        preloadType="auto"
      />
      <Calendar />
    </Layout>
  )
}
