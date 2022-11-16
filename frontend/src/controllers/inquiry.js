import axios from "axios";


const getSelectedInquiry = async (id) => {
    console.log(id);
    const url = "http://localhost:8090/CustomerInquiry/get/" + id;
    const {data}  = await axios.get(url);
    console.log(data);
    return data.CustomerInquiry;
}

export default getSelectedInquiry;