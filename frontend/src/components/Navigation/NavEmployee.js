import classes from './NavPanel.module.css'
import {BiHomeAlt,BiClipboard,BiGroup,BiUserX,BiUserPlus,BiMoney} from 'react-icons/bi';
import { NavLink } from "react-router-dom";

const NavPanel = (props) => {

    return (
 
        <div className={classes.nav}>
                <NavLink to='EmployeeHome'> <img src={ require('../../image/logo.jpeg') } /></NavLink>
            
            <div className={classes.navlink}>
                <NavLink to="/EmployeeHome" className={classes.link}><BiHomeAlt style={{marginRight: 10}} size="1.5em"/> <div>Dashboard</div></NavLink>
                <NavLink to="/AddEmployee" className={classes.link}><BiUserPlus style={{marginRight: 10}} size="1.5em"/> <div>Add Employee</div></NavLink>
                <NavLink to="/ViewEmployee" className={classes.link}><BiGroup style={{marginRight: 10}} size="1.5em"/> <div>View Employee</div></NavLink>
                <NavLink to="/ManageLeaves" className={classes.link}><BiUserX style={{marginRight: 10}} size="1.5em"/> <div>Manage Leaves</div></NavLink>
                <NavLink to="/SalaryDetails" className={classes.link}><BiMoney style={{marginRight: 10}} size="1.5em"/> <div>Salary Details</div></NavLink>
                <NavLink to="/EmployeeReport" className={classes.link}><BiClipboard style={{marginRight: 10}} size="1.5em"/> <div>Reports</div></NavLink>
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