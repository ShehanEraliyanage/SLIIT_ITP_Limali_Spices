import Layout from "../components/Layout";
import classes from "./ProductDashboard.module.css";
import {getAllProducts, getToalProductionOfMonth} from '../controllers/product';
import Chart from "../components/Dashboard/Chart/Chart"

import Calendar from 'react-calendar';
import react, {useState, useEffect} from 'react'

import dashboard1 from "../image/PDashboard1.png";
import dashboard2 from "../image/PDashboard2.png";
import category1 from "../image/categories1.png";
import category2 from "../image/factory.png";
import category3 from "../image/supplier.png";
import box from "../image/box1.png";
import chillie from "../image/chillie.jpg";

const ProductDashboard = (props) => {

  const [productList, setProductList] = useState([]);
  const [images, setImages] = useState([]);
  const [chartData, setChartData] = useState([
    {label: 'Jan', value: 0 },
    {label: 'Feb', value: 0 },
    {label: 'Mar', value: 0 },
    {label: 'Apr', value: 0 },
    {label: 'May', value: 0 },
    {label: 'Jun', value: 0 },
    {label: 'Jul', value: 0 },
    {label: 'Aug', value: 0 },
    {label: 'Sep', value: 0 },
    {label: 'Oct', value: 0 },
    {label: 'Nov', value: 0 },
    {label: 'Dec', value: 0 },
]);

  useEffect(() => {
    getAllProducts().then((result) => {
        setImages(result.imageUrl)
        setProductList(result);
    });
    setChartData(() => {
      for (let i = 0; i < 12; i++) {
        getToalProductionOfMonth(i).then((data) => {
          chartData[i].value = data;
        })
      }
      return chartData;
    })
  }, [])

  return (
    <Layout>
      <div className={classes.dashBoardPage}>
        <div className={classes.dashBoardPageLeft}>
          <div className={classes.dashBoardPageLeftFirst}>
            <div className={classes.dashBoardPageLeftFirstHeading}>
              <h3 className={classes.dashBoardPageLeftFirstHeadingH3}>Hello Nimal, </h3>
              <p className={classes.dashBoardPageLeftFirstHeadingP}>Welcome back to Limali</p>
            </div>
            <div className={classes.dashBoardPageLeftFirstImageOne}>
              <img src={dashboard1} className={classes.dashBoardPageLeftFirstImageOneImg}></img>
            </div>
            <div className={classes.dashBoardPageLeftFirstImageTwo}>
              <img src={dashboard2} className={classes.dashBoardPageLeftFirstImageTwoImg}></img>
            </div>
          </div>
          <div className={classes.dashBoardPageLeftSecond}>
            <div className={classes.dashBoardPageLeftSecondCategory}>
              <div className={classes.dashBoardPageLeftSecondCategoryImage}>
                <img src={category1} className={classes.dashBoardPageLeftSecondCategoryImageImg} />
              </div>
              <p className={classes.dashBoardPageLeftSecondCategoryValue}>{productList.length}</p>
              <p className={classes.dashBoardPageLeftSecondCategoryName}>Products</p>
            </div>
            <div className={classes.dashBoardPageLeftSecondCategory}>
              <div className={classes.dashBoardPageLeftSecondCategoryImage}>
                <img src={category3} className={classes.dashBoardPageLeftSecondCategoryImageImg} />
              </div>
              <p className={classes.dashBoardPageLeftSecondCategoryValue}>33</p>
              <p className={classes.dashBoardPageLeftSecondCategoryName}>Suppliers</p>
            </div>
            <div className={classes.dashBoardPageLeftSecondCategory}>
              <div className={classes.dashBoardPageLeftSecondCategoryImage}>
                <img src={category2} className={classes.dashBoardPageLeftSecondCategoryImageImg} />
              </div>
              <p className={classes.dashBoardPageLeftSecondCategoryValue}>03</p>
              <p className={classes.dashBoardPageLeftSecondCategoryName}>Factories</p>
            </div>
          </div>
          <div className={classes.dashBoardPageLeftThird}>
            <Chart dataPoints={chartData}/>
          </div>
        </div>
        <div className={classes.dashBoardPageRight}>
          <div className={classes.dashBoardPageRightFirst}>
            <Calendar />
          </div>
          <div className={classes.dashBoardPageRightSecond}>
            <div className={classes.dashBoardPageRightSecondHeading}>
              <h4 className={classes.dashBoardPageRightSecondHeadingH4}>Our Products</h4>
              <a href="/viewProducts" > <button className={classes.dashBoardPageRightSecondHeadingbtn}>See all</button> </a>
            </div>
            <div className={classes.dashBoardPageRightSecondProducts}>

              {productList.map((product) => (
                <div className={classes.dashBoardPageRightSecondProduct}>
                  <div className={classes.dashBoardPageRightSecondProductImage}>
                    <img className={classes.dashBoardPageRightSecondProductImageimg} src={product.imageUrl[0]}></img>
                  </div>
                  <div className={classes.dashBoardPageRightSecondProductName}>
                    <p className={classes.dashBoardPageRightSecondProductNameP}>{product.name}</p>
                  </div>
                  <div className={classes.dashBoardPageRightSecondProductIcon}>
                    <img className={classes.dashBoardPageRightSecondProductIconimg} src={box}></img>
                  </div>
                </div>
              ))}

              {/* <div className={classes.dashBoardPageRightSecondProduct}>
                <div className={classes.dashBoardPageRightSecondProductImage}>
                  <img className={classes.dashBoardPageRightSecondProductImageimg} src={chillie}></img>
                </div>
                <div className={classes.dashBoardPageRightSecondProductName}>
                  <p className={classes.dashBoardPageRightSecondProductNameP}>Chillie Powder</p>
                </div>
                <div className={classes.dashBoardPageRightSecondProductIcon}>
                  <img className={classes.dashBoardPageRightSecondProductIconimg} src={box}></img>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDashboard;
