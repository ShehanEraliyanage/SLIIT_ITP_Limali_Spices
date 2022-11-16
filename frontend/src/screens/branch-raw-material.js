import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/branch-sidenav';
import '../App.css';
import '../components/Branch/branch.css';

import { BiSearchAlt } from 'react-icons/bi';
import { TiMessageTyping } from 'react-icons/ti';
import { FaUserCircle } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { getRawMaterials,deleteRawMaterial,auth } from '../controllers/branch';
import swal from 'sweetalert';


export default function Manage() {
    const [raw_materials, setRawmaterial] = useState([]);
    const [detailsUser, setUser] = useState([]);


    useEffect(() => {
        getRawMaterials().then((result) => {
            setRawmaterial(result);
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
    function deleteBranchRawMaterials(id) {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover these details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((result) => {
            if (result) {

                deleteRawMaterial(id).then((result) => { 
                    swal("Raw Material has been removed!", {
                        icon: "success",
                        title: "Delete Successfully!",
                      });
                 });  

                 setTimeout(() => {
                    window.location.replace("http://localhost:3000/raw-material-manage");
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

                    <center><h2 class="title-big">Manage Raw Materials</h2></center>
                    <table className="table table-striped styled-table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Item Code</th>
                                        <th scope="col">Code Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">unit Price</th>
                                        <th scope="col">Action</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {raw_materials.map((RawMaterial) => {
                                        return (
                                            <tr>

                                                <td>{RawMaterial.itemCode}</td>
                                                <td> {RawMaterial.name} </td>
                                                <td> {RawMaterial.quantity} </td>
                                                <td> {RawMaterial.unitPrice} </td>
                                                <td className='action-buttons'>
                                                        <button type="button"  onClick={() => deleteBranchRawMaterials(RawMaterial._id)} class="btn btn-danger button3 me-2">Delete</button>




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