import React from "react"

const Tabs = ({currentPage, setCurrentPage}) => {
  return (
    <div className="tabs">
      <span
        className={currentPage === "calendar" ? "active" : ""}
        onClick={() => setCurrentPage("calendar")}
      >
        calendar
      </span>
      <span
        className={currentPage === "chat" ? "active" : ""}
        onClick={() => setCurrentPage("chat")}
      >
        chat
      </span>
    </div>
  )
}

export default Tabs
