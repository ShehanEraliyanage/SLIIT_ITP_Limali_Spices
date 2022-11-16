import Layout from "../components/LayoutEmployee";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import Select from 'react-select'
import { Redirect } from 'react-router'
import getSelectedEmployee from '../controllers/employee';
import EditEmployeeForm from '../components/Employee/EditEmployeeForm';



// Styles
const colourStyles = {
    control: (styles) => ({ ...styles, width: '360px', })
};

const UpdateEmployee = (props) => {

    const { id } = useParams();
    const [fireRedirect, setFireRedirect] = useState(false);
    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ];
    const branchOptions = [
        { value: "Hambanthota", label: "Hambanthota" },
        { value: "Colombo", label: "Colombo" },
        { value: "Galle", label: "Galle" },
        { value: "Kandy", label: "Kandy" }
    ];
    const typeOptions = [
        { value: "Branch Manager'", label: "Branch Manager'" },
        { value: "Delivery Manager", label: "Delivery Manager" },
        { value: "Product Manage", label: "Product Manage" },
        { value: "Supplier Manager", label: "Supplier Manager" },
        { value: "Customer Manager", label: "Customer Manager" },
        { value: "HR Manager", label: "HR Manager" },
        { value: 'Inventory Manager', label: 'Inventory Manager'},
        { value: "Driver", label: "Driver" },
        { value: 'Other', label: 'Other'}
    ];

    const [employee, setEmployee] = useState({});
    const [selectedGender, setSelectedGender] = useState({});
    const [selectedBranch, setSelectedBranch] = useState({});
    const [selectedType, setSelectedType] = useState({});

    useEffect(() => {

        getSelectedEmployee(id).then((data) => {
            const employee = data;
            setEmployee(employee);
            setSelectedGender({ label: data.gender, value: data.gender });
            setSelectedBranch({ label: data.branch, value: data.branch });
            setSelectedType({ label: data.empType, value: data.empType });
        })
    }, [id])

    const gender = selectedGender.label;
    const branch = selectedBranch.label;
    const empType = selectedType.label;
    

   

    const [name, setname] = useState(employee.name);
    const [email, setemail] = useState(employee.email);
    const [password, setpassword] = useState(employee.password);
    const [address, setaddress] = useState(employee.address);
    const [age, setage] = useState(employee.age)
    const [salary, setsalary] = useState(employee.salary)

    const nameSetHandler = (data) => {
        setname(data);
    }
    const emailSetHandler = (data) => {
        setemail(data);
    }
    const passwordSetHandler = (data) => {
        setpassword(data);
    }
    const addressSetHandler = (data) => {
        setaddress(data);
    }
    const ageSetHandler = (data) => {
        setage(data);
    }
    const salarySetHandler = (data) => {
        setsalary(data);
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
            empType
        }
        if (name === '' && address === '' && age === '' && gender === '' && salary === '' && branch === '') {
            swal("All Fields are empty");
        } else if (name === '') {
            swal("Employee Name Field is empty")
            return;
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
        } else if (branch === '') {
            swal("Employee Branch Field is empty")
        } else if (empType === '') {
            swal("Employee Type Field is empty")
        }
        axios.put(`http://localhost:8090/employee/update/${id}`, newemployee).then(() => {
            swal({
                title: "Success!",
                text: "Employee Updated Successfully",
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
        <Layout>

            <div className="Add Employee">


                <center><h2>Update Employee</h2></center>
                <form className="employee-form" >


                    <EditEmployeeForm value={employee.name} title="Name" onSave={nameSetHandler} />

                    <EditEmployeeForm value={employee.email} title="Email" onSave={emailSetHandler} />

                    <EditEmployeeForm value={employee.password} title="Password" onSave={passwordSetHandler} />

                    <EditEmployeeForm value={employee.address} title="Address" onSave={addressSetHandler} />

                    <EditEmployeeForm value={employee.age} title="Age" onSave={ageSetHandler} />
                    <div className="from-group">
                        <Select
                            styles={colourStyles}
                            options={genderOptions}
                            hideSelectedOptions={false}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e)}
                        />
                    </div>
                    <EditEmployeeForm value={employee.salary} title="Salary" onSave={salarySetHandler} />

                    <div className="from-group">
                        <Select
                            styles={colourStyles}
                            options={branchOptions}
                            hideSelectedOptions={false}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={selectedBranch}
                            onChange={(e) => setSelectedBranch(e)}
                        />
                    </div>

                    <div className="from-group">
                        <Select
                            styles={colourStyles}
                            options={typeOptions}
                            hideSelectedOptions={false}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e)}
                        />
                    </div>

                   <center> <button className="employee-btn" type="button" onClick={sendData}>Update</button></center>

                </form>
                {fireRedirect && <Redirect to={"/ViewEmployee"} push={true} />}
            </div>

        </Layout>
    )
}

export default UpdateEmployee;