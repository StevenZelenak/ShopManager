import axios from 'axios';
import { baseUrl } from '../config.json';

const jobUrl = `${baseUrl}/Jobs`;

const getAllJobsByCompany = (companyId) => new Promise((resolve, reject) => {
  axios.get(`${jobUrl}/company_jobs/${companyId}`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const addJob = (data) => new Promise((resolve, reject) => {
  console.warn('data', data);
  axios.post(`${jobUrl}`, data)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const getSingleJob = (Id) => new Promise((resolve, reject) => {
  axios.get(`${jobUrl}/${Id}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const updateJob = (data) => new Promise((resolve, reject) => {
  const objData = data;
  const newObj = {
    id: objData.id,
    companyId: objData.companyId,
    jobName: objData.jobName,
    customer: objData.customer,
    dateRec: objData.dateRec,
    dateDue: objData.dateDue,
    dateFinished: objData.dateFinished,
    budget: objData.budget,
    isComplete: objData.isComplete
  };
  axios.put(`${jobUrl}/${data.id}/update`, newObj)
    .then(resolve)
    .catch((error) => reject(error));
});

const deleteJob = (Id) => axios.delete(`${jobUrl}/${Id}`);

export default {
  addJob,
  getAllJobsByCompany,
  deleteJob,
  getSingleJob,
  updateJob
};
