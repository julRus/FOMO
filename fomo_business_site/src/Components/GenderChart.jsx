import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie, VictoryChart, VictoryTheme } from "victory";
import axios from "axios"

const createTally = data => {
  let genderTally = {Male: 0, Female:0, Other:0};
  data.forEach(function(set) {
    if (genderTally[set.sex]) {
      genderTally[set.sex]++;
    } else {
      genderTally[set.sex] = 1;
    }
  })
  return genderTally;
};


class GenderChart extends Component {
 state = {
   data: []
 }
  
componentDidMount() {
this.getEventData()
}

componentDidUpdate(prevProps, prevState) {
 if (prevState.data.length !== this.state.data.length) {
   this.getEventData()
 }
}



getEventData() {
  return axios.get("https://fomo-api.herokuapp.com/event_history").then(({data}) => {
  this.setState({data : data.event_history})
  });
}  
  render() {
    const {data} = this.state
    const test = createTally(data)
    return (
      <div className="age-chart">
        <VictoryChart
       theme={VictoryTheme.material}
      domainPadding={{ x: 15 }}
>
        <h3>A</h3>
        <VictoryBar
          style={{
            data: { fill: "#c43a31" }
          }}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: props => {
                        const fill = props.style && props.style.fill;
                        return fill === "black"
                          ? null
                          : { style: { fill: "black" } };
                      }
                    }
                  ];
                }
              }
            }
          ]}
          data={[
            { x: "Female", y: test["Female"]},
            { x: "Male", y: test["Male"]},
            { x: "Other", y:test["Other"]}
          ]}
        />
        </VictoryChart>
      </div>
    );}}

export default GenderChart;