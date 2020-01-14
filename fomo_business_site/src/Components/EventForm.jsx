import React, { Component } from 'react';

const event_types = ["FEST",
"LIVE", 
"CLUB",
"DATE",
"THEATRE",
"COMEDY",
"EXHIB",
"KIDS",
"BARPUB",
"LGB",
"SPORT",
"ARTS"]

// const {
//   username,
//   password,
//   businessName,
//   businessEmail,
//   addressOne,
//   addressTwo,
//   townCity,
//   postCode,
//   logo,
//   description
// } = this.state;
// const business = {
//   address: addressOne + " " + addressTwo + " " + townCity + " " + postCode
// };

class EventForm extends Component {
  state = {
    name: "",
    location: "",
    description: "",
    event_type: "",
    date: "",
    time: "",
    min_age: "",
    cost: ""
  };

  handleChange = event => {
    const { name } = event.target;
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {  name,
    location,
    description,
    event_type,
    date,
    time,
    min_age,
    cost } = this.state;
    this.setState({
      name: "",
      location: "",
      description: "",
      event_type: "",
      date: "",
      time: "",
      min_age: "",
      cost: "",
      city: "",
      number: "",
      street: "",
      postcode: "",
      buidingname: ""

    });
    // api
    //   .postArticle(title, body, this.props.user, topic)
    //   .then(article => {})
    //   .catch(({ response }) => {
    //     this.setState({
    //       error: {
    //         msg: response.data.msg,
    //         status: response.status
    //       }
    //     });
    //   });
  };

  render() {
    return (
      <div className="form">
        <form>
          <label>
            Name:
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          Address <br />
          <label>
            <input
              type="number"
              placeholder="Number"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Building Name"
              name="buildingname"
              value={this.state.buildingname}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Street"
              name="street"
              value={this.state.street}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="PostCode"
              name="postcode"
              value={this.state.postcode}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Event Type:
            <select
              placeholder="Event Type"
              name="event_type"
              value={this.state.event_type}
              onChange={this.handleChange}
            >
              <option value="FEST">Festivals</option>
              <option value="LIVE">Live Music</option>
              <option value="CLUB">Clubbing/Dance music</option>
              <option value="DATE">Dating event</option>
              <option value="THEATRE">Theatre/Dance</option>
              <option value="EXHIB">Exhibitions and Attractions</option>
              <option value="KIDS">Kids/Family Event</option>
              <option value="BARPUB">Bar/Pub event</option>
              <option value="LGB">Gay/Lesbian event</option>
              <option value="SPORT">Sporting event</option>
              <option value="ARTS">The Arts</option>
            </select>
          </label>
          <br />
          <label>
            Description:
            <textarea
              rows="6"
              columns="12"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              placeholder="Date"
              value={this.state.date}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              placeholder="Time"
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Cost:
            <input
              type="number"
              min="0"
              max="100"
              name="cost"
              value={this.state.cost}
              onChange={this.handleChange}
            />
          </label>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default EventForm;