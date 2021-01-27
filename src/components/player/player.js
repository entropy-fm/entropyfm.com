import React, { useEffect, useState } from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"

import fetchJsonp from "fetch-jsonp"

const Player = withCustomAudio(props => {
  const [streamData, setStreamData] = useState({ streamstatus: 1 })
  const [mixcloudData, setMixcloudData] = useState("")

  const fetchMixcloudStream = url => {
    if (!url) url = "https://api.mixcloud.com/entropyfm/feed/"
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        for (let i = 0; i < 10; i++) {
          // 10 tries to fetch a random mixcloud recording
          let temp = data.data[Math.floor(Math.random() * data.data.length)]
          if (temp.cloudcasts) {
            setMixcloudData(temp.cloudcasts[0].key)
            return
          }
        }
        // No mixcloud recording found, go to next page
        fetchMixcloudStream(data.paging.next)
      })
  }

  const fetchMetadata = () => {
    fetchJsonp("https://s28.myradiostream.com/26952/statistics?sid=1&json=1")
      .then(resp => resp.json())
      .then(data => {
        setStreamData(data.streams[0])

        // Check if stream is down, if so fetch mixcloud livestream
        if (!streamData.streamstatus && !mixcloudData) fetchMixcloudStream()
      })
      .catch(() => {
        // In case we're unable to get the json data
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
          title="Mixcloud Embed"
        />
      ) : null}
    </div>
  )
})

export default Player
