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
  const { setIsPlayerLoaded } = props;
  const { livestreamMetadata, mixcloudApi, offlineText } = useSiteMetadata()
  const [streamData, setStreamData] = useState({
    streamstatus: STREAM_STATUS_LIVE,
  })
  const [mixcloudData, setMixcloudData] = useState("")

  const fetchMixcloudStream = (url = mixcloudApi) => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        for (let i = 0; i < data.data.length; i++) {
          // Fetch most recent
          if (data.data[i].cloudcasts) {
            setMixcloudData(data.data[i].cloudcasts[0].key)
            setIsPlayerLoaded(true)
            return
          }
        }
        // No mixcloud recording found, go to next page
        if (data.paging.next) {
          fetchMixcloudStream(data.paging.next)
        }
      })
  }

  const fetchMetadata = () => {
    fetchJsonp(livestreamMetadata)
      .then(resp => resp.json())
      .then(data => {
        setStreamData(data.streams[0])

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
        <div>
          <PlayButton className="button" {...props} />
          <p>{streamData.songtitle}</p>
        </div>
      ) : (
        <p>{offlineText}</p>
      )}
      {streamData.streamstatus === STREAM_STATUS_OFFLINE && mixcloudData ? (
        <iframe
          id="mixcloud-embed"
          src={`https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=${mixcloudData}`}
          frameborder="0"
          title="Mixcloud Embed"
        />
      ) : null}
    </div>
  )
})

export default Player
