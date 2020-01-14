import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import Events from "./Components/Events";
import Home from "./Components/Home"
import EventForm from "./Components/EventForm";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Home path="/" />
        <Events path="/events"/>
        <EventForm path="/events/newevent"/>
        {/* <Feedback path="/Data" /> */}
        {/* <User path="/User" />  */}
      </Router>
    </div>
  );
}

export default App;
