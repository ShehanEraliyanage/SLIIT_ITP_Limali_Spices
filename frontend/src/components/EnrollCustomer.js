import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router'
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import getSelectedCustomers from '../controllers/customer';

export default function EnrollCustomer() {

    const [fireRedirect, setFireRedirect] = useState(false);

    const [customer, setCustomer] = useState({});

    const [name, setname] = useState(customer.name);
    const [email, setemail] = useState(customer.email);
    const [nic, setnic] = useState(customer.nic);
    const [contact_number, setcontact_number] = useState(customer.contact_number);
    const [address, setaddress] = useState(customer.address);
    const [password, setpassword] = useState(customer.password);

    const [cutomers, enrollcustomer] = useState([]);

    useEffect(() => {
        function getcustomer() {
            axios.get("http://localhost:8090/customers/").then((res) => {
                enrollcustomer(res.data);
            }).catch((err) => {
                alert(err.messsage);
            })
        }
        getcustomer();
    }, [])


    const onDelete = (id) => {
        axios.delete(`http://localhost:8090/customers/delete/${id}`).then((res) => {

        });
        enrollcustomer((prevCustomer) => (prevCustomer.filter(customer => customer.id !== id)))
        console.log(customer);
        swal({
            title: "Success!",
            text: "Customer Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        });

    };

    const history = useHistory();

  
    function sendData(id, name, email, nic, contact_number, address, password, e) {

     
        try {
            axios.delete(`http://localhost:8090/customers/delete/${id}`);
            const realCus = {
                name,
                email,
                nic,
                contact_number,
                address,
                password,
            }
            axios.post("http://localhost:8090/realCustomer/add", realCus)

        } catch(err) {
            console.log(err)
        }
        swal({
            title: "Success!",
            text: "New Customer Added Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        }); setFireRedirect(true);
        
    }



    return (

        <div className="ManageCustomer">
            <br></br>
            <center><h2 >Enroll Customers</h2></center>
            <br></br>
            <div>

                <table className="table table-striped styled-table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Address</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>



                        </tr>
                    </thead>
                    <tbody>
                        {cutomers.map((Customer) => {
                            return (
                                <tr>

                                    <td>{Customer.name}</td>
                                    <td> {Customer.email} </td>
                                    <td> {Customer.nic} </td>
                                    <td> {Customer.contact_number} </td>
                                    <td> {Customer.address} </td>
                                    <td> {Customer.password} </td>

                                    <td className='action-buttons'>
                                        <button type="button" onClick={(e) => sendData(Customer._id, Customer.name, Customer.email, Customer.nic, Customer.contact_number, Customer.address, Customer.password, e)} class="btn btn-warning button3 me-2">Accept</button>

                                        {fireRedirect && <Redirect to={"/ManageCustomer"} push={true} />}

                                        <button type="button" a href="" onClick={() => {
                                            onDelete(Customer._id)
                                            setTimeout(() => {
                                                window.location.reload(true);
                                            }, 2050)
                                        }} class="btn btn-danger me-2">Delete</button>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>

    );
}