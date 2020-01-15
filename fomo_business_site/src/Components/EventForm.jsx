import React from "react";
import axios from "axios";


class EventForm extends React.Component {
  state = {
    event_name: "",
    name: "",
    address: "",
    cityname: "",
    postcode: "",
    description: "",
    event_type: "",
    date: "",
    doorsopen: "",
    doorsclose: "",
    minage: "",
    entryprice: "",
    url: ""
  };

  handleChange = event => {
    const { name } = event.target;
    if (name === "postcode") {
      let postcode = event.target.value.replace(/\s/g, "");
      this.setState({postcode: postcode})
    } else {
      this.setState({ [name]: event.target.value });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { postEvent } = this.props;
    const {
      event_name,
      description,
      event_type,
      date,
      doorsopen,
      doorsclose,
      minage,
      entryprice,
      cityname,
      name,
      postcode,
      address,
      url
    } = this.state;
   postEvent(
     event_name,
     description,
     event_type,
     date,
     doorsopen,
     doorsclose,
     minage,
     entryprice,
     cityname,
     name,
     postcode,
     address,
     url
   )
   this.setState({
            event_name: "",
            name: "",
            address: "",
            cityname: "",
            postcode: "",
            description: "",
            event_type: "",
            date: "",
            doorsopen: "",
            doorsclose: "",
            minage: "",
            entryprice: "",
            url: ""
  })
} 


  render() {
    return (
      <div className="events-form">
        <form onSubmit={this.handleSubmit}>
          <label className="regFormTitle">
            Event Name:
            <input
              type="text"
              placeholder="Name"
              name="event_name"
              value={this.state.event_name}
              onChange={this.handleChange}
              required
              className="regInput"
            />
          </label>
          Address: <br />
          <label>
            <input
              type="text"
              placeholder="Location Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="regInput"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              required
              className="regInput"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="City"
              name="cityname"
              value={this.state.cityname}
              onChange={this.handleChange}
              className="regInput"
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Postcode"
              name="postcode"
              value={this.state.postcode}
              onChange={this.handleChange}
              required
              className="regInput"
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
              required
              className="regInput"
            >
              <option value="">Please select an option</option>
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
              <option value="TECH">Technology</option>
              <option value="HARRY POTTER">Harry Potter</option>
              <option value="FILM">Film</option>
              <option value="OUTDOOR">Outdoor</option>
              <option value="COMEDY">Comedy</option>
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
              required
              className="regInput"
            />
          </label>
          <label>
            Add an image url:
            <input
              type="text"
              id="image"
              placeholder="url"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
              className="regInput"
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              name="date"
              min="2020-01-01"
              max="2020-12-31"
              value={this.state.date}
              onChange={this.handleChange}
              required
              className="regInput"
            />
          </label>
          <label>
            Opening Time:
            <input
              type="time"
              name="doorsopen"
              value={this.state.doorsopen}
              onChange={this.handleChange}
              required
              className="regInput"
            />
          </label>
          <label>
            Finishing Time:
            <input
              type="time"
              name="doorsclose"
              value={this.state.doorsclose}
              onChange={this.handleChange}
              required
              className="regInput"
            />
          </label>
          <label>
            Event Price:
            <div className="cost-regInput">
              <input
                type="number"
                min="0"
                max="100"
                name="entryprice"
                value={this.state.entryprice}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label>
            Min. Age:
            <div className="cost-regInput">
              <input
                type="number"
                min="0"
                max="100"
                name="minage"
                value={this.state.minage}
                onChange={this.handleChange}
              />
            </div>
          </label>
          <button className="event-regButton">Add</button>
        </form>
      </div>
    );
  }
}

export default EventForm;
