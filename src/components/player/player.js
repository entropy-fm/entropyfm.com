import React from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"

const Player = withCustomAudio(props => {
  return (
    <div className="player">
      <PlayButton className="playerPlay playerButton" {...props} />
    </div>
  )
})

export default Player
