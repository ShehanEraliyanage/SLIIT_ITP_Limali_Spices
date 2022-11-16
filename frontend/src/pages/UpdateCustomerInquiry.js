import Layout from "../components/LayoutCustomerOrder";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import Select from 'react-select'
import getSelectedInquiry from '../controllers/inquiry'; 
import EditEmployeeForm from '../components/Employee/EditEmployeeForm';


const UpdateCustomerInquiry = (props)=>{

    const {id} = useParams();

    const[customerinquiry, setCustomerInquiry] = useState({});

    useEffect(() => {

        getSelectedInquiry(id).then((data) => {
            const customerinquiry = data;
            setCustomerInquiry(customerinquiry);
        })
       // console.log(customerinquiry);
    }, [id])

    
    const [title, settitle] = useState(customerinquiry.title);
    const [description, setdescription] = useState(customerinquiry.description);
   

    const titleSetHandler = (data) => {
        settitle(data);
        // console.log(data);
        // console.log(name);
    }
    const descriptionSetHandler = (data) => {
        setdescription(data);
    }

  

    function sendData(){
        const newcustomerinquiry = {
           title,
           description

        }

      
        axios.put(`http://localhost:8090/CustomerInquiry/update/${id}`,newcustomerinquiry).then(()=>{
            swal({
                title: "Success!",
                text: "Inquiry Updated Successfully",
                icon: 'success',
                timer: 2000,
                button: false,
              });
              setTimeout(() => {
                window.location.reload(true);
            }, 2050)
        }).catch((e)=>{
            alert(e);
        })
    }
    return(
        <Layout>
        
            <div className="Add Employee">


            <center><h2>Update Inquiry</h2></center>
            <form className="employee-form" >


            <EditEmployeeForm value={customerinquiry.title} title="title" onSave={titleSetHandler}/>

            <EditEmployeeForm value={customerinquiry.description} title="Email" onSave={descriptionSetHandler}/>

            
            
            <button className="employee-btn" type="button" onClick={sendData}>Update</button> 
             
             </form>
        </div>
            
        </Layout>
    )
}

export default UpdateCustomerInquiry;