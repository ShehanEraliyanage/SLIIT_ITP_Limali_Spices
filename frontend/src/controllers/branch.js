import axios from 'axios';

// Config
import { baseURL } from '../config';

export const add = async (details) => {
    const { data } = await axios.post(baseURL + '/branch/add', details);
    return data;
}

export const getAllBranch = async () => {
    const { data } = await axios.get(baseURL + '/branch/getAllBranch');
    return data;
}
export const deleteBranch = async (id) => {
    const { data } = await axios.post(baseURL + '/branch/delete/', {id: id});
    return data;
}
export const editBranch= async (details) => {
    const { data } = await axios.post(baseURL + '/branch/edit/', details);
    return data;
}
export const getBranchById = async (id) => {
    const { data } = await axios.post(baseURL + '/branch/getBranchById/', {id: id});
    return data;
}
export const getPendingEmployersOfBranch = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/getPendingEmployers',details);
    return data;
}
export const getEmployersOfBranch = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/getEnrolledEmployers',details);
    return data;
}
export const getRejectedEmployersOfBranch = async (details) => {
    const { data } = await axios.post(baseURL + '/employee/getRejectedEmployers',details);
    return data;
}
export const acceptEmp = async (id) => {
    const { data } = await axios.post(baseURL + '/employee/accept/'+id);
    return data;
}
export const rejectEmp = async (id) => {
    const { data } = await axios.post(baseURL + '/employee/reject/'+id);
    return data;
}
export const pendingEmp = async (id) => {
    const { data } = await axios.post(baseURL + '/employee/pending/'+id);
    return data;
}
export const login = async (dataSet) => {
    const { data } = await axios.post(baseURL + '/employee/login-with-type',dataSet);
    return data;
}
export const auth = async () => {
    const { data } = await axios.get(baseURL + '/employee/authchecker');
    return data;
}
export const generateReport = async () => {
    const { data } = await axios.get(baseURL + '/branch/generateReport');
    return data;
}
export const getRawMaterials = async () => {
    const { data } = await axios.get(baseURL + '/branch/getRawMaterial');
    return data;
}
export const confirmOrder = async (id) => {
    const { data } = await axios.post(baseURL + '/order/accept/'+id);
    return data;
}
export const deleteRawMaterial = async (id) => {
    const { data } = await axios.post(baseURL +'/raw-material/delete/', {id: id});
    return data;
}

