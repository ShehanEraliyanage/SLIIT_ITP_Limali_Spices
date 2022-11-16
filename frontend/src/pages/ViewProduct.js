import Layout from "../components/Layout";
import {getSelectedProduct} from '../controllers/product';
import react, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";

import classes from './ViewProduct.module.css';

const ViewProduct = (props) => {

  const { id } = useParams()

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
    
  useEffect(() => {
      getSelectedProduct(id).then((result) => {
          setImages(result.imageUrl);
          setProduct(result);
          console.log(images);
      });
  }, [id])



  // console.log(images);
  const imageClickHandler = (index) => {
    setSelectedImage(index);
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
                
                {/* <div className={classes.productImageSectionOther}>
                  <img src={image2} className={classes.productImageOther} />
                </div>
                <div className={classes.productImageSectionOther}>
                  <img src={image3} className={classes.productImageOther} />
                </div> */}

              </div>
            </div>


            {/* <div className={classes.productImageSection}>
              <div>
                <img src={imageurl} className={classes.productImage} />
              </div>
            </div> */}
          </div>
          <div className={classes.productRight}>
            <div className={classes.productData}>
              <div className={classes.productTitle}>
                <p className={classes.para}>Product Information</p>
              </div>
              <div className={classes.productInfo}>

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p className={classes.para}>Product Name</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p className={classes.para}>{product.name}</p>
                  </div>
                </div>

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p className={classes.para}>Price per 1 kg</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p className={classes.para}>Rs. {product.price}.00</p>
                  </div>
                </div>

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p className={classes.para}>Available quantity</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p className={classes.para}>{product.quantity} kg</p>
                  </div>
                </div>

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p className={classes.para}>Description</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p className={classes.para}>{product.description}</p>
                  </div>
                </div>

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p>Additional Remarks</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p>{product.remarks}</p>
                  </div>
                </div>             

                <div className={classes.productInfoRow}>
                  <div className={classes.productInfoKey}>
                    <p>Availability</p>
                  </div>
                  <div className={classes.productInfoValue}>
                    <p>{product.availability}</p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewProduct;
