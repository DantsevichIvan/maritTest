import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../scss/Header.scss'

const Header = () => {
    const auth = useSelector(state => state.auth.isAuth)
    return (
        <nav className='nav'>
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right nav-">
                    {auth ?
                        <li><Link to='/logout'>Logout</Link></li>:
                        <li><Link to='/login'>Login</Link></li>
                    }
                    <li><Link to='/characters'>Characters</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
