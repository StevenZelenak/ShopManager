import axios from 'axios';
import { baseUrl } from '../config.json';

const companyUrl = `${baseUrl}/Companies`;

const addCompany = (data) => new Promise((resolve, reject) => {
  console.warn('data', data);
  axios.post(`${companyUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const getLastCompany = () => new Promise((resolve, reject) => {
  axios.get(`${companyUrl}/get_latest_company`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteCompany = (Id) => axios.delete(`${companyUrl}/${Id}`);

export default {
  addCompany,
  deleteCompany,
  getLastCompany
};
