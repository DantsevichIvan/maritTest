import React, {useEffect} from 'react';
import Header from "./Header";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Characters from "./Characters";
import LogOut from "./LogOut";
import {useDispatch} from "react-redux";
import {setAuth} from "../reducers/authReducer";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        if (auth) {
            dispatch(setAuth({success: true}))
        }
    }, [])

    return (
        <div>
            <Header/>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/characters' component={Characters}/>
                <Route path='/logout' component={LogOut}/>
            </Switch>
        </div>
    );
};

export default App;
