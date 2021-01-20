import React from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"

const Player = withCustomAudio(props => {
  return (
    <>
      <PlayButton className="playerPlay playerButton" {...props} />
    </>
  )
})

export default Player
