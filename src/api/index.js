import axios from "axios";

export const URL_SERVER = "http://localhost:8000";
export const URL_API = `${URL_SERVER}/api`;
export const URL_IMAGE = `${URL_SERVER}/storage/uploads/images/`;

class Api {
  GET = async (url, config = {}) => {
    return axios
      .get(`${URL_API}${url}`, config)
      .then(({ data }) => data)
      .catch((e) => e);
  };

  POST = async (url, data = {}, config = {}) => {
    return axios
      .post(`${URL_API}${url}`, data, config)
      .then(({ data }) => data)
      .catch((e) => e);
  };

  PUT = async (url, data = {}, config = {}) => {
    return axios
      .put(`${URL_API}${url}`, data, config)
      .then(({ data }) => data)
      .catch((e) => e);
  };

  DEL = async (url, config = {}) => {
    return axios
      .delete(`${URL_API}${url}`, config)
      .then(({ data }) => data)
      .catch((e) => e);
  };
}

export const API = new Api();