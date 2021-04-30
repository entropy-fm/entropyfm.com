import React, { useState } from "react"

import Calendar from "../components/calendar/calendar"
import Layout from "../components/common/layout"
import Tabs from "../components/common/tabs"
import Player from "../components/player/player"
import Chat from "../components/chat/chat"
import { useSiteMetadata } from "../components/common/use-site-metadata"

export default function Home() {
  const { livestreamUrl } = useSiteMetadata()

  // Load status
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false)
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false)
  const [isChatLoaded, setIsChatLoaded] = useState(false)

  const [currentPage, setCurrentPage] = useState("calendar")

  let isReady =
    isPlayerLoaded &&
    ((isCalendarLoaded && currentPage === "calendar") ||
      (isChatLoaded && currentPage === "chat"))

  return (
    <Layout isReady={isReady}>
      <Tabs currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Player streamUrl={livestreamUrl} setIsPlayerLoaded={setIsPlayerLoaded} />
      <Calendar
        setIsCalendarLoaded={setIsCalendarLoaded}
        isActive={currentPage === "calendar"}
      />
      <Chat
        setIsChatLoaded={setIsChatLoaded}
        isActive={currentPage === "chat"}
      />
    </Layout>
  )
}
