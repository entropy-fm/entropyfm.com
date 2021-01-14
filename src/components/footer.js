import React from "react"

class Footer extends React.Component {
  render = () => {
    return (
      <div
        className="footer"
        style={{
          position: "fixed",
          backgroundColor: "#000000",
          borderTopStyle: "dashed",
          borderTopColor: "#ffffff",
          borderTopWidth: 8,
          padding: 32,
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <h2>Wanna be on air?</h2>
        <h4>Leave us a message at +1 469 708 9203</h4>
      </div>
    )
  }
}

export default Footer
