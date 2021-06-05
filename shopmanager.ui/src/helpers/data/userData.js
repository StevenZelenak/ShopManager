import axios from 'axios';
import { baseUrl } from '../config.json';

const userUrl = `${baseUrl}/Users`;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${userUrl}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSearchedUsers = (searchTerm) => new Promise((resolve, reject) => axios
  .get(`${userUrl}`).then((response) => {
    const searched = response.data.filter((user) => user.username.toLowerCase().includes(searchTerm));
    resolve(searched);
  }).catch((error) => reject(error)));

export default { getAllUsers, getSearchedUsers };
