import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home";
import EventForm from "./Components/EventForm";
import BusinessPage from "./Components/BusinessPage";
import ErrorDisplay from "./Components/ErrorDisplay";
import Home from "./Components/Home"
import Dashboard from "./Components/Dashboard";


class App extends React.Component {
  state = {
    currentUser: "",
    userId: null,
    businessName: "",
    accessToken: null
  };

  componentDidMount() {
    this.setState({
      currentUser: "",
      userId: null,
      businessName: null || localStorage.busName,
      accessToken: null || localStorage.token,
      err: { msg: "please log in to view more" }
    });
  }
  getUser = (username, businessName, id, accessToken) => {
    this.setState({
      currentUser: username,
      userId: id,
      businessName,
      accessToken
    });
    localStorage.setItem('token', accessToken);
    localStorage.setItem('busName', businessName)
  };

  logOut = () => {
    this.setState({accessToken: null})
    localStorage.removeItem('token');
    localStorage.removeItem('busName')
  }

  render() {
    const { businessName, accessToken, err } = this.state;
    return (
      <div className="App">
        <NavBar access={accessToken} logOut={this.logOut}/>
        <Router>
          <Home path="/" getUser={this.getUser} />
          <Events path={accessToken ? "/events" : "/"} />
          <EventForm path={accessToken ? "/events/newevent" : "/"} />
          <BusinessPage
            business_name={businessName}
            path={accessToken ? "business_account" : "/"}
          />
          <Dashboard path="/dashboard" />

          {/* <Feedback path="/Data" /> */}
=======
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
