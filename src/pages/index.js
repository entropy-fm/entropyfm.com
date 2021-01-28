import React from "react"

import Calendar from "../components/calendar/calendar"
import Layout from "../components/common/layout"
import Player from "../components/player/player"
import { useSiteMetadata } from "../components/common/use-site-metadata"

export default function Home() {
  const { livestreamUrl } = useSiteMetadata()
  
  return (
    <Layout>
      <Player
        streamUrl={livestreamUrl}
        preloadType="auto"
      />
      <Calendar />
    </Layout>
  )
}
