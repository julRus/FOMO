import React, { Component } from "react";
import axios from "axios";
import EventForm from "./EventForm";

class Events extends Component {
  state = {
    events: [],
    isLoading: true
  };

  componentDidMount = () => {
    this.fetchEvents();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.events.length !== this.state.events.length) {
      this.fetchEvents()
    }
  };

  getLocations = () => {
    const { events } = this.state;
    events.map(event => {
      axios
        .get(`https://api.postcodes.io/postcodes/${event.venue.postcode}`)
        .then(({ data }) => {
          axios.patch(
            `https://fomo-api.herokuapp.com/events/${event.event_name}/location`,
            { longitude: data.result.longitude, latitude: data.result.latitude }
          );
        });
    });
  };

  fetchEvents = () => {
    const { userId } = this.props;
    // if (userId !== null) {
    return axios
      .get("https://fomo-api.herokuapp.com/events/1")
      .then(({ data }) => {
        this.setState({ events: data.events, isLoading: false });
      });
    // }
  };

  removeEvent = id => {
    this.setState(({ events }) => {
      return {
        events: events.filter(event => event.id !== id)
      };
    });
    return axios.delete(`https://fomo-api.herokuapp.com/events/${id}`);
  };

  postEvent = (
    event_name,
    description,
    event_type,
    date,
    doorsopen,
    doorsclose,
    minage,
    entryprice,
    cityname,
    name,
    postcode,
    address,
    url
  ) => {
    if (url.length > 0) {
      return axios
        .post("https://fomo-api.herokuapp.com/businesses/event/1", {
          event_name: event_name,
          name: name,
          address: address,
          description: description,
          event_type: event_type,
          date: date,
          postcode: postcode,
          cityname: cityname,
          doorsclose: doorsclose,
          doorsopen: doorsopen,
          minage: minage,
          entryprice: entryprice,
          url: url
        })
        .then(({ data }) => {
          this.setState(currentState => {
            return { events: [...currentState.events, data] };
          });
        });  
    } else {
      return axios
        .post("https://fomo-api.herokuapp.com/businesses/event/1", {
          event_name: event_name,
          name: name,
          address: address,
          description: description,
          event_type: event_type,
          date: date,
          postcode: postcode,
          cityname: cityname,
          doorsclose: doorsclose,
          doorsopen: doorsopen,
          minage: minage,
          entryprice: entryprice
        })
        .then(({data}) => {
        this.setState(currentState => {
          return { events: [...currentState.events, data] };
        });
        })  
    }
  }

  render() {
    const { events } = this.state;
    if (events.length > 0) {
      this.getLocations();
    }
    return (
      <div>
        <h1>My Events</h1>
        <ul>
          {events.map(event => {
            return (
              <div className="card">
                <h3>Name:{event.event_name}</h3>
                <h4>Location:{event.venue.name}</h4>
                <h4>Address:{event.venue.address}</h4>
                <h4>Postcode:{event.venue.postcode}</h4>
                <h4>Description:{event.description}</h4>
                <h4>Event Type:{event.event_type}</h4>
                <h4>Date:{event.date}</h4>
                <h4>Opening Time:{event.openingtimes.doorsopen}</h4>
                <h4>Finishing Time:{event.openingtimes.doorsclose}</h4>
                <h4>Min. age:{event.minage}</h4>
                <h4>Cost:{event.eventprice}</h4>
                <button onClick={() => this.removeEvent(event.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
        <EventForm postEvent={this.postEvent} />
      </div>
    );
  }
}

export default Events;
