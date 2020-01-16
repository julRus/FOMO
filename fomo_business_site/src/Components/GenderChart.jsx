import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie, VictoryChart, VictoryTheme } from "victory";
import axios from "axios"

const createTally = data => {
  let genderTally = {male: 0, female:0, other:0};
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
  
  render() {
    const {data} = this.props
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
            { x: "female", y: test["female"]},
            { x: "male", y: test["male"]},
            { x: "other", y:test["other"]}
          ]}
        />
        </VictoryChart>
      </div>
    );}}

export default GenderChart;