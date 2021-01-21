import React from "react"

import { gapi } from "gapi-script"
import moment from "moment"
import "moment-timezone"

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

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

  weekdayToString(weekday) {
    return WEEKDAYS[weekday]
  }

  render() {
    return (
      <main className="calendar">
        <section className="list">
          <article>
            {this.state.events.map((event, idx) => {
              var weekday = event.date.weekday()
              var item = (
                <div className="item">
                  <div>{event.date.format("HH:mm")}</div>
                  <div> </div>
                  <div>{event.summary}</div>
                </div>
              )
              if (
                idx == 0 ||
                this.state.events[idx - 1].date.weekday() != weekday
              ) {
                var header = (
                  <li key={weekday} className="header">
                    {this.weekdayToString(weekday)}
                  </li>
                )
                return [header, item]
              }
              return item
            })}
          </article>
        </section>
      </main>
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
              maxResults: 12,
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
                let dateFormatted = startDate.format("MM/DD, HH:mm")
                return {
                  id: event.id,
                  summary: event.summary,
                  date: startDate,
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
