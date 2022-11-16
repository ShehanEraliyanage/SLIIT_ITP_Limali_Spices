import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import axios from 'axios';



export default function SupplierModal1(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [nic,setNic] = useState("");
  const [contactno,setContact] = useState("");
  const [address,setAddress] = useState("");
  const [password,setPassword] = useState("");
  

  const supplierData ={
    name,
    email,
    nic,
    contactno,
    address,
    password
  }

  const onUpdate=(id, e)=>{
    //console.log(props.PID)
   
     axios.put(`http://localhost:8090/supplier/update/${id}`,supplierData)
     .then(res=> {
       
       //console.log("Updated",res)
       setShow(false)
  })
  
     .catch(err=>console.log(err))
     
     }; 

  const onDelete = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8090/supplier/delete/${id}`)
        .then(res => setShow(false),
        alert("deleted succussful")
        ).catch(err => console.log(err))

};

const setSActive=(id)=>{
       
    axios.put(`http://localhost:8090/supplier/setactivesuppierq/${id}`).then((res)=>{
    alert("Request Accepted").catch(err=>{
       alert("Error")
    });
    });

    


};

const setSDecline=(id)=>{
   
axios.put(`http://localhost:8090/supplier/setdeclinesuppierq/${id}`).then((res)=>{
alert("Request Declined").catch(err=>{
   alert("Error")
});
});




};
 
  return (
    <>
      <Button className='btn btn-info button4' onClick={handleShow}>
      View
      </Button>

      <Modal show={show}        
        size="lg"
        centered
      >
        <Modal.Header>
      
          <Modal.Title id="contained-modal-title-vcenter">Profile</Modal.Title>
           
        </Modal.Header>
        <Modal.Body>


      

  <fieldset>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    <Col sm={2}>
      <Form.Label>
      Name:
      </Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type="text" value={props.sname} disabled />
    </Col>
    
    </Form.Group>
  </fieldset>


  <fieldset>
  <Form.Group as={Row} className="mb-3 " controlId="formPlaintextEmail">
    <Col sm={2}>
      <Form.Label>
      Address:
      </Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type="text" value={props.saddress } disabled/>
    </Col>
    
    </Form.Group>
  </fieldset>

<fieldset>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
<Col sm={2}>
  <Form.Label>
  Contact:
  </Form.Label>
</Col>
<Col sm={10}>
  <Form.Control type="text"  value={props.scontact} disabled/>
</Col>

</Form.Group>
</fieldset>

<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
<Form.Label column sm="2">
Email:
</Form.Label>
<Col sm="10">
  <Form.Control type="text"  value={props.semail} disabled/>
</Col>
</Form.Group>

<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
<Form.Label column sm="2">
NIC:
</Form.Label>
<Col sm="10">
  <Form.Control type="text"   value={props.snic} disabled/>
</Col>
</Form.Group>




  </Modal.Body>
    <Modal.Footer>
    <Button variant="success" onClick={(e) => { setSActive(props.sid) }} >
       Accept
      </Button>
      <Button variant="danger" onClick={(e) => { setSDecline(props.sid) }} >
    Decline
      </Button>
      <Button variant="warning" onClick={handleClose}>
        Exit
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
);
}