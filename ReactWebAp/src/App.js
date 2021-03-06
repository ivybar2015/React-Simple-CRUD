import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import MaterialLayout from "./components/MaterialLayout/MaterialLayout";
//import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Layout/Home";
import Welcome from "./components/Layout/Welcome";
import ListUser from "./components/Layout/ListUser";
import About from "./components/Layout/About";
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
      <div>

        <BrowserRouter>
          {/* get MaterialLayout first then MaterialLayout will connect all the path of its component*/}
          <MaterialLayout />
          <div className="container-app">
            <Switch>
              {/* {About} {Contacts} {MatCard} are for component*/}
              {/* use 'LINK' to connect the paths*/}
              {/* go dedirect to url  home 
              <Route exact path="/" component={() => (<Redirect to="/home" />)} />
              */}
              {/* use EXACT  to go exact path*/}
              <Route path="/" exact component={Welcome} />
              <Route path="/home" component={Home} />
              {/*  path="/listuser" is path of url */}
              <Route path="/listuser" exact component={ListUser} />
              <Route path="/edit/:id" exact component={Edit} />
              <Route path="/delete/:id" exact component={Delete} />
              <Route path="/search" exact component={Search} />
              <Route path="/login" exact component={Login} />
              <Route path="/about" exact component={About} />
              <Route path="/contact" exact component={Contacts} />
              <Route path="/mcard" exact component={MatCard} />
              <Route path="/register" exact component={Register} />

            </Switch>
          </div>
        </BrowserRouter>
      </div>


    );
  }
}
export default App;
