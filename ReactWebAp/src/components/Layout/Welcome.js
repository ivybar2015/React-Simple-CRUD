/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import "./layout.css";


import pic from "./Pictures/welcomepage.jpg";

function Wecome() {
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div className="welcome-pic">
            <img src={pic} className="floatLeftIvyStyle" />
        </div>
    );
}

export default Wecome;
