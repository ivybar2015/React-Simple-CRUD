/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import "./layout.css";

import picture from "./Pictures/arthouse.jpg";

function Home() {
  return (
    <div className="welcome-pic">
      <img src={picture} className="floatLeftIvyStyle" />
    </div>
  );
}

export default Home;
