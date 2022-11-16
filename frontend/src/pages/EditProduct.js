import Layout from "../components/Layout";
import ProductDetails from "../components/EditProduct/ProductDetails";
import ProductEdit from "../components/EditProduct/ProductEdit";
import ProductDelete from "../components/EditProduct/ProductDelete";
import ProductEditSubmit from "../components/EditProduct/ProductEditSubmit";

import {getSelectedProduct, deleteSelectedProduct, editSelectedProduct} from '../controllers/product';

import react, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import swal from 'sweetalert';

import classes from './EditProduct.module.css';
import './EditProduct2.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const ViewProduct = (props) => {

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  const [inputName, setInputName] = useState(false);
  const [inputPrice, setInputPrice] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(false);
  const [inputRemarks, setInputRemarks] = useState(false);
  const [inputavailability, setInputAvailability] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity);
  const [remarks, setRemarks] = useState(product.remarks);
  const [availability, setAvailability] = useState(product.availability);

  const [fireRedirect, setFireRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState(`/editProduct/${id}`);

  useEffect(() => {
      getSelectedProduct(id).then((result) => {
          setImages(result.imageUrl);
          setProduct(result);
          setPrice(result.price);
          setRemarks(result.remarks);
          setQuantity(result.quantity);
          setAvailability(result.availability);
      });
      
  }, [id])

//   const inputNameEditHandler = () => {
//     setInputName(true);
//   }


  const setPriceHandler = (data) => {
      setPrice(data);
  }

  const setQuantityHandler = (data) => {
      setQuantity(data);
  }

  const setRemarksHandler = (data) => {
      setRemarks(data);
  }


  const inputPriceEditHandler = () => {
    setInputPrice(true);
    setIsEditing(true);
  }

  const inputQuantityEditHandler = () => {
    setInputQuantity(true);
    setIsEditing(true);
  }

  const inputRemarksEditHandler = () => {
    setInputRemarks(true);
    setIsEditing(true);
  }

  const inputAvailabilityHandler = (event) => {
      setInputAvailability(true);
      setIsEditing(true);
      setAvailability(event.target.value);
      console.log(event.target.value);
  }

  const inputEditfalseHandler = () => {
      setInputPrice(false);
      setInputQuantity(false);
      setInputRemarks(false);
      setInputAvailability(false);
      setIsEditing(false);
  }

  // console.log(images);
  const imageClickHandler = (index) => {
    setSelectedImage(index);
  }

  const deleteProductHandler = (id) => {
    console.log("delete")
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete the product?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteSelectedProduct(id).then((res) => {
              console.log("Success");
              console.log(res);
              setRedirectPath("/viewProducts");
              swal({
                title: "Success!",
                text: "Product deleted successfully",
                icon: 'success',
                timer: 2000,
                button: false,
              });  
              setFireRedirect(true);
          })
          }
        },
        {
          label: 'No',
          onClick: () => console.log("Cancel")
        }
      ]
    });
  }

  const editProductHandler = (id, price, quantity, remarks, availability) => {
    // console.log(price);
    // console.log(quantity);
    // console.log(remarks);;
    // console.log(availability);
    if (isNaN(price) || price < 0 || price == "") {
      swal("Please enter a valid price (non empty value).");
      return;
    }
    else if (isNaN(quantity) || quantity < 0 || quantity == "") {
      swal("Please enter a valid quantity (non empty value).");
      return;
    }
    const newProduct = {price, quantity, remarks, availability}
    editSelectedProduct(id, newProduct).then((res) => {
    console.log("Product updated");
    setIsEditing(false);
    swal({
      title: "Success!",
      text: "Product updated successfully",
      icon: 'success',
      timer: 2000,
      button: false,
    });  
    setRedirectPath(`/editProduct/${id}`)
    setFireRedirect(true);
    })
  }


  return (
    <Layout>
      <div className={classes.newProduct}>
        <div className={classes.newProductHeading}>
          <p className={classes.para}>{product.name} product information</p>
        </div>
        <div className={classes.product}>
          <div className={classes.productLeft}>


            <div className={classes.productImageSection}>
              <div className={classes.productImageSectionMain}>
                <img src={images[selectedImage]} className={classes.productImageMain} />
              </div>
              <div className={classes.productImageSectionOtherSection}>

                {images.map((image, index) => (
                  <div className={index === selectedImage ? classes.productImageSectionOtherSelected : classes.productImageSectionOther} 
                  onClick={imageClickHandler.bind(this, index)} id={index}>
                    <img src={image} className={classes.productImageOther} />
                  </div>
                ))}

              </div>
            </div>

          </div>
          <div className={classes.productRight}>
            <div className={classes.productData}>
              <div className={classes.productTitle}>
                <p className={classes.para}>Product Information</p>
              </div>
              <div className={classes.productInfo}>

                <ProductDetails title="Product Name" value={product.name} edit={false} ></ProductDetails>

                {(inputPrice) ? (<ProductEdit title="Price per 1 kg" value={product.price} edit={false} OnEditProduct={setPriceHandler}></ProductEdit>) : 
                (<ProductDetails title="Price per 1 kg" value={`Rs. ${product.price}.00`} edit={true}  onEdit={inputPriceEditHandler}></ProductDetails>)}

                {(inputQuantity) ? (<ProductEdit title="Available quantity" value={product.quantity} edit={false} OnEditProduct={setQuantityHandler}></ProductEdit>) : 
                (<ProductDetails title="Available quantity" value={`${product.quantity} kg`} edit={true}  onEdit={inputQuantityEditHandler}></ProductDetails>)}
               
                <ProductDetails title="Description" value={product.description} edit={false}></ProductDetails>

                {(inputRemarks) ? (<ProductEdit title="Product Name" value={product.remarks} edit={false} OnEditProduct={setRemarksHandler}></ProductEdit>) : 
                (<ProductDetails title="Additional Remarks" value={product.remarks} edit={true}  onEdit={inputRemarksEditHandler}></ProductDetails>)}

                <div className={classes.productInfoRow}>
                    <div className={classes.productInfoKey}>
                        <p className={classes.para}>Availability</p>
                    </div>
                    <div className={classes.productInfoValue}>
                        <div className="custom-select" style={{width:'200px'}}>
                            <select name="availability" id="availability" onChange={inputAvailabilityHandler}> 
                                <option value="Available">Available</option>
                                {(availability == 'Available') ? (<option value="Out of Stocks">Out of Stocks</option>) : 
                                <option value="Out of Stocks" selected>Out of Stocks</option>}
                                {/* <option value="Out of Stocks">Out of Stocks</option> */}
                            </select>
                        </div>
                    </div>
                </div>

                {(!isEditing) ? (<ProductDelete onDeleteProduct={deleteProductHandler} id={id}/>) : 
                (<ProductEditSubmit onCancel={inputEditfalseHandler} onUpdate={editProductHandler} price={price} id={id} quantity={quantity} 
                remarks={remarks} availability={availability}/>)}

              </div>
            </div>
          </div>
        </div>
      </div>
      {fireRedirect && <Redirect to={redirectPath} push={true} />}
    </Layout>
  );
};

export default ViewProduct;
