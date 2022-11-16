import React ,{ useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export default function ManageOrder(){
    const [cutomers,managecustomer] =useState([]);

    useEffect(()=> {   
    function getcustomer(){
        axios.get("http://localhost:8090/realCustomer/").then((res)=>{
            managecustomer(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getcustomer();
    },[])

    const [orders,manageorder] =useState([]);

    useEffect(()=> {   
    function getorder(){
        axios.get("http://localhost:8090/order/").then((res)=>{
            manageorder(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getorder();
    },[])
    const x = 1;
 
    const onDelete=(id)=>{
       
         axios.delete(`http://localhost:8090/order/delete/${id}`).then((res)=>{
         
         });
         manageorder((prevOrder) => (prevOrder.filter(Order => Order.id !== id)))
         
         swal({
            title: "Success!",
            text: "Order Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          });


    };

    const history = useHistory();

 
    const routeChange = (id) =>{ 
        console.log(id)
      let path = "..//UpdateEmployee/" + id ; 
      history.push(path);
    }
    return(

        <div className="ManageOrder">
        <br></br>
        <center><h2 >Manage Order</h2></center>
        <br></br>
                <div>
                   
                    <table className="table table-striped styled-table">
                        <thead class="thead-dark">
                            <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Item</th>
        <th scope="col">Quantity</th>
        <th scope="col">Order Date</th>
        <th scope="col">Name</th>
        <th scope="col">Action</th>
        
        
                                </tr>
                                </thead>
                          <tbody>  
                          {orders.map((Order)=>{   
                              return(
                              <tr>
                                 
                  <td>{Order._id}</td>
                  <td> {Order.item} </td>
                  <td> {Order.quantity} </td>
                  <td> {Order.order_date} </td>
                  {cutomers.map((Customer)=>{   
                      if(Order.customer_id == Customer._id ){
                              return(
                                <td>{Customer.name}</td>)}})}

                 
                  <td className='action-buttons'>
                                        

                                        
                                        <button type="button"a href="" onClick={()=>{
                                            onDelete(Order._id)
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