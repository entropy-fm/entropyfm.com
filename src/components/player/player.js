import React, { useEffect, useState } from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"

import fetchJsonp from "fetch-jsonp"

const Player = withCustomAudio(props => {
  const [streamData, setStreamData] = useState({ streamstatus: 1 })
  const [mixcloudData, setMixcloudData] = useState("")

  const fetchMixcloudStream = () => {
    fetch("https://api.mixcloud.com/entropyfm/feed/")
      .then(resp => resp.json())
      .then(data => {
        while (true) {
          let temp = data.data[Math.floor(Math.random() * data.data.length)]
          if (temp.cloudcasts) {
            setMixcloudData(temp.cloudcasts[0].key)
            break
          }
        }
      })
  }

  const fetchMetadata = () => {
    fetchJsonp("https://s28.myradiostream.com/26952/statistics?sid=1&json=1")
      .then(resp => resp.json())
      .then(data => {
        setStreamData(data.streams[0])

        if (!streamData.streamstatus && !mixcloudData) fetchMixcloudStream()
      })
      .catch(() => {
        if (streamData.streamstatus) setStreamData({ streamstatus: 0 })
        if (!mixcloudData) fetchMixcloudStream()
      })
  }

  useEffect(() => {
    fetchMetadata()
    const timer = setInterval(() => {
      fetchMetadata()
    }, 10000)

    return () => clearInterval(timer)
  })

  return (
    <div className="player">
      {streamData.streamstatus ? (
        <div>
          <PlayButton
            className="button"
            {...props}
            style={{ float: "left", marginRight: "10px" }}
          />
          <p>{streamData.songtitle}</p>
        </div>
      ) : (
        <p>We're currently offline, check out a previous show below!</p>
      )}
      {!streamData.streamstatus && mixcloudData !== "" ? (
        <iframe
          width="100%"
          height="120"
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${mixcloudData}`}
          frameborder="0"
        />
      ) : null}
    </div>
  )
})

export default Player
