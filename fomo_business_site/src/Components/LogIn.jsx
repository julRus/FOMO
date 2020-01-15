import React from "react";
import * as api from "./Api";
import { navigate } from "@reach/router";
import ErrorDisplay from "./ErrorDisplay";

export default class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    err: null,
    access_token: ""
  };

  componentDidUpdate() {
    // this.handleSubmit(e)
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { getUser } = this.props;
    e.preventDefault();

    const { username, password } = this.state;

    api
      .logIn({ username, password })
      .then(response => {
        getUser(
          response.details.username,
          response.details.business_id,
          response.details.business_name
        );
        this.setState({
          username: response.details.username,
          password: "",
          err: null,
          access_token: response.access_token,
          business_name: response.details.business_name
        });
        navigate("/events");
      })
      .catch(response =>
        this.setState({
          err: { msg: "Your username and password don't match" }
        })
      );
  };

  render() {
    const { password, username, err, access_token } = this.state;
    let className = "logInContainer";
    if (access_token.length > 0) {
      className = "disable-login";
    }
    return (
      <div className="container">
        <div className={className}>
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
            <input
              type="password"
              placeholder="Password"
              className="regInput"
              onChange={this.handleChange}
              name="password"
              value={password}
              required
            />
            <br />
            {err && <ErrorDisplay error={err} />}
            <br />
            <p className="regForget">Forgot your password?</p>
            <button type="submit" className="regButton">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
