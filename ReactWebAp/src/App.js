import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import MaterialLayout from "./components/MaterialLayout/MaterialLayout";
//import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Layout/Home";
import ListUser from "./components/Layout/ListUser";
import About from "./components/Layout/About";
import Welcome from "./components/Layout/Welcome";
import Contacts from "./components/Layout/Contacts";
import Register from "./components/Auth/Register";
import Search from "./components/Auth/search";
import Login from "./components/Auth/login";
import MatCard from "./components/MatCard/MatCard";
import Edit from "./components/Auth/Edit";
import Delete from "./components/Auth/Delete";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  componentDidMount() {
    // send HTTP request
    // save it to the state
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    // console.log('Is Authtnticated ', isAuthenticated);
    console.log('Is Authenticated ', isAuthenticated);
  }

  render() {
    return (
      <BrowserRouter>
        {/* get MaterialLayout first then MaterialLayout will connect all the path of its component*/}
        <MaterialLayout />

        <Switch>
          <div className="container">
            {/* {About} {Contacts} {MatCard} are for component*/}
            {/* use 'LINK' to connect the pahts*/}
            {/* go dedirect to url  home */}
            <Route exact path="/" component={() => (<Redirect to="/home" />)} />
            <Route path="/home" component={Home} />
            <Route path="/listuser" component={ListUser} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/delete/:id" component={Delete} />
            <Route path="/search" component={Search} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contacts} />
            <Route path="/mcard" component={MatCard} />
            <Route path="/register" component={Register} />

          </div>
        </Switch>
      </BrowserRouter>

    );
  }
}
export default App;
