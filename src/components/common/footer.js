import React from "react"

import { useSiteMetadata } from "./use-site-metadata"

import mailIcon from "../../../static/icon_mail.png"
import instagramIcon from "../../../static/icon_instagram.png"
import phoneIcon from "../../../static/icon_phone.png"
import mixcloudIcon from "../../../static/icon_mixcloud.png"

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
            <img
              className="icon"
              src={mailIcon}
              onClick={() => {
                openEmail()
              }}
            />
            <img
              className="icon"
              src={instagramIcon}
              onClick={() => {
                openSocialLink(instagram)
              }}
            />
            <img
              className="icon"
              src={mixcloudIcon}
              onClick={() => {
                openSocialLink(mixcloud)
              }}
            />
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer
