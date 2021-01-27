import React from "react"

import { useSiteMetadata } from "./use-site-metadata"

const Footer = () => {
  const { applyText, email, instagram, mixcloud } = useSiteMetadata()
  const openEmail = () => {
    window.location.href = `mailto:${email}`
  }
  const openSocialLink = url => {
    window.open(url, "_blank")
  }
  return (
    <>
      <div className="sticky">
        <div>
          <span className="apply-request-link">
            <span className="react-inserted">{applyText}</span>
          </span>
          <span>
            <span
              className="icon"
              onClick={() => {
                openEmail()
              }}
            >
              📬
            </span>
            <span
              className="icon"
              onClick={() => {
                openSocialLink(instagram)
              }}
            >
              📸
            </span>
            <span
              className="icon"
              onClick={() => {
                openSocialLink(mixcloud)
              }}
            >
              🎛️
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer
