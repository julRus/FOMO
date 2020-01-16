import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryBrushContainer,
  VictoryZoomContainer
} from "victory";
import axios from "axios";

const createTally = data => {
  let timeTally = {};
  data.forEach(function(set) {
    if (timeTally[set.time]) {
      timeTally[set.time]++;
    } else {
      timeTally[set.time] = 1;
    }
  });
  return timeTally;
};

let hours = [];
let currentHour = new Date(2020, 1, 1).getHours();
for (let i = currentHour; i < 24; i++) {
  hours.push(i + ":00");
}


class TimeChart extends Component {
  state = {
    data: [],
    zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
  };

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { data } = this.props;
    let test = createTally(data);
    let dataSet = Object.keys(test)
      .map(hour => {
        let numHour = hour.replace(":", "");
        return [numHour, hour]
      })
      .sort((a, b) => {
        return a[0] - b[0];
      })
      .map(hour => {
        return { a: hour[0], b: test[hour[1]]};
      });
    let zoomData = Object.keys(test)
      .map(hour => {
        let numHour = hour.replace(":", "");
        return [numHour, hour];
      })
      .sort((a, b) => {
        return a[0] - b[0];
      })
      .map(hour => {
        return { key: hour[0], b: test[hour[1]] };
      });
    return (
      <div className="age-chart">
        <VictoryChart
          width={600}
          height={470}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={dataSet}
            x="a"
            y="b"
          />
        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={100}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={zoomData}
            x="key"
            y="b"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default TimeChart;
