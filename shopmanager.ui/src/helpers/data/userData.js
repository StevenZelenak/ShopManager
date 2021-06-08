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

const getSingleUser = (Id) => new Promise((resolve, reject) => {
  axios.get(`${userUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updateUser = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    id: objData.id,
    companyId: objData.companyId,
    firstName: objData.firstName,
    lastName: objData.lastName,
    username: objData.username,
    password: objData.password,
    companyEmail: objData.companyEmail,
    isManager: objData.isManager,
    isEmployee: objData.isEmployee
  };
  axios.put(`${userUrl}/${data.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const deleteUser = (Id) => axios.delete(`${userUrl}/${Id}`);

export default {
  getAllUsers,
  getSearchedUsers,
  addUser,
  getAllUsersByCompany,
  deleteUser,
  getSingleUser,
  updateUser
};
