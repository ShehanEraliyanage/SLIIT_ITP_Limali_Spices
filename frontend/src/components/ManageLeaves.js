import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import getSelectedEmployee from '../controllers/employee';

export default function ManageLeaves() {
    const [employees, ManageEmployeeLeaves] = useState([]);

    useEffect(() => {
        function getemployeeleave() {
            axios.get("http://localhost:8090/employee/").then((res) => {
                ManageEmployeeLeaves(res.data);
            }).catch((err) => {
                alert(err.messsage);
            })
        }
        getemployeeleave();
    }, [])
    let totalLeave = 21;


    function addLeave(id, e) {

        getSelectedEmployee(id).then((data) => {
            const employee = data;
            console.log(employee);

            employee.leaveTaken += 1;

            axios.put(`http://localhost:8090/employee/update/${id}`, employee).then(() => {
                swal({
                    title: "Success!",
                    text: "Employee Leave Updated Successfully",
                    icon: 'success',
                    timer: 2000,
                    button: false,
                });
                setTimeout(() => {
                    window.location.reload(true);
                }, 2050)
            }).catch((e) => {
                alert(e);
            })

        })
    }


return (
            <div className="EmployeeLeave">
                <br></br>
                <center><h1 >Manage Employee Leaves</h1></center>
                <br></br>
                <div>

                    <table className="table table-striped styled-table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">Total Leaves</th>
                                <th scope="col">Leaves Remaining</th>
                                <th scope="col">Leaves Taken</th>
                                <th scope="col">Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((Employee) => {
                                return (
                                    <tr>

                                        <td>{Employee.name}</td>
                                        <td> {Employee.branch} </td>
                                        <td> {totalLeave} </td>
                                        <td>{totalLeave - Employee.leaveTaken}  </td>
                                        <td> {Employee.leaveTaken} </td>


                                        <td className='action-buttons'>
                                            <button type="button" class="btn btn-warning button3 me-2" onClick={(e) => addLeave(Employee._id, e)} >Add a leave</button>
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