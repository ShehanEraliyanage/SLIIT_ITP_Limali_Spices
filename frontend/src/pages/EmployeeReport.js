import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/LayoutEmployee";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
export default function EmployeeReport() {


    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [searchInput, setSearchInput]  = useState("");
    const [employees,setemployee] =useState([]);

    useEffect(() => {
        axios.get("http://localhost:8090/employee/").then(res => {
            if (res.data) {
                setemployee(res.data)
                setSelectedEmployees(res.data);
            }
        });
    }, [])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const searchHandler = () => {
        setSelectedEmployees(employees.filter((employee) => employee.branch.toLowerCase().includes(searchInput.toLowerCase())))
    }

  
        return (
            <Layout>

            <div className="container" class="p-3 mb-2 bg-secondary text-white" ref={componentRef}>

                <h1><center><strong>Employee Salary and Leave Report</strong></center></h1>

                
                    <div class="from-group2" >
                        
                        <input type="text" class="form-control"placeholder="Filter Branch Here" onChange={(e) => setSearchInput(e.target.value)}></input>
                      <center>  <button  class="employee-btn" onClick={searchHandler} >Filter</button></center>
                    </div>
                <table className="table table-striped styled-table">
                    <thead class="thead-dark">
                        <tr class="text-danger">
                        <th scope="col">Index</th>  
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Employee Type</th>
                        <th scope="col">Leave Taken</th>

                        </tr>
                    </thead>
                    <tbody>

                    {selectedEmployees.map((Employee,index)=>(


                            <tr>
                                <td scope="row">{index + 1}</td>
                                <td>{Employee.name}</td>
                                 <td>{Employee.email}</td>
                                <td>{Employee.salary}</td>
                                <td>{Employee.branch}</td>
                                <td>{Employee.empType}</td>
                                <td>{Employee.leaveTaken}</td>


                            </tr>

                        ))}



                    </tbody>

            

                </table>

            <center><button class="employee-btn" type="button"  onClick={handlePrint}>Print</button></center>

            </div>
    </Layout>

        )
    
}





