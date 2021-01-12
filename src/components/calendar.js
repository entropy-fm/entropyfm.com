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
          <li key={event.id}>{event.summary}</li>
        ))}
      </div>
    )
  }

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
            // TODO(teddywilson) timezone parsing and sorting by date
            let events = response.result.items.filter(event => {
              return event.status !== "cancelled"
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
