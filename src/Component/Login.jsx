import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authUser, checkAuth} from "../actions/repos";
import {Redirect} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../scss/Login.scss'


function Login() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.isAuth)
    const textErr = useSelector(state => state.auth.message)

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        let login = event.currentTarget.login.value
        let password = event.currentTarget.password.value
        dispatch(authUser(login, password))
    }

    if (auth) {
        return <Redirect to={'/characters'}/>
    }

    return (
        <form action="" className="col s6" onSubmit={handleSubmit}>
            <div className="input-field col s6">
                <input id="login" type="text" className="validate"/>
                <label htmlFor="login">Login</label>
            </div>
            <div className="input-field col s6">
                <input id="password" type="password" className="validate"/>
                <label htmlFor="password">Password</label>
            </div>
            <span>{textErr}</span>
            <button className="btn waves-effect waves-light" type="submit" name="action">Sign in</button>
        </form>
    );
}

export default Login;
