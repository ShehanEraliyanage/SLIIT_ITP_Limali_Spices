import classes from './NavPanel.module.css'

import {BiHomeAlt,BiClipboard,BiUserPlus,BiUserVoice,BiCart,BiEditAlt} from 'react-icons/bi';
import { NavLink } from "react-router-dom";

const NavPanel = (props) => {

    return (
 
        <div className={classes.nav}>
                <NavLink to='CustomerManagerHome'> <img src={ require('../../image/logo.jpeg') } /></NavLink>

            <div className={classes.navlink}>
                <NavLink to="/CustomerManagerHome" className={classes.link}><BiHomeAlt style={{marginRight: 10}} size="1.5em"/> <div>Dashboard</div></NavLink>
                <NavLink to="/ManageOrder" className={classes.link}><BiCart style={{marginRight: 10}} size="1.5em"/> <div>Manage Orders</div></NavLink>
                <NavLink to="/EnrollCustomer" className={classes.link}><BiUserPlus style={{marginRight: 10}} size="1.5em"/> <div>Enroll Customers</div></NavLink>
                <NavLink to="/ManageCustomer" className={classes.link}><BiUserVoice style={{marginRight: 10}} size="1.5em"/> <div>Manage Customers</div></NavLink>
                <NavLink to="/CustomerOrderReport" className={classes.link}><BiClipboard style={{marginRight: 10}} size="1.5em"/> <div>Reports</div></NavLink>
                <NavLink to="/CustomerInquiry" className={classes.link}><BiEditAlt style={{marginRight: 10}} size="1.5em"/> <div>Inquiries</div></NavLink>
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