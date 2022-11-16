import React from 'react';
import {Link} from 'react-router-dom';
import  '../App.css';

import {BiHomeAlt,BiClipboard,BiCar,BiCart,BiMessageSquareAdd, BiAbacus, BiAlbum} from 'react-icons/bi';

export default function Navbar() {
    return (
        <div class="nav">
                <Link to='/'> <img src={ require('../image/logo.jpeg') } /></Link>

            <div class="nav-link">
                <Link to="/" class="link"><BiHomeAlt style={{marginRight: 10}} size="1.5em"/> <div>Dashboard</div></Link>
                <Link to="/raw-material-add" class="link"><BiMessageSquareAdd style={{marginRight: 10}} size="1.5em"/> <div>Add Raw Material</div></Link>
                <Link to="/raw-material-manage" class="link"><BiAlbum style={{marginRight: 10}} size="1.5em"/> <div>Manage Raw Materials</div></Link>
                <Link to="/raw-purchase-quotation" class="link"><BiAbacus style={{marginRight: 10}} size="1.5em"/> <div>Manage Quotation</div></Link>
 
                <Link to="/raw-report" class="link"><BiClipboard style={{marginRight: 10}} size="1.5em"/> <div>Report</div></Link>
            </div>

            <div class="nav-contact">

                <img  src={ require('../image/contact.png') } />
                <p>Contact us anytime</p>
                <button >Contact</button>
            </div>
        </div>
    )
}




