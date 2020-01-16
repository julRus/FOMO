import React from "react";
import { Router, navigate } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home"
import BusinessPage from "./Components/BusinessPage";
import ErrorDisplay from "./Components/ErrorDisplay";
import Dashboard from "./Components/Dashboard";
import EventForm from "./Components/EventForm"

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
    localStorage.setItem("token", accessToken);
    localStorage.setItem("busName", businessName);
  };

  logOut = () => {
    this.setState({ accessToken: null });
    localStorage.removeItem("token");
    localStorage.removeItem("busName");
    navigate("/")
  };

  render() {
    const { businessName, accessToken, err , userId} = this.state;
    return (
      <div className="App">
        <NavBar access={accessToken} logOut={this.logOut} />
        <Router>
          <Home path="/" getUser={this.getUser} />
          <Events
            path={accessToken ? "/events" : "/"}
            userId={userId}
            business_name={businessName}
          />
          <EventForm
            path={accessToken ? "/events/newevent" : "/"}
            userId={userId}
          />
          <BusinessPage
            business_name={businessName}
            path={accessToken ? "business_account" : "/"}
          />
          <Dashboard path="/dashboard" />
          {/* <User path="/User" />  */}
        </Router>
      </div>
    );
  }
}

export default App;
