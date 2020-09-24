import React, { Component } from "react";
//import BrowserRouter from "react-router-dom";
import axios from "axios";
import "./authlayout.css";

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
            //get id passe
            Id: this.props.match.params.id,
            //   Username: this.props.match.getdata.Username,
            // FirstName: this.props.getdata
            //  LastName: this.props.getdata.LastName
        };

        // let bind to funtion update value
        this.userName = this.userName.bind(this);
        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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

    handleCancel() {
        //   this.setState({ username: event.target.value });
        this.props.history.push('/listuser')
    }
    onSubmit(event) {
        // We can use the `useParams` hook here to access the dynamic pieces of the URL.

        event.preventDefault();
        const apiurl = "http://localhost:62458/api/user/update";
        const recored = {

            //get id passe
            // Id: this.props.match.params.id,
            // Username: this.props.match.params.Username,
            // FirstName: this.props.match.params.FirstName,
            // LastName: this.props.match.params.LastName
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
    render() {
        return (
            <div className="input-form">
                <React.Fragment>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <label> User Name  </label>
                            <input
                                type="text"
                                id="username"
                                // holde current value
                                value={this.state.Username}
                                // name have to match with username of state and will hole username 'input'
                                name="Username"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.Username}
                            ></input>
                            <br></br>

                        </div>
                        <di>
                            <label> First Name  </label>
                            <input
                                type="text"
                                id="FirstName"
                                // holde current value
                                value={this.state.FirstName}
                                // name have to match with username of state and will hole username 'input'
                                name="Firstname"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.FirstName}
                            ></input>
                        </di>
                        <br></br>

                        <div>
                            <label> Last Name  </label>
                            <input
                                type="text"
                                id="LastName"
                                // holde current value
                                value={this.state.LastName}
                                // name have to match with username of state and will hole username 'input'
                                name="LastName"
                                // after got input call  handleChange() and  passing  'event'
                                onChange={this.LastName}
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

                            <button onClick={this.handleCancel}>Cancel </button>

                        </div>
                    </form>

                </React.Fragment>
            </div>
        );
    }
}
export default Edit;