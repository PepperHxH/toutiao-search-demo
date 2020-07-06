import React from 'react';
import './App.css';
import { SearchBar } from './SearchBar';

class App extends React.Component {

  handle = (keyword) => {
    console.log(keyword);
  }

  render() {
    return (
      <div className='content'>
        <SearchBar />
      </div>
    );
  }
}

export default App;
