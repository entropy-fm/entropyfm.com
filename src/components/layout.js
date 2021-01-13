import React from "react"

import Footer from "./footer"
import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: 32,
        marginTop: 32,
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
