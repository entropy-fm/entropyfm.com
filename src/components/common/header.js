import React from "react"

import { Link } from "gatsby"

import header from "../../../static/header-2.png"

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
