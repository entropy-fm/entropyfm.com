import React from "react"

import header from "../../../static/header.png"

class Header extends React.Component {
  render = () => {
    return (
      <header className="header">
        <img src={header}></img>
        <p className="divider" />
      </header>
    )
  }
}

export default Header
