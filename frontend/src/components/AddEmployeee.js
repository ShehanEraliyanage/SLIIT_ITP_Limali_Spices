import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';
import './AddEmployee.css';
import swal from 'sweetalert';
import Select from 'react-select'



function Addemployee() {


    const [fireRedirect, setFireRedirect] = useState(false);

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [address, setaddress] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");
    const [salary, setsalary] = useState("");
    const [branch, setbranch] = useState("");
    const [empType, setempType] = useState("");
    const [branches, setBranches] = useState([]);
    const [leaveTaken, setempleaveTaken] = useState("");
    const [selectedOption, setSelectedOption] = useState();


    useEffect(() => {
        function getemployee() {
            axios.get("http://localhost:8090/employee/getBranches").then((res) => {
                setBranches(res.data);
            }).catch((err) => {
                alert(err.messsage);
            })
        }
        getemployee();
    }, [branches]);


    function renderList() {
        return (branches.map(data => ({ label: data.location, value: data.location })));
    }


    function sendData() {
        const newemployee = {
            name,
            email,
            password,
            address,
            age,
            gender,
            salary,
            branch,
            empType,
            leaveTaken
        }
        if (name === '' && address === '' && age === '' && gender === '' && salary === '' && branch === '') {
            swal("All Fields are empty");
        } else if (name === '') {
            swal("Employee Name Field is empty")
        } else if (email === '') {
            swal("Employee Email Field is empty")
        } else if (password === '') {
            swal("Employee Password Field is empty")
        } else if (address === '') {
            swal("Employee Address Field is empty")
        } else if (age === '') {
            swal("Employee age Field is empty")
        } else if (gender === '') {
            swal("Employee Gender Field is empty")
        } else if (salary === '') {
            swal("Employee Salary Field is empty")
        } else if (empType === '') {
            swal("Employee Type Field is empty")
        } else if (leaveTaken === '') {
            swal("Employee Type Field is empty")
        }
        
        axios.post("http://localhost:8090/employee/add", newemployee).then(() => {

            swal({
                title: "Success!",
                text: "New Employee Added Successfully",
                icon: 'success',
                timer: 2000,
                button: false,
            });
            setFireRedirect(true);
        }).catch((e) => {
            alert(e);
        })
    }

    return (
        <div className="EmployeeAdd">
        <br></br>
        <center><h1 >Add Employee</h1></center>
        <br></br>
            <form class="employee-form" >
                <div class="from-group">

                    <label for="name">Name </label>
                    <input type="text" class="form-control" id="name" placeholder="Name"
                        onChange={(e) => {
                            setname(e.target.value);

                        }} />

                </div>

                <div class="from-group">

                    <label for="name">Email </label>
                    <input type="email" class="form-control" id="email" placeholder="Email"
                        onChange={(e) => {
                            setemail(e.target.value);

                        }} />

                </div>

                <div class="from-group">

                    <label for="name">Password </label>
                    <input type="text" class="form-control" id="name" placeholder="Password"
                        onChange={(e) => {
                            setpassword(e.target.value);

                        }} />

                </div>

                <div class="from-group">

                    <label for="name">Address </label>
                    <input type="text" class="form-control" id="address" placeholder="Address"
                        onChange={(e) => {
                            setaddress(e.target.value);

                        }} />

                </div>

                <div class="from-group">

                    <label for="name">Age </label>
                    <input type="text" class="form-control" id="age" placeholder="Age"
                        onChange={(e) => {
                            setage(e.target.value);

                        }} />

                </div>
                <div class="from-group">

                    <label for="name">Gender </label>
                    
                    <Select options={
                        [
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                        ]
                    }
                    onChange={(e) => {
                        setgender(e.value);
                    }} />

                </div>

                <div class="from-group">

                    <label for="name">Salary </label>
                    <input type="text" class="form-control" id="salary" placeholder="Salary"
                        onChange={(e) => {
                            setsalary(e.target.value);

                        }} />

                </div>
                <div class="from-group">

                    <label for="name"> Branch </label>
                    <Select options={renderList()} id="branch" name="branch"
                    onChange={(e) => {
                        setbranch(e.value);

                    }}/>
                    

                </div>
                <div class="from-group">

                    <label for="name"> Employee Type </label>
                    <Select options={
                        [
                            { value: 'Branch Manager', label: 'Branch Manager' },
                            { value: 'Delivery Manager', label: 'Delivery Manager'},
                            { value: 'Product Manager', label: 'Product Manager'},
                            { value: 'Supplier Manager', label: 'Supplier Manager'},
                            { value: 'Customer Manager', label: 'Customer Manager'},
                            { value: 'HR Manager', label: 'HR Manager'},
                            { value: 'Inventory Manager', label: 'Inventory Manager'},
                            { value: 'Driver', label: 'Driver'},
                            { value: 'Other', label: 'Other'},

                        ]
                    }
                    onChange={(e) => {
                        setempType(e.value);
                    }} />

                </div>
                <div class="from-group">

                    <label for="name">Leave Taken </label>
                    <input type="text" class="form-control" id="Leaves" placeholder="Leaves Taken"
                        onChange={(e) => {
                            setempleaveTaken(e.target.value);

                        }} />

                </div>

                <center>
                    <button class="employee-btn" type="button" onClick={sendData}>Submit</button>
                </center>
            </form>
            {fireRedirect && <Redirect to={"/ViewEmployee"} push={true} />}
        </div>

    );
}

export default Addemployee;
