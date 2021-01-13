import React from "react"

const Layout = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: 32,
        marginTop: 32,
      }}
    >
      <main>{children}</main>
    </div>
  )
}

export default Layout
