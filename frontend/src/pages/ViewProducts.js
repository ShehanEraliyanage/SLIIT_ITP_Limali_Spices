
// Reset search bug - Searched products is not resetting after  clicking outside of the search. 
// (this happens after reload the page)

import classes from './ViewProducts.module.css'

import react, {useState, useEffect} from 'react'
import Layout from "../components/Layout";
import SearchProduct from "../components/Products/SearchProduct";
import {getAllProducts} from '../controllers/product';

import alarm from '../image/alarm.png';

const ViewProducts = (props) => {

  const [productList, setProductList] = useState([]);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
      getAllProducts().then((result) => {
          setImages(result.imageUrl)
          setProductList(result);
          setSelectedProductList(result);
      });
      console.log(productList);
  }, [])

  const allBtnClickHandler = () => {
    setSelectedProductList([...productList]);
    console.log(selectedProductList);
  }

  const availableBtnClickHandler = () => {
    setSelectedProductList(productList.filter((product) => product.availability == 'Available'));
  }

  const outStocksBtnClickHandler = () => {
    setSelectedProductList(productList.filter((product) => product.availability == 'Out of Stocks'));
  }

  // const newBtnClickHandler = () => {
  //   setSelectedProductList(productList.sort({_id:1}).limit(50))
  //   console.log(selectedProductList);
  // }

  const serachProductHandler = (input) => {
    setSelectedProductList(productList.filter((product) => product.name.toLowerCase().includes(input.toLowerCase())));
  }

  const resetSearchhandler = () => {
    setSelectedProductList([...productList]);
    console.log(selectedProductList);
  }

  return (
    <Layout>
      <div>
        <div className={classes.productsHeading}>
          <div className={classes.productsHeadingLeft}>
            <div className={classes.productsHeadingTitles} onClick={allBtnClickHandler}>All</div>
            <div className={classes.productsHeadingTitles} onClick={availableBtnClickHandler}>Available</div>
            <div className={classes.productsHeadingTitles} onClick={outStocksBtnClickHandler}>Out of Stocks</div>
            {/* <div className={classes.productsHeadingTitles} onClick={newBtnClickHandler}>New</div> */}
          </div>
          <div className={classes.productHeadingRight}>
            <SearchProduct onSearch={serachProductHandler} onReset={resetSearchhandler}/>
          </div>
        </div>

        <div className={classes.products}>

          {selectedProductList.map((value, index) => (
              <div key={value.id}>
                <a className={classes.productCard} href={`/viewProduct/${value.id}`}>
                  <img src={value.imageUrl[0]} className={classes.productImage}></img>
                  <p className={classes.productName}>{value.name}</p>
                  <p>Rs. {value.price}.00</p>
                </a>
              </div>
        ))}

        {(selectedProductList.length === 0) ? (
          <div className={classes.productNoPrducts}>
            <img src={alarm} className={classes.productNoProductsImg}/>
            <p className={classes.productNoProductsPara}>Sorry, No products to display at the moment.</p>
          </div>) 
        : <div />}

        </div>
      </div>
    </Layout>
  );
};

export default ViewProducts;
