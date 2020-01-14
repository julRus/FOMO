import axios from "axios";

export const fetchSkiddleEvents = (
  location = `latitude=53.4808&longitude=-2.2446`
) => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events/search/?api_key=2c674154bb766482be163c00831f88c8&${location}&radius=5&description=1&order=date&limit=100`
    )
    .then(({ data }) => {
      return data;
    });
};

export const fetchEventByEventId = id => {
  return axios
    .get(
      `https://www.skiddle.com/api/v1/events/${id}/?api_key=2c674154bb766482be163c00831f88c8&latitude`
    )
    .then(({ data }) => {
      return data;
    });
};

export const fetchLoginToken = (username, password) => {
  return axios
    .post("https://fomo-api.herokuapp.com/login", { username, password })
    .then(({ data }) => {
      return data;
    });
};

export const fetchUserDetails = username => {
  return axios
    .get(`https://fomo-api.herokuapp.com/users/${username}`)
    .then(({ data }) => {
      return data;
    });
};

// export const fetchEventsByType = (
//   option1,
//   location = `latitude=53.4808&longitude=-2.2446`
// ) => {
//   console.log(option1, location);
//   const option_1 = option1.toUpperCase();
//   return axios
//     .get(
//       `https://www.skiddle.com/api/v1/events/search/?api_key=2c674154bb766482be163c00831f88c8&${location}&radius=5&description=1&eventcode=${option_1}&order=date&limit=100`
//     )
//     .then(({ data }) => {
//       return data;
//     });
// };
