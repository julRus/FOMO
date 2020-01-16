import React, { Component } from "react";
import ReactDOM from "react-dom";
import { VictoryPie } from "victory";
import axios from "axios";

const createTally = data => {
  let typeTally = {};
  data.forEach(function(set) {
    if (typeTally[set.event_type]) {
      typeTally[set.event_type]++;
    } else {
      typeTally[set.event_type] = 1;
    }
  });
  return typeTally;
};

class TimeChart extends Component {
  state = {
    zoomDomain: {}
  };

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { data } = this.props;
    let test = createTally(data);
    let chartData = Object.keys(test).map(type => {
      return { x: type, y: test[type], label: type };
    });
    return (
      <div className="age-chart">
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          data={chartData}
        />
      </div>
    );
  }
}

export default TimeChart;
