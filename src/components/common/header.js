import React from "react"

import header from "../../../static/header.png"

class Header extends React.Component {
  render = () => {
    return (
      <div className="header">
        <img src={header} alt="Entropy FM Header" />
      </div>
    )
  }
}

export default Header
