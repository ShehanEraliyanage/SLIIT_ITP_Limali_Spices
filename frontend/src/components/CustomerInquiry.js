import React ,{ useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export default function ViewInquiry(){
    const [inquiries,viewinquiry] =useState([]);

    useEffect(()=> {   
    function getinquiry(){
        axios.get("http://localhost:8090/CustomerInquiry/").then((res)=>{
            viewinquiry(res.data);
        }).catch((err)=>{
alert(err.messsage);
        })
    }
    getinquiry();
    },[])
    const x = 1;
 
    const onDelete=(id,e)=>{
        e.preventDefault();
        axios.delete(`http://localhost:8090/CustomerInquiry/delete/${id}`).then((res)=>
       
        

         swal({
            title: "Success!",
            text: "Inquiry Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
          }),

          window.location.reload()
         
         
        ).catch(err => console.log(err))


    };

    const history = useHistory();

 
    const routeChange = (id) =>{ 
        console.log(id)
      let path = "..//CustomerInquiry/get/" + id ; 
      history.push(path);
    }

    return(

        <div className="ViewEmployee">
        <br></br>
        <center><h2 >View Inquiries</h2></center>
        <br></br>
                <div>
                   
                    <table className="table table-striped styled-table">
                        <thead class="thead-dark">
                            <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Status</th>
        <th scope="col">Answer</th>
        <th scope="col">Action</th>
        
        
                                </tr>
                                </thead>
                          <tbody>  
                          {inquiries.map((Inquiry)=>{   
                              return(
                              <tr>
                                 
                  <td>{Inquiry.title}</td>
                  <td> {Inquiry.description} </td>
                  <td> {Inquiry.answer} </td>
                  <td> {Inquiry.status} </td>

                 
                  <td className='action-buttons'>
                                        <button type="button" onClick={routeChange.bind(this, Inquiry._id)} class="btn btn-warning button3 me-2">Update</button>

                                        
                                        <button type="button"a href="" onClick={(e)=>onDelete(Inquiry._id,e)} class="btn btn-danger me-2">Delete</button>
                                     
                                    </td>
                  </tr>
                          )})}
                    </tbody> 
                    </table>
                </div>
            
          </div>
        
        );
}