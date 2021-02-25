import React, { Component } from "react";
import { List, Avatar, Card, Tag } from "antd";
import axios from "axios";
import { fromNow, locate } from "silly-datetime";
import { tabItems, tagsColor } from "@/utils/data";
const { Item } = List;
export default class UserPage extends Component {
  // 测试
  constructor(props) {
    super(props);
    this.state = {
      detailInfo: {},
    };
  }
  getInfoData = (id) => {
    axios.get(`/user/${id}`).then((res) => {
      const { data } = res.data;
      console.log(data); //sy-log
      this.setState({
        detailInfo: data,
      });
    });
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.getInfoData(id);
  }
  render() {
    const { detailInfo } = this.state;
    return (
      <div className="detailPage">
        <Card
          title={
            <>
              <Tag
                color={
                  detailInfo.top || detailInfo.good
                    ? tagsColor["good"]
                    : tagsColor[detailInfo.tab]
                }
              >
                {detailInfo.top
                  ? "置顶"
                  : detailInfo.good
                  ? "精华"
                  : tabItems[detailInfo.tab]}
              </Tag>
              <span>{detailInfo.title}</span>
              <div className="detailInfo">
                <span> • 发布于{fromNow(detailInfo.create_at)}</span>
                <span> • 作者{detailInfo.author?.loginname}</span>
                <span> • {detailInfo.visit_count}次浏览</span>
                <span> • 来自 分享</span>
              </div>
            </>
          }
        >
          <div dangerouslySetInnerHTML={{ __html: detailInfo.content }}></div>
        </Card>
        <Card
          className="comment"
          title={<h5>{detailInfo.replies?.length}条回复</h5>}
        >
          <List
            dataSource={detailInfo.replies}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar size="large" src={item.author.avatar_url} />}
                  title={
                    <div className="detail_use">
                      <span className="titlecolor">
                        {item.author.loginname}
                      </span>
                      <span className="user_time">
                        {index + 1}楼 • {fromNow(item.create_at)}
                      </span>
                    </div>
                  }
                  description={
                    <div
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
                  }
                />
              </Item>
            )}
          />
        </Card>
      </div>
    );
  }
}
