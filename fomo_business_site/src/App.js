import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home";
import EventForm from "./Components/EventForm";
import BusinessPage from "./Components/BusinessPage";
import ErrorDisplay from "./Components/ErrorDisplay";

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
      businessName: "",
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
  };

  logOut = () => {
    this.setState({accessToken: null})
    localStorage.removeItem('token');
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

          {/* <Feedback path="/Data" /> */}
          {/* <User path="/User" />  */}
        </Router>
      </div>
    );
  }
}

export default App;
