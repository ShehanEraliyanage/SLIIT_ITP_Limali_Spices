import axios from 'axios';

// Config
import { baseURL } from '../config';

export const getBranchConfirmPendingOrders = async () => {
    const { data } = await axios.get(baseURL + '/order/getBranchConfirmPendingOrders/');
    return data;
}

export const getBranchConfirmProcessingOrders = async () => {
    const { data } = await axios.get(baseURL + '/order/getBranchConfirmProcessingOrders/');
    return data;
}

export const getBranchConfirmDeliveredOrders = async () => {
    const { data } = await axios.get(baseURL + '/order/getBranchConfirmDeliveredOrders/');
    return data;
}

export const addVehicleToOrder = async (details) => {
    const { data } = await axios.post(baseURL + '/order/addVehicleToOrder/', details);
    return data;
}

export const confirmDelivered = async (details) => {
    const { data } = await axios.post(baseURL + '/order/confirmDelivered/', details);
    return data;
}

export const vehicleDeliveryReport = async (details) => {
    const { data } = await axios.post(baseURL + '/order/vehicleDeliveryReport/', details);
    return data;
}