import axios from "axios";


const baseUrl = "https://fomo-api.herokuapp.com/businesses/"

export const logIn = params => {
 return axios.post(`${baseUrl}login`, params).then(({ data }) => data);
}

export const register = params => {
 return axios.post(`${baseUrl}register`, params).then(({ data }) => data);
}