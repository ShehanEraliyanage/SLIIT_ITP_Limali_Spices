import axios from 'axios';

// Config
// import { baseURL } from '../config';

const baseURL = 'http://localhost:8090';

export const addProduct = async (details) => {
    const { data } = await axios.post(baseURL + '/product/add/', details);
    return data;
}

export const getAllProducts = async () => {
    const { data } = await axios.get(baseURL + '/product/getAllProducts');
    return data;
}

export const getSelectedProduct = async (id) => {
    console.log(id);
    const { data } = await axios.get(baseURL + '/product/get/' + id);
    console.log(data);
    return data;
}

export const deleteSelectedProduct = async (id) => {
    console.log(id);
    const { data } = await axios.delete(baseURL + '/product/delete/' + id);
    return data;
}

export const editSelectedProduct = async (id, product) => {
    const { data } = await axios.put(baseURL + '/product/update/' + id , product);
    return data;
}

export const getAllProductsNames = async () => {
    const { data } = await axios.get(baseURL + '/product/getAllProducts');
    let options = [];
    data.map((product) => {
        let newOption = {
            value: product.id, 
            label: product.name
        }
        options.push(newOption)
    })
    // console.log(options)
    return options;
}

export const getMonthlyProduction = async (id) => {
    const  data  = await axios.get(baseURL + '/product/getMonthlyProduction/' + id);
    return data.data;
}

export const getNumberOfProducts = async () => {
    const { data } = await axios.get(baseURL + '/product/getAllProducts');
    // console.log(data.length)
    return data.length;
}

export const getToalProductionOfMonth = async (month) => {
    const { data } = await axios.get(baseURL + '/product/getMonthlyProduction/' + month);
    let totalProduction = 0;
    data.map((product) => {
        totalProduction += product.production;
    })
    return totalProduction;
}

export const getToalSalesOfMonth = async (month) => {
    const { data } = await axios.get(baseURL + '/product/getMonthlyProduction/' + month);
    let totalSales = 0;
    data.map((product) => {
        totalSales += product.sold;
    })
    return totalSales;
}

