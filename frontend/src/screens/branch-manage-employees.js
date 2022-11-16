import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch.css';


import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {auth, getEmployersOfBranch ,getPendingEmployersOfBranch,getRejectedEmployersOfBranch,acceptEmp,rejectEmp,pendingEmp} from '../controllers/branch';
import $ from 'jquery';
import swal from 'sweetalert';
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


    useEffect(() => {
        
        if(autheticate()==true||detailsUser.branch!=''){
            getPendingEmployersOfBranch({branch:detailsUser.branch}).then((result) => {
                setPending(result);
                

            });
            getRejectedEmployersOfBranch({branch:detailsUser.branch}).then((result) => {
                setRejected(result);

            });
            getEmployersOfBranch({branch:detailsUser.branch}).then((result) => {
                setAccepted(result);

            });
           


        }

      
      
       
    }, [])
function acceptEmployee(id){
 swal({
            title: "Are you sure?",
            text: "The Employee Will be enrolled to Your Branch!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((update) => {
            if (update) {

               acceptEmp(id).then((result) => { 
                    swal("Employee Sucessfully Added!", {
                        icon: "success",
                        title: "Added Successfully!",
                      });
                      setTimeout(() => {
                        window.location.replace("http://localhost:3000/branch-employees");
                    }, 2000)
                 });  
                 
                 
            }
          });

}
function rejectEmployee(id){
    swal({
        title: "Are you sure?",
        text: "The Employee Will be rejected from the Pending List!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((update) => {
        if (update) {

           rejectEmp(id).then((result) => { 
                swal("Employee Sucessfully Rejected!", {
                    icon: "success",
                    title: "Rejected!",
                  });
                  setTimeout(() => {
                    window.location.replace("http://localhost:3000/branch-employees");
                }, 2000)
                  
             });  

             
        }
      });

}
function disableEmployee(id){
    swal({
        title: "Are you sure?",
        text: "The Employee Will be thrown to Pending List!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((update) => {
        if (update) {

           pendingEmp(id).then((result) => { 
                swal("Moved To Pending List!", {
                    icon: "success",
                    title: "Moved Successfully!",
                  });
                  setTimeout(() => {
                    window.location.replace("http://localhost:3000/branch-employees");
                }, 2000)
             });  

             
        }
      });

}

    function RetrivePendingStudent(){
        $("#accepted").hide();
        $("#rejected").hide();
        $("#pending").show();
        $('.pending-btn').addClass("active");
        $('.rejected-btn').removeClass("active");
        $('.registered-btn').removeClass("active");
        $('#example').DataTable();




    }
    function RetriveRejectedStudent(){
        $("#accepted").hide();
        $("#rejected").show();
        $("#pending").hide();
        $('.pending-btn').removeClass("active");
        $('.rejected-btn').addClass("active");
        $('.registered-btn').removeClass("active");
        
    }
    function RetriveStudent(){
        $("#accepted").show();
        $("#rejected").hide();
        $("#pending").hide();
        $('.pending-btn').removeClass("active");
        $('.rejected-btn').removeClass("active");
        $('.registered-btn').addClass("active");
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

                    <center><h2 class="title-big">Employeers of The {detailsUser.branch} Branch</h2></center>

                    <div class="row">
                        <div class="btn-group-confirm"><button class="btn btn-warning button-2 pending-btn"  onClick={()=>RetrivePendingStudent()}>Pending Applicants</button></div>
                        <div class="btn-group-reject"><button class="btn btn-warning registered-btn"  onClick={()=>RetriveStudent()}>Registered  Employers</button></div>
                        <div class="btn-group-confirm"><button class="btn btn-warning rejected-btn" onClick={()=>RetriveRejectedStudent()}>Rejected Applicants</button></div>

                         <div></div>

                       </div>
                   
                    <table className="table table-striped styled-table" id="example">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Employer Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">age</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody id="pending">
                                    {pending.map((branches) => {
                                        return (
                                            <tr>

                                                <td>{branches.name}</td>
                                                <td> {branches.email} </td>
                                                <td> {branches.address} </td>
                                                <td> {branches.age} </td>
                                                <td> {branches.gender} </td>


                                                <td className='action-buttons'>
                                                <button type="button"  onClick={() => acceptEmployee(branches._id)} class="btn btn-success me-2">Confirm</button>

                                                <button type="button"  onClick={() => rejectEmployee(branches._id)} class="btn btn-danger  me-2">Reject</button>

                                           
                                                        </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>


                                <tbody id="accepted">
                                    {accepted.map((branches) => {
                                        return (
                                            <tr>

                                                <td>{branches.name}</td>
                                                <td> {branches.email} </td>
                                                <td> {branches.address} </td>
                                                <td> {branches.age} </td>
                                                <td> {branches.gender} </td>


                                                <td className='action-buttons'>

                                                <button type="button"  onClick={() => disableEmployee(branches._id)} class="btn btn-danger  me-2">Deactivate</button>

                                          
                                                        </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tbody id="rejected">
                                    {rejected.map((branches) => {
                                        return (
                                            <tr>

                                                <td>{branches.name}</td>
                                                <td> {branches.email} </td>
                                                <td> {branches.address} </td>
                                                <td> {branches.age} </td>
                                                <td> {branches.gender} </td>


                                                <td className='action-buttons'>

                                                <button type="button"  onClick={() => acceptEmployee(branches._id)} class="btn btn-success  me-2">Activate</button>

                                                    
\                                       
                                                        </td>
                                            </tr>
                                        )
                                    })}
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