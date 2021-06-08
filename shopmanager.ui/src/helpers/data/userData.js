import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/Users`;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${userUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllUsersByCompany = (companyId) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/company_user/${companyId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSearchedUsers = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${userUrl}`).then((response) => {
    const searched = response.data.filter((user) => user.username.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

const addUser = (data) => new Promise((resolve, reject) => {
  axios.post(`${userUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const deleteUser = (Id) => axios.delete(`${userUrl}/${Id}`);

export default {
  getAllUsers,
  getSearchedUsers,
  addUser,
  getAllUsersByCompany,
  deleteUser
};
