import React from "react"

import { gapi } from "gapi-script"
import moment from "moment"
import "moment-timezone"

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }
  }

  componentDidMount = () => {
    this.getEvents()
  }

  render() {
    return (
      <div>
        <div>Calendar: {this.state.events.length}</div>
        {this.state.events.map(event => (
          <li key={event.id}>
            ({event.startDateFormatted}) {event.summary}
          </li>
        ))}
      </div>
    )
  }

  // TODO(teddywilson) once finalized should be broken up, moved to another file, etc.
  getEvents = () => {
    let that = this
    function start() {
      gapi.client
        .init({
          apiKey: `${process.env.GOOGLE_CALENDAR_API_KEY}`,
        })
        .then(() =>
          gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events`,
          })
        )
        .then(
          response => {
            let events = response.result.items
              .filter(event => {
                return (
                  event.status !== "cancelled" &&
                  event.start.dateTime !== undefined
                )
              })
              .map(event => {
                // TODO(teddywilson) parse end time as well
                let startDate = moment
                  .tz(event.start.dateTime, event.start.timeZone)
                  .local()
                return {
                  id: event.id,
                  summary: event.summary,
                  startDateFormatted: startDate.format("MM/DD/YYYY h:mm:ss"),
                  startDateUnix: startDate.unix(),
                }
              })
              .sort((a, b) => {
                return b.startDateUnix - a.startDateUnix
              })
            that.setState(
              {
                events,
              },
              () => {
                console.log(that.state.events)
              }
            )
          },
          function (reason) {
            console.log(reason)
          }
        )
    }
    gapi.load("client", start)
  }
}

export default Calendar
