import axios from "axios";


const baseUrl = "https://fomo-api.herokuapp.com/businesses/"

export const logIn = params => {
 return axios.post(`${baseUrl}login`, params).then(({ data }) => data);
}

export const register = params => {
 return axios.post(`${baseUrl}register`, params).then(({ data }) => data);
}


export const changeUsername = (businessName, params) => {
 return axios
   .patch(`${baseUrl}${businessName}/username`, params )
   .then(({ data }) => data);
}

export const changePassword = (businessName, params) => {
 return axios
   .patch(`${baseUrl}${businessName}/password`,  params )
   .then(({ data }) => data);
};


export const changeBusinessDetails = (businessName, params) => {
 return axios
   .patch(`${baseUrl}${businessName}/details`, params )
   .then(({ data }) => data);
};