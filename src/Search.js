import React from 'react';
import { Input, AutoComplete } from 'antd';
import { List, Space } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import './Search.css';

const { TabPane } = Tabs;

const IconText = ({ user, icon, text }) => (
  <Space>
    {user}
    {React.createElement(icon)}
    {text}
  </Space>
);

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '', // 搜索词
      options: [], // 推荐词列表
      listData: [], // 搜索结果列表
      current: 1, //当前页码
      totalSize: 0 //搜索结果总条数
    }
  }

  // 刷新页面后重新渲染上一次搜索结果
  componentDidMount() {
    const list = JSON.parse(sessionStorage.getItem('listData') || '[]');
    const total = JSON.parse(sessionStorage.getItem('totalSize') || 0 );
    const value= JSON.parse(sessionStorage.getItem('keyword') || 0 );
    this.setState({
      keyword: value,
      totalSize: total,
      listData: list
    })
  }

  // 请求搜索词列表
  getOptions = (params) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `https://i.snssdk.com/search/api/sug/?keyword=${params}`, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const res = xhr.response.data;
            let params = [];
            res.forEach((item) => {
                params.push({ 
                    value: item.keyword
                });
            });
            this.setState({
              options: params
            });
        } else {
            return new Error(xhr.statusText);
        }
      }
  }

  // 请求搜索结果列表
  getListData = (params) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `https://i.snssdk.com/search/api/study?keyword=${params.keyword}&offset=${params.offset}`, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const res = xhr.response.data;
            let list = []
            res.forEach((item) => {
              list.push(item)
            })
            this.setState({
              listData: list,
              totalSize: xhr.response.total
            });
            // 将数据存放到缓存中，防止页面刷新数据丢失
            sessionStorage.setItem('keyword', JSON.stringify(params.keyword));
            sessionStorage.setItem('listData', JSON.stringify(list));
            sessionStorage.setItem('totalSize', JSON.stringify(xhr.response.total));
        } else {
            return new Error(xhr.statusText);
        }
      }
  }

  // 搜索推荐词
  onSearch = (keyword) => {
    if(keyword.length !== 0) {
      this.getOptions(keyword);
    }
  };

  // 选中搜索词时调用
  onSelect = (keyword) => {
    if(keyword.length !== 0) {
      this.getListData({
        keyword: keyword,
        offset: this.state.current-1
      });
    }
  };

  // 选中或输入搜索词时调用
  onChange = keyword => {
    this.setState({
      keyword : keyword
    });
  };

  pageChange = (page) => {
    this.getListData({
      keyword: this.state.keyword,
      offset: page-1
    });
    this.setState({
      current: page
    })
  }

  render () {
    const {
      keyword,
      options,
      listData,
      totalSize,
      current
    } = this.state
    return (
      <div className="container">
        <div className="searchBar">
          <AutoComplete
            value={keyword}
            options={options}
            style={{
              width: 840,
            }}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
            onChange={this.onChange}
          >
            <Input.Search 
              size="large" 
              placeholder={keyword ? keyword : "请输入您感兴趣的内容"}
              onSearch={this.onSelect}
              enterButton="搜索" 
            />
          </AutoComplete>
          <Tabs 
            defaultActiveKey="1" 
            size="large" 
            style={{
              backgroundColor: '#f1f2f3',
            }}
          >
            <TabPane tab="综合" key="1">
            <div className="list">
              <List
                current={current}
                itemLayout="vertical"
                size="large"
                pagination={{
                  total: totalSize,
                  onChange: this.pageChange,
                  pageSize: 10,
                }}
                style={{
                  backgroundColor: 'white'
                }}
                dataSource={listData}
                renderItem={item => (
                  <List.Item
                    actions={[  
                      <IconText user={item.user_name} icon={MessageOutlined} text={item.comments_count} />
                    ]}
                  >
                    <List.Item.Meta
                      title={<a href={item.link_url}>{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                  )}
              />
            </div>
            </TabPane>
            <TabPane tab="视频" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="用户" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  } 
};
