import React from "react";
import * as api from "./Api";
import { navigate } from "@reach/router";
import ErrorDisplay from "./ErrorDisplay";

export default class LogIn extends React.Component{

  state = {
    username: "",
    password : "",
    err: null
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({[name] : value})
  }

  handleSubmit = e => {

    e.preventDefault()

    const {username, password} = this.state

    api
    .logIn({username, password})
    .then(response => {
      console.dir(response.details.username)
      this.setState({username: "", password: "", err: null})
    navigate("/events")})
    .catch(response => this.setState({err: {msg :"Your username and password don't match"}}))
  }

  render() {
    const {password, username, err} = this.state;
    return (
    <div className="container">
      <div className="logInContainer">
          <form className="regForm" onSubmit={this.handleSubmit}>
          <h2 className="regFormTitle">FOMO</h2>
            <input
              type="text"
              placeholder="Username"
              className="regInput"
              required
              onChange={this.handleChange}
              name="username"
              value={username}
            />
          <br />
            <input type="password" placeholder="Password" className="regInput" onChange={this.handleChange} name="password"
              value={password} required />
          <br />
          <p>{err && <ErrorDisplay error={err} />}</p>
          <br/>
          <p className="regForget">Forgot your password?</p>
          <button type="submit" className="regButton">Sign In</button>
          
        </form>
      </div>
    </div>
  );
  }
  
}
