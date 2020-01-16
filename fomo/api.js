import axios from "axios";

export const fetchUsers = () => {
  return axios.get("https://fomo-api.herokuapp.com/users").then(({ data }) => {
    return data.users;
  });
};

export const fetchSkiddleEvents = (
  location = { latitude: 53.4804, longitude: -2.2446 }
) => {
  console.log("location", location);
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events/search/?api_key=2c674154bb766482be163c00831f88c8&latitude=${location.latitude}&longitude=${location.longitude}&radius=1&description=1&order=date&limit=100`
    )
    .then(({ data }) => {
      return data;
    })
    .catch(console.log("fetchSkiddleEvents"));
};

export const fetchPostcodeInformation = (postcode = "M30 7PG") => {
  return axios
    .get(`https://api.postcodes.io/postcodes/${postcode}`)
    .then(({ data }) => {
      console.log("Correct lat: ", data.result.latitude);
      console.log("Correct long: ", data.result.longitude);
      return {
        latitude: data.result.latitude,
        longitude: data.result.longitude
      };
    });
};

export const fetchEventByEventId = id => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events/${id}/?api_key=2c674154bb766482be163c00831f88c8&latitude`
    )
    .then(({ data }) => {
      return data;
    })
    .catch(console.log("fetchSkiddleEventById"));
};

export const fetchLoginToken = (username, password) => {
  return axios
    .post("https://fomo-api.herokuapp.com/login", { username, password })
    .then(({ data }) => {
      return data;
    })
    .catch(console.log("fetchLoginToken"));
};

export const postUser = () => {
  return axios
    .post("https://fomo-api.herokuapp.com/register", {
      username: enteredUsername,
      password: enteredPassword,
      email: enteredEmail,
      location: enteredLocation,
      age: pickedAge,
      gender: pickedGender,
      option_1: keywords[0],
      option_2: keywords[1],
      option_3: keywords[2],
      option_4: keywords[3],
      family: famFriendly
    })
    .then(({ data }) => {
      return data;
    })
    .catch(console.log("postUser"));
};

export const fetchUserByUsername = (username = "jessjelly") => {
  return axios
    .get(`https://fomo-api.herokuapp.com/users/${username}`)
    .then(({ data }) => {
      return data;
    });
  // .catch(console.log("fetchUserDetails"));
};

export const postEventHistory = (
  age,
  gender,
  eventCode,
  eventLocation,
  eventOpeningTime
) => {
  return axios
    .post("https://fomo-api.herokuapp.com/event_history", {
      age: age,
      sex: gender,
      event_type: eventCode,
      location: eventLocation,
      time: eventOpeningTime
    })
    .then(({ data }) => {
      console.log("postEventHistory", data);
    });
};

export const patchUserByUsername = (user, body) => {
  axios
    .patch(`https://fomo-api.herokuapp.com/users/${user}/username`, {
      username: body
    })
    .then(({ data }) => {
      console.log("patchUserByUsername", data);
    });
};

export const fetchBusinessEvents = () => {
  return axios
    .get("https://fomo-api.herokuapp.com/events")
    .then(({ data: data }) => {
      console.log(data);
      return data;
    });
};

export const fetchBusinessEventByEventId = id => {
  return axios
    .get(`https://fomo-api.herokuapp.com/events/event/${id}`)
    .then(({ data }) => {
      return data;
    });
};
