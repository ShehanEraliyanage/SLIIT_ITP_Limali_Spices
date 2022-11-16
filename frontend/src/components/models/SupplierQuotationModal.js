import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Col, Row, Form } from "react-bootstrap";
import axios from 'axios';
import '../SupplierRequests.css';


export default function SupplierQuotationModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDelete = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8090/supplierquotation/delete/${id}`)
        .then(res => setShow(false),
        alert("succussfully deleted")
        ).catch(err => console.log(err))

};

const setActive=(id)=>{
       
  axios.put(`http://localhost:8090/supplierquotation/setactivesuppierq/${id}`).then((res)=>{
    setShow(false)
  alert("Quotation Accepted").catch(err=>{
     alert("Error")
  });
  });

  
};

const setDecline=(id)=>{
       
  axios.put(`http://localhost:8090/supplierquotation/setdeclinesuppierq/${id}`).then((res)=>{
  alert("Quotation Declined").catch(err=>{
     alert("Error")
  });
  });


};
 
  return (
    <>
      <Button className='btn btn-info button4 ' onClick={handleShow}>
      View
      </Button>

      <Modal show={show}        
        size="lg"
        centered
      >
        <Modal.Header>
      
          <Modal.Title id="contained-modal-title-vcenter">Supplier Quotation</Modal.Title>
           
        </Modal.Header>
        <Modal.Body>


        <Form>

  <fieldset>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    <Col sm={2}>
      <Form.Label>
      Item:
      </Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type="text"  value={props.qitem} disabled/>
    </Col>
    
    </Form.Group>
  </fieldset>


  <fieldset>
  <Form.Group as={Row} className="mb-3 " controlId="formPlaintextEmail">
    <Col sm={2}>
      <Form.Label>
      Price:
      </Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type="text" value={props.qprice } disabled/>
    </Col>
    
    </Form.Group>
  </fieldset>

<fieldset>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
<Col sm={2}>
  <Form.Label>
  Quantity:
  </Form.Label>
</Col>
<Col sm={10}>
  <Form.Control type="text"  value={props.qquantity} disabled/>
</Col>

</Form.Group>
</fieldset>




</Form>

  </Modal.Body>
    <Modal.Footer>
    <Button variant="success" onClick={()=>setActive(props.qid)} >
        Accept
      </Button>
      <Button variant="secondary" onClick={()=>setDecline(props.qid)}  >
    Decline
      </Button>
      <Button variant="danger" onClick={handleClose}>
        Exit
      </Button>
     
    </Modal.Footer>
  </Modal>
</>
);
}