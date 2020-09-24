import React, { Component } from "react";
import axios from "axios";
//import home from "./components/Layout/Home";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      // usernname and password have to match with variable name declared at web api
      Username: "",
      Password: "",
      isVisible: true,
    };
    //this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Username = this.Username.bind(this);
    this.Password = this.Password.bind(this);
  }

  Username(event) {
    this.setState({ Username: event.target.value });
  }

  Password(event) {
    this.setState({ Password: event.target.value });
  }
  //////////////////////////////
  // whenevr click on submit buttom this funtion will get call
  handleSubmit(event) {
    event.preventDefault();
    // get all value
    const data = {
      Username: this.state.Username,
      Password: this.state.Password,
    };

    // getting  data from out of 'state' to add to table database
    const apiUrl = "http://localhost:62458/api/user/login";

    axios
      .post(apiUrl, data) //.then((Response) => Response.json())
      .then((result) => {
        console.log(result);
        console.log(result.data.status);
        //console.log(result.Status);
        if (result.data.status === "201") {
          localStorage.setItem('isAuthenticated', 'Y');
          localStorage.setItem('UserId', result.data.userid);
          console.log("SUCCESS");
          // get to another page
          this.props.history.push("./about");
        }
        else {
          alert("Invalid User");
        }
      });
  }
  ///////////////////////////////////////////////////////////

  render() {
    return (
      <React.Fragment>

        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              id="Username"
              // holde current value
              value={this.state.Username}
              // name have to match with username of state and will hole username 'input'
              name="Username"
              placeholder="User Name"
              // after got input call  handleChange() and  passing  'event'
              onChange={this.Username}
            ></input>
          </div>

          <br></br>
          <div>
            <input
              type="password"
              // holde current value
              id="Password"
              name="Password"
              value={this.state.Password}
              placeholder="Password"
              // after got input then pass 'event' into handleChange()
              onChange={this.Password}
            ></input>
          </div>
          <br />
          {/* put button on the form 'finished' */}
          <input
            type="submit"
            color="primary"
            value="Login"
            disabled={this.state.Username.length < 3 || this.state.Password.length < 3}
          ></input>
        </form>
      </React.Fragment>
    );
  }
}
export default Login;
