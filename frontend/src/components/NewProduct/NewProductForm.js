import React, { useState } from "react";
import axios from "axios";
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router'
import swal from 'sweetalert';

import NewProductEnteredImages from './NewProductEnteredImages';

import classes from "./NewProductForm.module.css";

import ButtonSubmit from "../Buttons/ProductButton";
import gallery from '../../image/gallery.png';
import upload from '../../image/upload.png';

import {addProduct} from '../../controllers/product';

const NewProductForm = (props) => {

  const [enteredProductName, setEnteredProductName] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredRemarks, setEnteredRemarks] = useState("");
  const [enteredImages, setEnteredImages] = useState([]);

  const [fireRedirect, setFireRedirect] = useState(false);
  const [id, setId] = useState();

  const productNameChangeHandler = (event) => {
    setEnteredProductName(event.target.value);
  }

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  }

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  }

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  }

  const remarksChangeHandler = (event) => {
    setEnteredRemarks(event.target.value);
  }

  const imageChangeHandler = (event) => {
    console.log(enteredImages);
    setEnteredImages([...enteredImages, event.target.files[0]]);
  }

  const addProductHandler = (event) => {
    event.preventDefault();
    

    if (enteredProductName == '' && enteredPrice == "" && enteredQuantity == "" && enteredDescription == "" && enteredRemarks == "") {
      swal("Please enter the product details");
      return;
    }
    else if (enteredProductName == '') {
      swal("Please enter the product name")
      return;
    }
    else if (isNaN(enteredPrice) || enteredPrice < 0 || enteredPrice == "") {
      swal("Please enter a valid price (non empty value).");
      return;
    }
    else if (isNaN(enteredQuantity) || enteredQuantity < 0 || enteredQuantity == "") {
      swal("Please enter a valid quantity (non empty value).");
      return;
    }
    else if (enteredDescription == "") {
      swal("Please enter the product description");
      return;
    }
    else if (enteredRemarks == "") {
      setEnteredRemarks("No Additional Remarks");
      return;
    }
    else if (enteredImages == undefined || enteredImages.length == 0) {
      swal("Please upload images of your project");
      return;
    };

    const data = new FormData();
    data.append('name', enteredProductName);
    data.append('price', enteredPrice);
    data.append('quantity', enteredQuantity);
    data.append('description', enteredDescription);
    data.append('remarks', enteredRemarks);
    data.append('availability', "Available");

    console.log(enteredImages);
    enteredImages.forEach((image, index) => {
      data.append('images', image);
    });
    swal({
      title: "Info!",
      text: "Please wait while your images are uploading to our servers",
      icon: 'info',
      timer: 5000,
      button: false,
    });

    axios({
      method: "post",
      url: "http://localhost:8090/product/add",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (!response.data.error) {
          console.log(response);
          console.log('Product added Successfully');
          const id = response.data.id;
          setId(id);
          let newProduction = {
            product: id,
            productName: response.data.name,
            production: response.data.quantity, 
            sold: 0
          }
          axios.post("http://localhost:8090/product/production", newProduction).then((response) => {
            swal({
              title: "Success!",
              text: "New product added successfully",
              icon: 'success',
              timer: 2000,
              button: false,
            }).catch(error => {
              console.log('error: ');
              console.log(error);
              swal({
                title: "Error!",
                text: "Couldn't add the product. Please try again",
                icon: 'error',
                timer: 2000,
                button: false
              });
          });  
            // setTimeout(() => {
            //     window.location.reload(true);
            // }, 2050)
            setFireRedirect(true);
          })
      } 
    })
    .catch(error => {
        console.log('error: ');
        console.log(error);
        swal({
          title: "Error!",
          text: "Couldn't add the product. Please try again",
          icon: 'error',
          timer: 2000,
          button: false
        });
    })
  }

  const deleteItemHandler = (image) => {
    setEnteredImages(enteredImages => {
      return (enteredImages.filter(imageSelected => image != imageSelected))
    })
  }

  const fromStyle = {
    marginTop: "0px",
    paddingLeft: "0",
    paddingRight: "0",
  }

  return (
    <form onSubmit={addProductHandler} action='http://localhost:8070/product/add' encType="multipart/form-data" style={fromStyle}>
      <div className={classes.newProductForm}>
        <div className={`${classes.imageUpload} ${classes.newProductFormContent}`}>
            <div className={classes.imageUploadHeading}>
                <p>Add images</p>
            </div>
            <div className={classes.imageUploadSection}>
  
              <Dropzone onDrop={acceptedFiles => acceptedFiles.forEach((image) => setEnteredImages(() => ([...enteredImages, image])))}>
                {({getRootProps, getInputProps}) => (
                  <section {...getRootProps()}>
                    <input {...getInputProps()} onChange={imageChangeHandler} />
                    <div >
                      <img src={gallery} className={classes.imageUploadImage}></img>
                    </div>
                    <div className={classes.imageUploadUploadDiv}>
                      <img src={upload} className={classes.imageUploadIcon}></img>
                      <p className={classes.imageUploadBrowsePara}> Drop your files here or 
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="contained-button-file"
                          name="images"
                          multiple
                          onChange={imageChangeHandler}
                        />
                        <label htmlFor="contained-button-file">
                          <Button variant="contained" color="primary" component="span">
                            Upload
                          </Button>
                        </label>
                      </p>

                    </div>
                  </section>
                )}
              </Dropzone>

            </div>
              <div className={classes.imageUploadedImages}>

                {enteredImages.map((image) => {
                  return (
                    <NewProductEnteredImages key={image.name} image={image} onDelete={deleteItemHandler}/>
                  )
                })}

              </div>
        </div>
        <div className={`${classes.newProductFormContent} ${classes.formRight}`}>
          <div className={classes.formContent}>
            <label  htmlFor="productName" className={classes.formLabel}>Product Name</label>
            <input type="text" name="productName" id="productName" className={classes.formInput} onChange={productNameChangeHandler}></input>
          </div>
          <div className={classes.formContent}>
            <label htmlFor="price" className={classes.formLabel}>Price per 1 kg</label>
            <input type="text" name="price" id="price" className={classes.formInput} onChange={priceChangeHandler}></input>
          </div>
          <div className={classes.formContent}>
            <label htmlFor="quantity" className={classes.formLabel}>Quantity (kg) </label>
            <input type="number" name="quantity" id="quantity" className={classes.formInput} onChange={quantityChangeHandler}></input>
          </div>
          <div className={classes.formContent}>
            <label htmlFor="description" className={classes.formLabel}>Description</label>
            <textarea type="text" name="description" id="description" className={`${classes.formInput} ${classes.formInputdescription}`} onChange={descriptionChangeHandler}></textarea>
          </div>
          <div className={classes.formContent}>
            <label htmlFor="remarks" className={classes.formLabel}>Additional remarks</label>
            <input type="text" name="remarks" id="remarks" className={classes.formInput} onChange={remarksChangeHandler}></input>
          </div>
        </div>
      </div>
      <div className={classes.productFormSubmitDiv}>
        <ButtonSubmit type="submit" onClick={addProductHandler}>Submit</ButtonSubmit>
      </div>
      {fireRedirect && <Redirect to={`/viewProduct/${id}`} push={true} />}
    </form>
  );
};

export default NewProductForm;
