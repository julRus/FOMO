import React from "react";

export default function LogIn() {
  return (
    <div className="container">
      <div className="logInContainer">
        <form className="regForm">
          <h2 className="regFormTitle">FOMO</h2>
          <label>
            <input
              type="text"
              placeholder="Username"
              className="regInput"
            />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Password" className="regInput" />
          </label>
          <br />
          <p className="regForget">Forgot your password?</p>
          <button className="regButton">Sign In</button>
        </form>
      </div>
    </div>
  );
}
