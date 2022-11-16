import React ,{ useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export default function ManageCustomer(){
    const [cutomers,managecustomer] =useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [searchInput, setSearchInput]  = useState("");

    useEffect(()=> {   
    function getcustomer(){
        axios.get("http://localhost:8090/realCustomer/").then((res)=>{
            managecustomer(res.data);
            setSelectedCustomers(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getcustomer();
    },[])
    
 
    const onDelete=(id)=>{
       axios.delete(`http://localhost:8090/realCustomer/delete/${id}`).then((res)=>{
         
         });
         swal({
            title: "Success!",
            text: "Customer Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          });

    };

    const searchHandler = () => {
        setSelectedCustomers(cutomers.filter((customer) => customer.name.toLowerCase().includes(searchInput.toLowerCase())))
    }


    const history = useHistory();

 
    const routeChange = (id) =>{ 
        console.log(id)
      let path = "..//UpdateCustomer/" + id ; 
      history.push(path);
    }
    return(

        <div className="ManageCustomer">
        <br></br>
        <center><h2 >Manage Customers</h2></center>
        <br></br>
                <div>
                <div class="from-group2">
                        <input type="text"  class="form-control"placeholder="Search By Name" onChange={(e) => setSearchInput(e.target.value)}></input>
                      <center> <button class="employee-btn" onClick={searchHandler} >Search</button></center> 
                    </div>
                   
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
                          {selectedCustomers.map((Customer)=>{   
                              return(
                              <tr>
                                 
                  <td>{Customer.name}</td>
                  <td> {Customer.email} </td>
                  <td> {Customer.nic} </td>
                  <td> {Customer.contact_number} </td>
                  <td> {Customer.address} </td>
                  <td> {Customer.password} </td>
                 
                  <td className='action-buttons'>
                                        <button type="button" onClick={routeChange.bind(this, Customer._id)} class="btn btn-warning button3 me-2">Update</button>

                                        
                                        <button type="button"a href="" onClick={()=>{
                                            onDelete(Customer._id)
                                            setTimeout(() =>{
                                                window.location.reload(true);
                                            },2050)
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