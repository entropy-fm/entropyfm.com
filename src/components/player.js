import React from "react"

class Player extends React.Component {
  state = {
    isPlaying: false,
  }
  toggleState = () => {
    this.setState({ isPlaying: !this.state.isPlaying })
  }
  render = () => {
    return (
      <div onClick={this.toggleState}>
        {this.state.isPlaying ? "Pause" : "Play"}
      </div>
    )
  }
}

export default Player
