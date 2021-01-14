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
        {this.state.events.map(event => (
          <li
            key={event.id}
            style={{
              fontSize: 16,
            }}
          >
            ({event.dateFormatted}) {event.summary}
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
            params: {
              timeMin: moment().toISOString(),
              timeMax: moment().add(3, "M").toISOString(),
              maxResults: 20,
              singleEvents: true,
              orderBy: "startTime",
            },
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
                let startDate = moment
                  .tz(event.start.dateTime, event.start.timeZone)
                  .local()
                let endDate = moment
                  .tz(event.end.dateTime, event.end.timeZone)
                  .local()
                let dateFormatted = startDate
                  .format("MM/DD HH:mm")
                  .concat(" - ")
                  .concat(endDate.format("HH:mm"))
                return {
                  id: event.id,
                  summary: event.summary,
                  startDateUnix: startDate.unix(),
                  endDateUnix: endDate.unix(),
                  dateFormatted: dateFormatted,
                }
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
