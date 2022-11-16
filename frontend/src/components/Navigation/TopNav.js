import classes from './TopNav.module.css';

import {Link} from 'react-router-dom';
import {BiSearchAlt} from 'react-icons/bi';
import {TiMessageTyping} from 'react-icons/ti';
import {FaUserCircle} from 'react-icons/fa';
import {RiArrowDropDownLine} from 'react-icons/ri';

const NavPanel = (props) => {

    return (
        // <div className={classes.topNav}>
        //     <h2>This is the top nav</h2>
        // </div>

        <div className={classes.subbody}>
            <div className={classes.body}>
                <div className={classes.topbar}>
                    <div className={classes.topbarleft}>
                        <h3>Welcome |     </h3>
                        <hr></hr> 
                        <h5>Product Manager</h5>
                    </div>
                    <div className={classes.topbarrigth}>
                        <Link to="/" className={classes.topbarlink}><BiSearchAlt size="1.5em"/></Link> 
                        <Link to="/" className={classes.topbarlink}><TiMessageTyping size="1.5em"/></Link> 
                        <Link to="/" className={classes.topbarlink}><FaUserCircle size="1.8em"/></Link> 
                        <Link to="/" className={classes.topbarlink}><RiArrowDropDownLine size="1.8em"/></Link> 
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NavPanel;