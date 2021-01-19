import React, { useState } from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"

const Player = withCustomAudio(props => {
  const [playerClasses] = useState("")

  return (
    <div className={"player" + playerClasses}>
      <PlayButton className="player__play player__btn" {...props} />
      <h1>HasdfasdfasdI</h1>
    </div>
  )
})

export default Player
