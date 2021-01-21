import React from "react"
import { Link } from "gatsby"
import { MarkdownUtils } from "../../utils/markdown-utils"

class Footer extends React.Component {
  render = () => {
    return (
      <>
        <aside className="sticky">
          <div>
            <p className="divider" />
            <span className="city-request-link">
              <span className="react-inserted">Want to be on air?</span>
            </span>
            <span className="snail-mail-link">
              <span className="emojicon">📬</span>
              <span className="emojicon">📸</span>
              <span className="emojicon">🎛️</span>
            </span>
          </div>
        </aside>
      </>
    )
  }
}

export default Footer
