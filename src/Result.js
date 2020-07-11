import React from 'react';
import './App.css';
import { SearchBar } from './SearchBar';

class Result extends React.Component {

  handle = (keyword) => {
    console.log(keyword);
  }

  render() {
    return (
      <div className="container">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="tabBar"></div>
        <div className="list"></div>
      </div>
    );
  }
}

export default Result;
