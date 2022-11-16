import axios from "axios";


const getSelectedCustomer = async (id) => {
    console.log(id);
    const url = "http://localhost:8090/realCustomer/get/" + id;
    const {data}  = await axios.get(url);
    return data.customer;
}

export default getSelectedCustomer;