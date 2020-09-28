/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";

import pic from "./Pictures/welcomepage.jpg";

function Wecome() {
    return (
        <div className="welcome-pic">
            <img src={pic} height="40%" width="70%" alt="picture" />
        </div>
    );
}

export default Wecome;
