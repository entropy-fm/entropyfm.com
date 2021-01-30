import React from "react"

import header from "../../../static/header.png"

class Header extends React.Component {
  render = () => {
    return (
      <header className="header">
        <img src={header} alt="Entropy FM Header" />
        <p className="divider" />
      </header>
    )
  }
}

export default Header
