import React from "react"

import { useSiteMetadata } from "./use-site-metadata"

const Footer = () => {
  const { applyText, instagram, mixcloud } = useSiteMetadata()
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
            <span className="icon">📬</span>
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
