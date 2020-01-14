import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import NavBar from "./Components/NavBar";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Events from "./Components/Events";

function App() {
  return (
    <div className="App">
      <NavBar />
      <LogIn />
      <SignUp />
      {/* <Router> */}
      {/* <App path="/" />
        <Events path="/Events" />
        {/* <Feedback path="/Data" />
        <User path="/User" /> }
      </Router>{" "}
      */}
    </div>
  );
}

export default App;
