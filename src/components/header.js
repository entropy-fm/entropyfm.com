import React from "react"

// TODO(teddywilson) get new header asset without horizontal margins
class Header extends React.Component {
  render = () => {
    return (
      <div>
        <img
          src="header.png"
          style={{
            width: "50%",
          }}
        />
      </div>
    )
  }
}

export default Header
