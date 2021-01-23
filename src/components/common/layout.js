import React from "react"

import { Helmet } from "react-helmet"

import Footer from "./footer"
import Header from "./header"
import { useSiteMetadata } from "./use-site-metadata"

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* CSS Includes */}
        {/* eslint-disable-next-line max-len*/}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* eslint-disable-next-line max-len*/}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
