import React ,{ useState, useEffect} from "react";
import axios from "axios";
import swal from 'sweetalert';
import getSelectedEmployee from '../controllers/employee'; 
import EditEmployeeForm from '../components/Employee/EditEmployeeForm';
import './AddEmployee.css';

export default function SalaryDetails(){
    const [employees,salarydetails] =useState([]);

    useEffect(()=> {   
    function getEmployeeSalary(){
        axios.get("http://localhost:8090/employee/").then((res)=>{
            salarydetails(res.data);
        }).catch((err)=>{
            alert(err.messsage);
        })
    }
    getEmployeeSalary();
    },[])


    const[employee, setEmployee] = useState({});
    
    const [salary, setsalary] = useState(employee.salary)

    const salarySetHandler = (data) => {
        setsalary(data);
    }

    function sendData(id, e){

        
        getSelectedEmployee(id).then((data) => {
            const employee = data;
            let a = parseInt(salary) + parseInt(employee.salary);

            employee.salary = a;
            
            axios.put(`http://localhost:8090/employee/update/${id}`,employee).then(()=>{
            swal({
                title: "Success!",
                text: "Employee Salary Updated Successfully",
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

        })
        
    }    
    
    return(

        <div className="EmployeeSalary">
        <br></br>
        <center><h1 >Manage Employee Salary</h1></center>
        <br></br>
                <div>
                
                    <table className="table table-striped styled-table">
                        <thead class="thead-dark">
                            <tr>
        <th scope="col">Name</th>
        <th scope="col">Branch</th>
        <th scope="col">Employee Type</th>
        <th scope="col">Total Salary</th>
        <th scope="col">Increement</th>
        <th scope="col">Action</th>
        
        
                                </tr>
                                </thead>
                          <tbody>  
                          {employees.map((Employee)=>{   
                              return(
                              <tr>
                                 
                  <td>{Employee.name}</td>
                  <td> {Employee.branch} </td>
                  <td> {Employee.empType} </td>
                  <td> {Employee.salary} </td>
                  <EditEmployeeForm value={employee.salary}  onSave={salarySetHandler} />
                 

                  <td className='action-buttons'>
                     <button className="employee-btn" type="button" onClick={(e) => sendData(Employee._id, e)}>Update</button> 
                    
                                 
                  </td>
                  </tr>
                          )})}
                    </tbody> 
                    </table>
                </div>
            
          </div>
        
        );
}