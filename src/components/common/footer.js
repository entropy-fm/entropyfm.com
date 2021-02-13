import React from "react"

import { useSiteMetadata } from "./use-site-metadata"

import instagramIcon from "../../../static/icon_instagram.png"
import mailIcon from "../../../static/icon_mail.png"
import mixcloudIcon from "../../../static/icon_mixcloud.png"
import phoneIcon from "../../../static/icon_phone.png"

const Footer = ({ isReady }) => {
  const { applyText, email, instagram, mixcloud } = useSiteMetadata()
  const openEmail = () => {
    window.location.href = `mailto:${email}`
  }
  const openSocialLink = url => {
    window.open(url, "_blank")
  }
  return (
    <>
      <div className={"sticky" + (isReady ? " fade ready" : " fade")}>
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
            <img
              className="icon"
              src={phoneIcon}
              onClick={() => {
                // TODO(teddywilson): implement
              }}
            />
          </span>
        </div>
      </div>
    </>
  )
}

export default Footer
