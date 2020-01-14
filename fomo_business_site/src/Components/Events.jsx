import React, { Component } from "react";
import { Link } from "@reach/router";
import axios from "axios";

class Events extends Component {
  state = {
    events: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchEvents();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.events !== this.state.events) {
      // this.fetchEvents();
    }
  };

  fetchEvents = () => {
    return axios
      .get("https://fomo-api.herokuapp.com/events")
      .then(({ data }) => {
        this.setState({ events: data.events, isLoading: false });
      });
  };

  render() {
    const { events, isLoading } = this.state;
    console.log(events);
    return (
      <div>
        <h1>My Events</h1>
        <Link to="/events/newevent">
        <button>Add Event</button>
        </Link>
        <ul>
          {events.map(event => {
            return (
              <div className="card">
                <h3>Name:{event.name}</h3>
                <h4>Location:{event.location}</h4>
                <h4>Description:{event.description}</h4>
                <h4>Event Type:{event.event_type}</h4>
                <h4>Date:{event.date}</h4>
                <h4>Time:{event.time}</h4>
                <h4>Min age:{event.min_age}</h4>
                <h4>Date:{event.date}</h4>
                <h4>Cost:{event.cost}</h4>
                <button>Edit</button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Events;