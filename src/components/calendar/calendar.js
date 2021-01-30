import React from "react"

import { gapi } from "gapi-script"
import moment from "moment"
import "moment-timezone"

const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]

// Right now we cache the calendar events, but this may not be ideal as
// users are probably reloading the site days apart when the events change.
// A better strategy may be to display some kind of loading animation/indication.
class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    }
  }

  componentDidMount = () => {
    const events = localStorage.getItem("events")
    if (events !== null) {
      this.setState({ events: JSON.parse(events) })
    }
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
              var weekday = event.weekday
              var item = (
                <div key={event.id} className="item">
                  <div className="date">{event.time}</div>
                  <div>{event.summary}</div>
                </div>
              )
              if (idx === 0 || this.state.events[idx - 1].weekday !== weekday) {
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

  getEvents = () => {
    let that = this
    function start() {
      gapi.client
        .init({
          apiKey: `${process.env.GATSBY_GOOGLE_CALENDAR_API_KEY}`,
        })
        .then(() =>
          gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${process.env.GATSBY_GOOGLE_CALENDAR_ID}/events`,
            params: {
              timeMin: moment().startOf("day").toISOString(),
              maxResults: 12,
              singleEvents: true,
              orderBy: `startTime`,
            },
          })
        )
        .then(
          response => {
            let events = response.result.items
              .filter(event => {
                return (
                  event.status !== `cancelled` &&
                  event.start.dateTime !== undefined
                )
              })
              .map(event => {
                let date = moment
                  .tz(event.start.dateTime, event.start.timeZone)
                  .local()
                return {
                  id: event.id,
                  summary: event.summary,
                  time: date.format(`HH:mm`),
                  weekday: date.weekday() - 1,
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
            localStorage.setItem("events", JSON.stringify(events))
            that.props.setIsCalendarLoaded(true)
          },
          function (reason) {
            console.log(reason)
          }
        )
    }
    gapi.load(`client`, start)
  }
}

export default Calendar
