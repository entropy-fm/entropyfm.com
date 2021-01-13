import React from "react"

import { gapi } from "gapi-script"

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
            ({event.startDate}) {event.summary}
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
                // TODO(teddywilson) this is totally wrong and is WIP
                let startDate = new Date(event.start.dateTime).toLocaleString(
                  "en-US",
                  {
                    timeZone: event.start.timeZone,
                  }
                )
                console.log(startDate)
                return {
                  id: event.id,
                  summary: event.summary,
                  startDate: startDate,
                }
              })
              .sort((a, b) => {
                return b.startDate - a.startDate
              })
            that.setState(
              {
                events,
              },
              () => {
                //console.log(that.state.events)
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
