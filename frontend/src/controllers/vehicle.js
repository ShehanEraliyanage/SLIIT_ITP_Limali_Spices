import axios from 'axios';

// Config
import { baseURL } from '../config';

export const addVehicle = async (details) => {
    const { data } = await axios.post(baseURL + '/vehicle/add/', details);
    return data;
}

export const getAllVehicles = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllVehicles/');
    return data;
}

export const getAlldelivering = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAlldelivering/');
    return data;
}

export const getAllavalable = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllavalable/');
    return data;
}

export const getAllinRepair = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllinRepair/');
    return data;
}

export const deleteVehicles = async (id) => {
    const { data } = await axios.post(baseURL + '/vehicle/delete/', {id: id});
    return data;
}

export const editVehicle = async (details) => {
    const { data } = await axios.post(baseURL + '/vehicle/edit/', details);
    return data;
}

export const getSelectedVehicle = async (id) => {
    const { data } = await axios.post(baseURL + '/vehicle/getSelectedVehicle/', {id: id});
    return data;
}

export const getAllVehiclesCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllVehiclesCount/');
    return data;
}

export const getAlldeliveringCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAlldeliveringCount/');
    return data;
}

export const getAllavalableCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllavalableCount/');
    return data;
}

export const getAllinRepairCount = async () => {
    const { data } = await axios.get(baseURL + '/vehicle/getAllinRepairCount/');
    return data;
}
