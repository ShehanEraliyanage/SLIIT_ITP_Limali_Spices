import React ,{ useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export default function ViewEmployee(){
    const [employees,viewemployee] =useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [searchInput, setSearchInput]  = useState("");

    useEffect(()=> {   
    function getemployee(){
        axios.get("http://localhost:8090/employee/").then((res)=>{
            viewemployee(res.data);
            setSelectedEmployees(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getemployee();
    },[])
    const x = 1;
 
    const onDelete=(id)=>{
        axios.delete(`http://localhost:8090/employee/delete/${id}`).then((res)=>{
            
         });
        viewemployee((prevEmployees) => (prevEmployees.filter(employee => employee.id !== id)))
        
        swal({
            title: "Success!",
            text: "Employee Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          });

    };

    const searchHandler = () => {
        setSelectedEmployees(employees.filter((employee) => employee.name.toLowerCase().includes(searchInput.toLowerCase())))
    }

    const history = useHistory();

 
    const routeChange = (id) =>{ 
        console.log(id)
      let path = "..//UpdateEmployee/" + id ; 
      history.push(path);
    }
    
    return(

        <div className="ViewEmployee">
        <br></br>
        <center><h1 >View Employees</h1></center>
        <br></br>
                <div>
                    <div class="from-group2" >
                        <input type="text" class="form-control"placeholder="Search By Name" onChange={(e) => setSearchInput(e.target.value)}></input>
                      <center>  <button  class="employee-btn" onClick={searchHandler} >Search</button></center>
                    </div>
                   
                    <table className="table table-striped styled-table">
                        <thead class="thead-dark">
                            <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Employee Type</th>
                        <th scope="col">Action</th>
        
        
                                </tr>
                                </thead>
                          <tbody>  
                          {selectedEmployees.map((Employee)=>{   
                              return(
                              <tr>
                                 
                  <td>{Employee.name}</td>
                  <td>{Employee.email}</td>
                  <td> {Employee.address} </td>
                  <td> {Employee.age} </td>
                  <td> {Employee.gender} </td>
                  <td> {Employee.salary} </td>
                  <td> {Employee.branch} </td>
                  <td> {Employee.empType} </td>
                 
                  <td className='action-buttons'>
                                        <button type="button" onClick={routeChange.bind(this, Employee._id)} class="btn btn-warning button3 me-2">Update</button>

                                        
                                        <button type="button"a href="" onClick={()=>{
                                            onDelete(Employee._id) 
                                            setTimeout(() => {
                                                window.location.reload(true);
                                            }, 2050)
                                            }} class="btn btn-danger me-2">Delete</button>
                                     
                                    </td>
                  </tr>
                          )})}
                    </tbody> 
                    </table>
                </div>
            
          </div>
        
        );
}