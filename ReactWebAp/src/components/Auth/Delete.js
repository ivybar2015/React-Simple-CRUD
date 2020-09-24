import React, { Component } from "react";
//import BrowserRouter from "react-router-dom";
import axios from "axios";
//import { Link } from "react-router-dom";


function Delete(props) {
    // get url and id 
    const apiurl = "http://localhost:62458/api/user/delete?userid=" + props.match.params.id;
    axios.post(apiurl)
        .then(res => {
            console.log(res.dbase)
        })
    return (
        <div>
            {  // go bacl to listuser page
                props.history.push('/listuser')
            }


        </div>
    )

}

export default Delete;