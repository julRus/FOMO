import React from "react";

export default function LogIn() {
  return (
    <div className="container">
      <div className="signUpContainer">
        <h2 className="signUpTitle">New to FOMO business? Register now</h2>

        <form>
          <label>
            <input type="text" placeholder="Username" />
          </label>
          <label>
            <input type="text" placeholder="Password" />
          </label>
          <label>
            <input type="text" placeholder="Business Name" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Business Email" />
          </label>
          <br />
          Address <br />
          <label>
            <input type="number" placeholder="Number" />
          </label>
          <label>
            <input type="text" placeholder="Bulding Name" />
          </label>
          <label>
            <input type="text" placeholder="Street" />
          </label>
          <label>
            <input type="text" placeholder="Town/City" />
          </label>
          <label>
            <input type="text" placeholder="PostCode" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Logo" />
          </label>
          <br />
          <label>
            <textarea rows="3" placeholder="Description" />
          </label>
          <br />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}
