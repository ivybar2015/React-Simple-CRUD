import React, { Component } from "react";
import axios from "axios";


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchName: "",
            data: []
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handInput = this.handInput.bind(this);


    }
    handInput(event) {
        this.setState({ searchName: event.target.value });

        if (event.target.value && event.target.value.length >= 3) {
            // call search funtion
            this.handleSearch(this.state.searchName)

        }

    }
    handleSearch() {

        const getname = this.state.searchName;
        //console.log('Event ', getname);
        const apiUrl = "http://localhost:62458/api/user/search/" + getname;

        axios.get(apiUrl, {}).then((response) => {
            this.setState({ data: response.data.data });
            //  console.log("GET DATA RETURN", this.state.data);

        });
    }

    render() {
        //const record= this.state.datas;
        return (
            <form onSubmit={this.handleSearch}>
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search for..."
                            value={this.state.searchName}
                            onChange={this.handInput} >
                        </input>
                    </div>

                    <h1> List Of Search: </h1>
                    <div>
                        <table>
                            <thead>
                                <tr>

                                    <th>UserName</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map((index) => {
                                        return <tr key={index.Id}>

                                            <td>{index.Username}</td>
                                            <td>{index.FirstName}</td>
                                            <td>{index.LastName}</td>

                                        </tr>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>


                </div>
            </form>

        )

    }

}

export default Search;