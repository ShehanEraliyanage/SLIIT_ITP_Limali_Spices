import axios from "axios";

// Config
import { baseURL } from '../config';
export const getAllDrivers = async () => {
    const { data } = await axios.get(baseURL + '/employee/getDrivers/');
    return data;
}



const getSelectedEmployee = async (id) => {
    console.log(id);
    const url = "http://localhost:8090/employee/get/" + id;
    const {data}  = await axios.get(url);
    return data.Employee;
}

export default getSelectedEmployee;