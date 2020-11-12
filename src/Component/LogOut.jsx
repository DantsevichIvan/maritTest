import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/repos";
import {Redirect} from "react-router-dom";


const LogOut = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isAuth)

    if (!auth){
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <a className="waves-effect waves-light btn-large" onClick={() => dispatch(logout())}>Log Out</a>
        </div>
    );
};

export default LogOut;
