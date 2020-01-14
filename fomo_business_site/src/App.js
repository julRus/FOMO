import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home"
import EventForm from "./Components/EventForm";

class App extends React.Component {
  state = {
    currentUser:"",
    userId: null
  }
 
  componentDidMount () {
    this.setState({ currentUser: "", userId: null });
  }
  getUser = (username, id) => {
    this.setState({currentUser: username, userId: id})
  }

  
  render () {
    return (
    <div className="App">
      
      <NavBar />
      <Router>
        <Home path="/" getUser={this.getUser} />
        <Events path="/events"/>
        <EventForm path="/events/newevent"/>
        {/* <Feedback path="/Data" /> */}
        {/* <User path="/User" />  */}
      </Router>
    </div>
  );
  }
  
}

export default App;
