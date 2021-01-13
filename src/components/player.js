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
        <img
          src={this.state.isPlaying ? "pause.png" : "play.png"}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </div>
    )
  }
}

export default Player
