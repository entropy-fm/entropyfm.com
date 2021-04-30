import React, { useEffect } from "react"

const Chat = ({setIsChatLoaded, isActive}) => {
  const className = isActive ? "chat active": "chat"
  useEffect(() => {
    setIsChatLoaded(true);
  }, [])

  return (
    <iframe
      className={className}
      scrolling="no"
      src="https://entropyfmchat.herokuapp.com"
      frameborder="0"
    />
  )
}

export default Chat
