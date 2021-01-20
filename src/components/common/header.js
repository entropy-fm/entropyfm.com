import React from "react"

import { Link } from "gatsby"

class Header extends React.Component {
  render = () => {
    return (
      <header className="header">
        <Link to="/">
          <h1 aria-label="Defund Twelve .org">Entropy FM</h1>
        </Link>
        <p className="divider">player</p>
      </header>
    )
  }
}

export default Header
