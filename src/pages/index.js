import React, { useState } from "react"

import Calendar from "../components/calendar/calendar"
import Layout from "../components/common/layout"
import Player from "../components/player/player"
import { useSiteMetadata } from "../components/common/use-site-metadata"

export default function Home() {
  const { livestreamUrl } = useSiteMetadata()

  // Load status
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false)
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false)

  let isReady = isPlayerLoaded && isCalendarLoaded;

  return (
    <Layout isReady={isReady}>
      <main className={"content" + (isReady ? " fade ready" : " fade")}>
        <Player
          streamUrl={livestreamUrl}
          setIsPlayerLoaded={setIsPlayerLoaded}
        />
        <Calendar setIsCalendarLoaded={setIsCalendarLoaded} />
      </main>
    </Layout>
  )
}
