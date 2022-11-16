import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import axios from 'axios';



export default function SupplierModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  

  const onDelete = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8090/supplier/delete/${id}`)
        .then(res => setShow(false),
        alert("deleted succussful")
        ).catch(err => console.log(err))

};
 
  return (
    <>
      <Button className='btn btn-warning me-2' onClick={handleShow}>
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
      <Form.Control type="text" value={props.sname} disabled  />
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
  <Form.Control type="text"   value={props.snic}  disabled/>
</Col>
</Form.Group>




  </Modal.Body>
    <Modal.Footer>
   
      <Button variant="success" onClick={(e) => { onDelete(props.sid, e) }} >
    Delete
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Exit
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
);
}