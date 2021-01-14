import React from "react"
import Player from "./player"

class Footer extends React.Component {
  render = () => {
    return (
      <div className="footer">
        {/* <div
          style={{
            padding: 32,
          }}
        >
          <h2>Wanna be on air?</h2>
          <h4>Leave us a message at +1 469 708 9203</h4>
        </div> */}
        <Player />
      </div>
    )
  }
}

export default Footer
