import React from 'react';
import './App.css';
import { Input } from 'antd';
import { Link } from "react-router-dom";

const { Search } = Input;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  handle = (value) => {
    this.setState({
      value: value
    });
    console.log(value);
  }

  render() {
    return (
      <div className='content'>
        <Search
          placeholder="请输入搜索内容"
          enterButton="搜索"
          size="large"
          onSearch={(value) => { this.handle(value); }}
        />
      </div>
    );
  }
}

export default App;
