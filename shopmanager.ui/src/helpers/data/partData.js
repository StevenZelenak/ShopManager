import axios from 'axios';
import { baseUrl } from '../config.json';

const partUrl = `${baseUrl}/Parts`;

const getAllPartsByJob = (jobId) => new Promise((resolve, reject) => {
  axios.get(`${partUrl}/company_parts/${jobId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getAllPartsByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${partUrl}/company_parts_user/${userId}`).then((response) => {
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
    jobId: objData.jobId,
    partName: objData.partName,
    materialType: objData.materialType,
    materialFinish: objData.materialFinish,
    sizeLength: objData.sizeLength,
    sizeWidth: objData.sizeWidth,
    sizeHeight: objData.sizeHeight,
    price: objData.price,
    userId: objData.userId,
    isComplete: objData.isComplete,
    dateStart: objData.dateStart,
    dateEnd: objData.dateEnd
  };
  axios.put(`${partUrl}/${data.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const updatePartWUser = (data) => new Promise((resolve, reject) => {
  console.warn('data', data);
  const objData = data;
  const newObj = {
    id: objData.id,
    jobId: objData.jobId,
    partName: objData.partName,
    materialType: objData.materialType,
    materialFinish: objData.materialFinish,
    sizeLength: objData.sizeLength,
    sizeWidth: objData.sizeWidth,
    sizeHeight: objData.sizeHeight,
    price: objData.price,
    isComplete: objData.isComplete,
    dateStart: objData.dateStart,
    dateEnd: objData.dateEnd
  };
  axios.put(`${partUrl}/${data.id}/update_wu`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const deletePart = (Id) => axios.delete(`${partUrl}/${Id}`);

export default {
  addPart,
  getAllPartsByJob,
  getAllPartsByUser,
  deletePart,
  getSinglePart,
  updatePart,
  updatePartWUser
};
