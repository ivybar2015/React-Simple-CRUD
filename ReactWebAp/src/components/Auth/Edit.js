import React, { Component } from "react";
//import BrowserRouter from "react-router-dom";
import axios from "axios";
import "./authlayout.css";
import Button from '@material-ui/core/Button';


class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // usernname and password have to match with variable name declared at web api
            // declare  list
            //  data: [],
            //  Id: props.match.params.id,
            //  username: "",
            //    firstname: "",
            //  lastname: "",
            Id: this.props.match.params.id,
            Username: this.props.match.params.userName,
            FirstName: this.props.match.params.firstName,
            LastName: this.props.match.params.lastName
        };

        // let bind to funtion update value
        this.userName = this.userName.bind(this);
        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }

    userName(event) {
        this.setState({ Username: event.target.value });
    }

    firstName(event) {
        this.setState({ FirstName: event.target.value });
    }

    lastName(event) {
        this.setState({ LastName: event.target.value });
    }

    onSubmit(event) {
        // We can use the `useParams` hook here to access the dynamic pieces of the URL.

        event.preventDefault();
        const apiurl = "http://localhost:62458/api/user/update";
        const recored = {

            //get id passe
            Id: this.state.Id,
            Username: this.state.Username,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName

        }

        axios.post(apiurl, recored)
            .then(res => {
                console.log(res.dbase)
                //this.setState({ data: res.data.dbase })
                // go to listuser page
                this.props.history.push('/listuser')

            })
    }

    onCancel() {
        //  event.preventDefault();
        this.props.history.push('/listuser')
    }

    render() {
        return (
            <div className="input-form">
                <React.Fragment>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label> User Name  </label>
                            <input
                                type="text"
                                id="Username"
                                // holde current value
                                value={this.state.Username}
                                // name have to match with username of state and will hole username 'input'
                                name="Username"
                                placeholder="User Name"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.userName}
                            ></input>
                        </div>
                        <br></br>
                        <div>
                            <label> First Name  </label>
                            <input
                                type="text"
                                id="FirstName"
                                // holde current value
                                value={this.state.FirstName}
                                // name have to match with username of state and will hole username 'input'
                                name="FirstName"
                                placeholder="User Name"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.firstName}
                            ></input>
                        </div>
                        <div>
                            <label> Last Name  </label>
                            <input
                                type="text"
                                id="LastName"
                                // holde current value
                                value={this.state.LastName}
                                // name have to match with username of state and will hole username 'input'
                                name="LastName"
                                placeholder="Last Name"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.lastName}
                            ></input>
                            <br></br>
                        </div>
                        <br />
                        {/* put button on the form 'finished' */}
                        <div className="text-right"   >
                            <input

                                type="submit"
                                color="primary"
                                value="submit"
                            ></input>

                            <button onClick={this.onCancel} >Cancel </button>

                        </div>


                    </form>

                </React.Fragment>
            </div>
        );
    }
}
export default Edit;

