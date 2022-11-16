import Layout from "../components/LayoutCustomerOrder";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { Redirect } from 'react-router'


import getSelectedCustomer from '../controllers/customer'; 
import EditCustomerForm from '../components/Customer/EditCustomerForm';

const UpdateCustomer = (props)=>{

    const {id} = useParams();

    const[customer, setCustomer] = useState({});
    const [fireRedirect, setFireRedirect] = useState(false);

    useEffect(() => {

        getSelectedCustomer(id).then((data) => {
            const customer = data;
            console.log(customer)
            setCustomer(customer);
        })
        //console.log(customer);
    }, [id])

    
    const [name, setname] = useState(customer.name);
    const [email, setemail] = useState(customer.email);
    const [nic, setnic] = useState(customer.nic)
    const [contact_number, setcontact_number] = useState(customer.contact_number)
    const [address, setaddress] = useState(customer.address)
    const [password, setpassword] = useState(customer.password)

    const nameSetHandler = (data) => {
        setname(data);
        console.log(data);
        console.log(name);
    }

    const emailSetHandler = (data) => {
        setemail(data);
    }

    const nicSetHandler = (data) => {
        setnic(data);
    }

    const contact_numberSetHandler = (data) => {
        setcontact_number(data);
    }

    const addressSetHandler = (data) => {
        setaddress(data);
    }

    const passwordSetHandler = (data) => {
        setpassword(data)
    }

    function sendData(){
        const newcustomer = {
            name,
            email,
            nic,
            contact_number,
            address,
            password
        }

        if( name==='' && email === '' && nic === '' && contact_number === '' && address === '' && password === '') {
            swal("All Fields are empty");
        }else if(name === ''){
            swal("Customer Name Field is empty")
        }else if(email === ''){
            swal("Customer email Field is empty")
        }else if(nic === '' || nic.length < 12 ){
            swal("Customer nic Field is empty")
        }else if(contact_number === ''){
            swal("Customer contact_number Field is empty")
        }else if(address === ''){
            swal("Customer address Field is empty")
        }else if(password === ''){
            swal("Customer password is empty")
        }
        else
        axios.put(`http://localhost:8090/realCustomer/update/${id}`,newcustomer).then(()=>{
             swal({
                title: "Success!",
                text: "Employee Updated Successfully",
                icon: 'success',
                timer: 2000,
                button: false,
              });
              setFireRedirect(true);
        }).catch((e)=>{
            alert(e);
        })
    }
    return(
        <Layout>
        
            <div className="Add Employee">


            <center><h2>Update Customer</h2></center>
            <form className="customer-form" >


            <EditCustomerForm value={customer.name} title="Name" onSave={nameSetHandler}/>

            <EditCustomerForm value={customer.email} title="Email" onSave={emailSetHandler}/>

            <EditCustomerForm value={customer.nic} title="NIC" onSave={nicSetHandler}/>

            <EditCustomerForm value={customer.contact_number} title="Contact Number" onSave={contact_numberSetHandler}/>

            <EditCustomerForm value={customer.address} title="Address" onSave={addressSetHandler} />

            <EditCustomerForm value={customer.password} title="Password" onSave={passwordSetHandler}/>
            
            <center><button className="employee-btn" type="button" onClick={sendData}>Update</button> </center>
             
             </form>
             {fireRedirect && <Redirect to={"/ManageCustomer"} push={true} />}
             
        </div>
            
        </Layout>
    )
}

export default UpdateCustomer;