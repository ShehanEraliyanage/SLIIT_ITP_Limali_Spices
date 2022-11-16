import classes from './NavPanel.module.css'

import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd, BiBarChartAlt2} from 'react-icons/bi';
import {MdDashboard, MdAddChart} from 'react-icons/md';
import {FaBoxes} from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const NavPanel = (props) => {

    return (
        // <nav className={classes.sidenav}>
        //     <NavLink to='/'>Dashboard</NavLink>
        //     <NavLink to='/viewProduct'>View Products</NavLink>
        //     <NavLink to='/viewProducts'>View Product</NavLink>
        //     <NavLink to='/newProduct'>New Product</NavLink>
        // </nav>
        <div className={classes.nav}>
                <NavLink to='/' className={classes.logo}> <img src={ require('../../image/logo.jpeg') } className={classes.logoImage}/></NavLink>

            <div className={classes.navlink}>
                <NavLink to="/productHome" className={classes.link}><MdDashboard style={{marginRight: 10}} size="1.5em"/> <div>Dashboard</div></NavLink>
                <NavLink to="/newProduct" className={classes.link}><MdAddChart style={{marginRight: 10}} size="1.5em"/> <div>Add Product</div></NavLink>
                <NavLink to="/viewProducts" className={classes.link}><FaBoxes style={{marginRight: 10}} size="1.5em"/> <div>Product List</div></NavLink>
                <NavLink to="/viewProduct" className={classes.link}><BiCart style={{marginRight: 10}} size="1.5em"/> <div>View Product</div></NavLink>
                <NavLink to="/productionReports" className={classes.link}><BiClipboard style={{marginRight: 10}} size="1.5em"/> <div>Reports</div></NavLink>
            </div>
            <div className={classes.navcontact}>
                <img  src={ require('../../image/contact.png') } />
                <p>Contact us anytime</p>
                <button >Contact</button>
            </div>
        </div>
    );
};

export default NavPanel;