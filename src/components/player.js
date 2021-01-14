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
      <div>
        <img
          className="button"
          src={this.state.isPlaying ? "pause.png" : "play.png"}
          onClick={this.toggleState}
          // TODO(teddywilson) this should be generic
          style={{
            width: 96,
            height: 96,
          }}
        />
      </div>
    )
  }
}

export default Player
