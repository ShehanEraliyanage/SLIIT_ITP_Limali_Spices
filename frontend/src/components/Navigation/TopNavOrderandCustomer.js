import classes from './TopNav.module.css';

import {Link} from 'react-router-dom';

import {FaUserCircle} from 'react-icons/fa';


const NavPanel = (props) => {

    return (
        <div className={classes.subbody}>
            <div className={classes.body}>
                <div className={classes.topbar}>
                    <div className={classes.topbarleft}>
                        <h3>Customer Manager</h3>
                    </div>
                    <div className={classes.topbarrigth}>
                        <Link to="/" className={classes.topbarlink}><FaUserCircle size="1.8em"/></Link> 
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NavPanel;