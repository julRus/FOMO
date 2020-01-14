import React from "react";

export default class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    businessName: "",
    businessEmail: "",
    addressOne: "",
    addressTwo: "",
    townCity: "",
    postCode: "",
    logo: "",
    description: ""
  };

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username,
      password,
      businessName,
      businessEmail,
      addressOne,
      addressTwo,
      townCity,
      postCode,
      logo,
      description} = this.state
    const business = {address: addressOne + " " + addressTwo + " " + townCity + " " + postCode}

    console.log(businessName, business.address, description)
  }

  render() {
    const { username,
      password,
      businessName,
      businessEmail,
      addressOne,
      addressTwo,
      townCity,
      postCode,
      logo,
      description} = this.state
    return (
      <div className="container">
        <div className="signUpContainer">
          <h2 className="signUpTitle">New to FOMO business? Register now</h2>

          <form className="regForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" name="username" value={username} onChange={this.handleChange} required/>
            <input type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}required />
            <input type="text" placeholder="Business Name" name="businessName" value={businessName} onChange={this.handleChange} required/>
            <br />
            <input type="email" placeholder="Business Email" name="businessEmail" value={businessEmail} onChange={this.handleChange} required/>
            <br />
            Address <br />
            <input type="text" placeholder="Address" name="addressOne" value={addressOne} onChange={this.handleChange} required/>
            <input type="text" placeholder="Address (line 2)" name="addressTwo" value={addressTwo} onChange={this.handleChange} />
            <input type="text" placeholder="Town/City" name="townCity" value={townCity} onChange={this.handleChange} required />
            <input type="text" placeholder="Post Code" name="postCode" value={postCode} onChange={this.handleChange} required/>
            <br />
            <input type="text" placeholder="Logo" name="logo" value={logo} onChange={this.handleChange} />
            <br />
            <textarea rows="4" placeholder="Description" name="description" value={description} onChange={this.handleChange} required/>
            <br />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
