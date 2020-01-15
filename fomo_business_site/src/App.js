import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home"
import Dashboard from "./Components/Dashboard";

class App extends React.Component {
  state = {
    currentUser:"",
    userId: null,
    business_name: ""
  }
 
  componentDidMount () {
    this.setState({ currentUser: "", userId: null });
  }
  getUser = (username, id, business_name) => {
    this.setState({currentUser: username, userId: id, business_name: business_name})
  }

  
  render () {
    const {userId, business_name} = this.state
    return (
      <div className="App">
        <NavBar />
        <Router>
          <Home path="/" getUser={this.getUser} />
          <Events
            path="/events"
            userId={userId}
            business_name={business_name}
          />
          {/* <EventForm path="/events/events" userId={userId} /> */}
          <Dashboard path="/dashboard" />
          {/* <User path="/User" />  */}
        </Router>
      </div>
    );
  }
  
}

export default App;
