import classes from "./NewProduct.module.css";

import Layout from "../components/Layout";
import NewProductForm from "../components/NewProduct/NewProductForm";
import Button from "../components/Buttons/ProductButton";

const NewProduct = (props) => {
  return (
    <Layout>
      <div className={classes.newProduct}>
        <div className={classes.newProductHeading}>
          <p>Please submit the following form to add a new product</p>
        </div>
        <div className={classes.newProductContent}>
          <NewProductForm />
        </div>
      </div>
    </Layout>
  );
};

export default NewProduct;
