import React, { Component } from "react";
import { List, Avatar, Tag } from "antd";
import axios from "axios";
import { fromNow, locate } from "silly-datetime";
import { Link } from "react-router-dom";
const { Item } = List;
locate("zh-cn");
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], tab: "" };
  }
  getListData = (page = 1, tab = "all") => {
    axios.get(`/topics?page=${page}&tab=${tab}&limit=${15}`).then((res) => {
      const { data } = res.data;
      this.setState({
        data: data,
        page: 1,
      });
    });
  };
  shouldComponentUpdate(nextProps) {
    const { tab } = this.props;
    if (nextProps.tab !== tab) {
      this.getListData(1, nextProps.tab);
      return false;
    }
    return true;
  }
  componentDidMount() {
    this.getListData(1, this.props.tab);
  }
  render() {
    const { data } = this.state;
    const { tabItems, tagsColor, tab } = this.props;
    return (
      <List
        dataSource={data}
        pagination={{
          page: 1,
          pageSize: 15,
          total: 400,
          showSizeChanger: false,
          onChange: (page) => {
            this.getListData(page, tab);
          },
        }}
        renderItem={(item) => (
          <Item
            actions={[`回复:${item.reply_count}`, `访问:${item.visit_count}`]}
          >
            <Item.Meta
              avatar={
                <Link to={`/user/${item.author_id}`}>
                  <Avatar size="large" src={item.author.avatar_url} />
                </Link>
              }
              title={
                <div>
                  <Tag
                    color={
                      item.top || item.good
                        ? tagsColor["good"]
                        : tagsColor[item.tab]
                    }
                  >
                    {item.top
                      ? "置顶"
                      : item.good
                      ? "精华"
                      : tabItems[item.tab]}
                  </Tag>
                  <Link to={`/detail/${item.id}`}>
                    <span className="titlecolor">{item.title}</span>
                  </Link>
                </div>
              }
              description={
                <>
                  <span>{item.author.loginname}</span>
                  <span style={{ paddingLeft: "15px" }}>
                    回复时间: {fromNow(item.create_at)}
                  </span>
                </>
              }
            />
          </Item>
        )}
      />
    );
  }
}

export default ArticleList;
