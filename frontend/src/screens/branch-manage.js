import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch.css';

import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { getAllBranch,deleteBranch,auth } from '../controllers/branch';
import swal from 'sweetalert';


export default function Manage() {
    const [branch, setBranch] = useState([]);
    const [detailsUser, setUser] = useState([]);


    useEffect(() => {
        getAllBranch().then((result) => {
            setBranch(result);
        });
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
    }, [])

    function deleteThis(id) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover these details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {

                deleteBranch(id).then((result) => { 
                    swal("Branch has been removed!", {
                        icon: "success",
                        title: "Deleted Successfully!",
                      });
                 });  

                 setTimeout(() => {
                    window.location.replace("http://localhost:3000/branch-dash");
                }, 2000)
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
                            <h5>{detailsUser.branch} Branch Manager-{detailsUser.name}</h5>
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

                    <center><h2 class="title-big">Manage Branch</h2></center>
                    <div class="open-branch" >
                    <Link to="/add-branch" class="btn btn-danger ">
                           Open A New Branch
                       </Link>
                    </div>
                    <table className="table table-striped styled-table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Branch Code</th>
                                        <th scope="col">location</th>


                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {branch.map((branches) => {
                                        return (
                                            <tr>

                                                <td>{branches.number}</td>
                                                <td> {branches.location} </td>
                                           

                                                <td className='action-buttons'>
                                                        <Link to={"/branch-update/"+branches._id} class=""><button class="btn btn-warning" >Edit</button></Link>
                                                        {/* <button type="button"  onClick={() => deleteThis(branches._id)} class="btn btn-danger button3 me-2">Delete</button> */}

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