import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addRawMaterial = async (details) => {
    const { data } = await axios.post(baseURL + '/raw-material/add', details);
    return data;
}

export const getAllRawMaterial = async () => {
    const { data } = await axios.get(baseURL + '/raw-material/getAllRawMaterials');
    return data;
}
export const getRawMaterialById = async (details) => {
    const { data } = await axios.post(baseURL + '/raw-material/getById',details);
    return data;
}
export const deleteRawMaterial = async (id) => {
    const { data } = await axios.post(baseURL + '/raw-material/delete/', {id: id});
    return data;
}
export const editRawMaterial= async (details) => {
    const { data } = await axios.post(baseURL + '/raw-material/edit/', details);
    return data;
}
export const getSelectedRawMaterial = async (id) => {
    const { data } = await axios.post(baseURL + '/raw-material/getSelectedRawMaterials/', {id: id});
    return data;
}
export const getSuppliers = async (id) => {
    const { data } = await axios.get(baseURL + '/supplier/activesuppliers');
    return data;
}
export const addPurchaseQuotation = async (details) => {
    const { data } = await axios.post(baseURL + '/purchasequotation/add',details);
    return data;
}
export const getPurchaseQuotation = async () => {
    const { data } = await axios.get(baseURL + '/purchasequotation');
    return data;
}
export const getReportByItem = async (datas) => {
    const { data } = await axios.post(baseURL + '/raw-material/getReportByItem',datas);
    return data;
}
export const getStockReport = async () => {
    const { data } = await axios.get(baseURL + '/raw-material/getReport');
    return data;
}
export const getReportByStockAndSupplier = async (datas) => {
    const { data } = await axios.post(baseURL + '/raw-material/getReportByItemAndStock',datas);
    return data;
}
export const getItemNames = async () => {
    const { data } = await axios.get(baseURL + '/raw-material/getItemNames');
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
