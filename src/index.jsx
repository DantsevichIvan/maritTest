import React from 'react'
import ReactDOM from 'react-dom'
import App from "./Static/App.js";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

ReactDOM.render(
    <BrowserRouter>
        <Provider>
            <App/>
        </Provider>
    </BrowserRouter>


    ,
    document.getElementById('root')
)
