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
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,400;0,600;1,400&display=swap"
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
