import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch.css';


import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {auth,acceptEmp,confirmOrder} from '../controllers/branch';
import $ from 'jquery';
import swal from 'sweetalert';
import axios from "axios";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"


export default function Manage() {

    $( document ).ready(function() {

        $("#accepted").hide();
        $("#rejected").hide();
        $("#pending").show();
        $('.pending-btn').addClass("active");
       
    });
    const [detailsUser, setUser] = useState([]);
    

    const [pending, setPending] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [accepted, setAccepted] = useState([]);

   function autheticate(){
    auth().then((result) => {
        setUser(result)
        if(result.branch!=''){
           // alert("Authenticated!")
            return true;
        }else{
            window.location.replace("http://localhost:3000/branch-login");
        }
        
    }).catch((err)=>{
            window.location.replace("http://localhost:3000/branch-login");
    });
   }


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
       axios.get("http://localhost:8090/order").then((res)=>{
           manageorder(res.data);
           $('#orders').DataTable();

       }).catch((err)=>{
       })
   }
   getorder();
   },[])

   function confirm(id){
  
 swal({
    title: "Are you sure?",
    text: "The Order Will Be Confirmed!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((update) => {
    if (update) {

       confirmOrder(id).then((result) => { 
            swal("Order Sucessfully Added!", {
                icon: "success",
                title: "Added Successfully!",
              });
              setTimeout(() => {
                window.location.replace("http://localhost:3000/branch-orders");
            }, 2000)
         });  
         
         
    }
  });

}

    return (
        <div class="main-body">
            <Navbar />
            <div class="sub-body">
                <div class="body">
                    <div class="top-bar">
                        <div class="top-bar-left">
                            <h3>Dashboard</h3>
                            <hr />
                            <h5>Branch Manager</h5>
                        </div>
                        <div>

                         
                        </div>
                        <div class="top-bar-rigth">
                            <Link to="/" class="top-bar-link"><BiSearchAlt size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><TiMessageTyping size="1.5em" /></Link>
                            <Link to="/" class="top-bar-link"><FaUserCircle size="1.8em" /></Link>
                            <Link to="/" class="top-bar-link"><RiArrowDropDownLine size="1.8em" /></Link>
                        </div>
                    </div>

                    <center><h2 class="title-big">Pendings Order of The {detailsUser.branch} Branch</h2></center>

                   
                   
                       <table className="table table-striped styled-table" id="orders" style={{backgroundColor:"#f4ddb1"}}>
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
                  {(() => {

if (Order.branch_status != "false") {

return (

<button class="btn btn-warning" >Confirmed</button>
)

} else{

return (

    <button type="button"a onClick={()=>confirm(Order._id)} class="btn btn-danger me-2">Confirm</button>

)

} 
})()}  

                                        
                                     
                                    </td>
                  </tr>
                          )})}
                    </tbody> 
                    </table>
                </div>
            </div>
        </div>
    )
}

                                                {/* {(() => {

if (branches.status == 0) {

  return (


  )

} else{

  return (


  )

} 
})()}  
                                                         */}