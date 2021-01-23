import React from "react"

import { useSiteMetadata } from "./use-site-metadata"

const Footer = () => {
  const { applyText, instagram, mixcloud } = useSiteMetadata()
  const openSocialLink = url => {
    window.open(url, "_blank")
  }
  return (
    <>
      <aside className="sticky">
        <div>
          <p className="divider" />
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
      </aside>
    </>
  )
}

export default Footer
