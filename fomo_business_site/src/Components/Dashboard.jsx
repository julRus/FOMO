import React, { Component } from 'react';
import AgeChart from './AgeChart';
import GenderChart from "./GenderChart"
import TimeChart from "./TimeChart"
import TypeChart from "./TypeChart";
import axios from "axios";

class Dashboard extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getEventData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data.length !== this.state.data.length) {
      this.getEventData();
    }
  }

  getEventData() {
    return axios
      .get("https://fomo-api.herokuapp.com/event_history")
      .then(({ data }) => {
        this.setState({ data: data.event_history });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <AgeChart data={data} />
        <GenderChart data={data} />
        <TimeChart data={data} />
        <TypeChart data={data} />
      </div>
    );
  }
}

export default Dashboard;