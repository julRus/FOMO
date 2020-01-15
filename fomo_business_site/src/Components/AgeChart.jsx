import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie } from "victory";
import axios from "axios"

const createTally = data => {
  let ageTally = {};
  data.forEach(function(set) {
    if (ageTally[set.age]) {
      ageTally[set.age]++;
    } else {
      ageTally[set.age] = 1;
    }
  })
  return ageTally;
};


class Charts extends Component {
 state = {
   data: []
 }
  
componentDidMount() {
this.getEventData()
}

componentDidUpdate(prevProps, prevState) {
 if (prevState.data.length !== this.state.data.length) {
   console.log('hello')
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
    console.log(test)
    return (
      <div className="age-chart">
        <svg viewBox="-50 -40 500 400">
          <VictorySharedEvents
            events={[
              {
                childName: ["pie", "bar"],
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        childName: ["pie", "bar"],
                        mutation: props => {
                          return {
                            style: Object.assign({}, props.style, {
                              fill: "tomato"
                            })
                          };
                        }
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        childName: ["pie", "bar"],
                        mutation: () => {
                          return null;
                        }
                      }
                    ];
                  }
                }
              }
            ]}
          >
            <g transform={"translate(170, 50)"}>
              <VictoryBar
                name="bar"
                width={300}
                standalone={false}
                style={{
                  data: { width: 20 },
                  labels: { fontSize: 15 }
                }}
                data={[
                  { x: "0-15", y: Number ? test["0-15"] : 0 },
                  { x: "16-25", y: Number ? test["16-25"] : 0 },
                  { x: "26-39", y: Number ? test["26-39"] : 0 },
                  { x: "40-65", y: Number ? test["40-65"] : 0 },
                  { x: "66+", y: Number ? test["66+"] : 0 }
                ]}
                labels={["0-15", "16-25", "26-39", "40-65", "66+"]}
                labelComponent={<VictoryLabel y={280} />}
              />
            </g>
            <g transform={"translate(-30, -105)"}>
              <VictoryPie
                name="pie"
                width={250}
                standalone={false}
                style={{ labels: { fontSize: 15, padding: 8 } }}
                data={[
                  { x: "0-15", y: Number ? test["0-15"] : 0 },
                  { x: "16-25", y: Number ? test["16-25"] : 0 },
                  { x: "26-39", y: Number ? test["26-39"] : 0 },
                  { x: "40-65", y: Number ? test["40-65"] : 0 },
                  { x: "66+", y: Number ? test["66+"] : 0 }
                ]}
              />
            </g>
          </VictorySharedEvents>
        </svg>
      </div>
    );
  }
}

export default Charts;