import React from "react"

import Calendar from "../components/calendar"
import Layout from "../components/layout"
import Player from "../components/player"

export default function Home() {
  return (
    <Layout>
      <Player
        streamUrl="http://wpr-ice.streamguys.net/wpr-hd2-mp3-96"
        preloadType="auto"
      />{" "}
      <Calendar />
    </Layout>
  )
}
