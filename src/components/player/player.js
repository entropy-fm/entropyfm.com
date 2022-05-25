import React, { useEffect, useState } from "react"
import { PlayButton } from "react-soundplayer/components"
import { withCustomAudio } from "react-soundplayer/addons"
import fetchJsonp from "fetch-jsonp"

import { useSiteMetadata } from "../common/use-site-metadata"

const METADATA_POLLING_INTERVAL_MS = 10000
const STREAM_STATUS_OFFLINE = 0,
  STREAM_STATUS_LIVE = 1,
  STREAM_STATUS_FETCH_ERROR = -1

const Player = withCustomAudio(props => {
  const { setIsPlayerLoaded } = props
  const { livestreamMetadata, mixcloudApi, offlineText } = useSiteMetadata()
  const [streamData, setStreamData] = useState({
    streamstatus: STREAM_STATUS_LIVE,
  })
  const [mixcloudData, setMixcloudData] = useState("")

  const fetchMixcloudStream = (url = mixcloudApi) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        // Fetch most recent
        setMixcloudData(data.data[0].key)
        setIsPlayerLoaded(true)
      })
  }

  const fetchMetadata = () => {
    fetchJsonp(livestreamMetadata)
      .then(resp => resp.json())
      .then(data => {
        setStreamData(data.streams[0])
        console.log(data)

        // Check if stream is down, if so fetch mixcloud livestream
        if (
          data.streams[0].streamstatus !== STREAM_STATUS_LIVE &&
          !mixcloudData
        ) {
          fetchMixcloudStream()
        } else {
          setIsPlayerLoaded(true)
        }
      })
      .catch(() => {
        // In case we're unable to get the json data
        if (streamData.streamstatus) {
          setStreamData({ streamstatus: STREAM_STATUS_FETCH_ERROR })
        }
        if (!mixcloudData) {
          fetchMixcloudStream()
        }
      })
  }

  useEffect(() => {
    fetchMetadata()
    const timer = setInterval(
      () => fetchMetadata(),
      METADATA_POLLING_INTERVAL_MS
    )

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="player">
      {streamData.streamstatus === STREAM_STATUS_LIVE ? (
        <>
          <PlayButton className="button" {...props} />
          <p className="player-title">{streamData.songtitle}</p>
        </>
      ) : (
        <>
          <p>{offlineText}</p>
          {mixcloudData && (
            <iframe
              id="mixcloud-embed"
              src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${mixcloudData}`}
              title="Mixcloud Embed"
            />
          )}
        </>
      )}
    </div>
  )
})

export default Player
