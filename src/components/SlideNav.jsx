import React, { Component } from "react";
import { Layout, Menu } from "antd";
import ArticleList from "./components/ArticleList";
const { Header, Content, Sider } = Layout;
const tabItems = {
  all: "全部",
  good: "精华",
  share: "分享",
  ask: "问答",
  job: "招聘",
};

export default class SlideNav extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <img
            style={{ width: "120px" }}
            src="//static2.cnodejs.org/public/images/cnodejs_light.svg"
          ></img>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu theme="dark" mode="vertical" defaultSelectedKeys={["all"]}>
              {Object.entries(tabItems).map((item) => {
                return <Menu.Item key={item[0]}>{item[1]}</Menu.Item>;
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", background: "#fff" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ArticleList></ArticleList>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
