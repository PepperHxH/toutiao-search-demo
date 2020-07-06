import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [keyword, setKeyword] = useState(''); // 搜索词
  const [options, setOptions] = useState([]); // 推荐词列表

  // 封装ajax请求
  function request(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const res = xhr.response.data;
            let options = [];
            res.forEach((item) => {
                options.push({ 
                    value: item.keyword
                });
            });
            setOptions(options);
        } else {
            return new Error(xhr.statusText);
        }
      }
  }

  // 搜索推荐词
  const onSearch = (keyword) => {
    request('https://i.snssdk.com/search/api/sug/?keyword='+keyword);
  };

  // 选中搜索词时调用
  const onSelect = data => {
    console.log('onSelect', data);
  };

  // 选中或输入搜索词时调用
  const onChange = data => {
    setKeyword(data);
  };

  // 点击搜索按钮时调用
  const handleSearch = (keyword) => {
    console.log('handleSearch', keyword);
  }

  return (
    <>
      <AutoComplete
        value={keyword}
        options={options}
        style={{
          width: 600,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      >
          <Input.Search 
            size="large" 
            placeholder="input here" 
            onSearch={(keyword) => {handleSearch(keyword)}} 
            enterButton="search" 
            />
      </AutoComplete>
    </>
  );
};
