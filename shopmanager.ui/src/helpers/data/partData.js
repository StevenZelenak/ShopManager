import axios from 'axios';
import { baseUrl } from '../config.json';

const partUrl = `${baseUrl}/Parts`;

const getAllPartsByJob = (jobId) => new Promise((resolve, reject) => {
  axios.get(`${partUrl}/company_parts/${jobId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addPart = (data) => new Promise((resolve, reject) => {
  console.warn('data', data);
  axios.post(`${partUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const getSinglePart = (Id) => new Promise((resolve, reject) => {
  axios.get(`${partUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updatePart = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    id: objData.id,
    companyId: objData.companyId,
    partName: objData.partName,
    customer: objData.customer,
    dateRec: objData.dateRec,
    dateDue: objData.dateDue,
    dateFinished: objData.dateFinished,
    budget: objData.budget,
    isComplete: objData.isComplete
  };
  axios.put(`${partUrl}/${data.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const updatePartUser = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    userId: objData.userId,
  };
  axios.put(`${partUrl}/${data.id}/update_part`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const deletePart = (Id) => axios.delete(`${partUrl}/${Id}`);

export default {
  addPart,
  getAllPartsByJob,
  deletePart,
  getSinglePart,
  updatePart,
  updatePartUser
};
