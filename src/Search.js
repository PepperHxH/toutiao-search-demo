import React, {Component} from "react";
import "./Search.css";
import { SearchBar } from "./SearchBar";

class App extends Component {

    render() {
        return (
        <div className="container">
            <div className="searchBar">
                <SearchBar />
            </div>
        </div>
        );
    }

}

export default App;
