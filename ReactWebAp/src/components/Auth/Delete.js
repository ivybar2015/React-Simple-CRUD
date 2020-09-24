import React, { Component } from "react";
//import BrowserRouter from "react-router-dom";
import axios from "axios";
//import { Link } from "react-router-dom";


function Delete(props) {
    // get url and id
    // http://localhost:62458/api/user/delete
    //   const apiurl = "http://localhost:62458/api/user/delete?userid=" + props.match.params.id;
    const getid = props.match.params.id;
    console.log(getid);
    const apiurl = "http://localhost:62458/api/user/delete?userid=" + getid;
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


