import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    // initilize variable
    this.state = {
      Username: "",
      Password: "",
      FirstName: "",
      LastName: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Any changes to the input is handled by the handleInput() handler, which updates the corresponding values in the state
  handleInput(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }
  // when click 'submit' button this funtion will get call
  handleSubmit(event) {
    event.preventDefault();
    // getting  data from out of 'state' to add to table database
    axios
      .post("http://localhost:62458/api/user/add", {
        Username: this.state.Username,
        Password: this.state.Password,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
      })
      .then((res) => {
        console.log(res);
        console.log(res.dbase);
        // go to listuser page
        this.props.history.push('/listuser')
      });
  }

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
              onChange={this.handleInput}
            ></input>
          </div>
          <br></br>
          <div>
            <input
              type="text"
              id="Password"
              // holde current value
              value={this.state.Password}
              // name have to match with username of state and will hole username 'input'
              name="Password"
              placeholder="Password"
              // after got input call  handleChange() and  passing  'event'
              onChange={this.handleInput}
            ></input>
          </div>
          <br></br>
          <div>
            <input
              type="text"
              id="FirstName"
              name="FirstName"
              // holde current value
              value={this.state.FirstName}
              placeholder="First Name"
              // after got input then pass 'event' into handleChange()
              onChange={this.handleInput}
            ></input>

          </div>
          <br></br>
          <div>
            <input
              type="text"
              // holde current value
              id="LastName"
              name="LastName"
              value={this.state.LastName}
              placeholder="Last Name"
              // after got input then pass 'event' into handleChange()
              onChange={this.handleInput}
            ></input>
          </div>
          <br />
          {/* put button on the form 'finished' */}
          <input type="submit" color="primary" value="Register"></input>
        </form>
      </React.Fragment>
    );
  }
}
export default Register;
