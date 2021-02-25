import React, { Component } from "react";
import { Layout, Menu } from "antd";
import ArticleList from "../components/ArticleList";
import { tabItems, tagsColor } from "@/utils/data";
import { Link } from "react-router-dom";
const { Content, Sider } = Layout;
export default class HomePage extends Component {
  render() {
    const { tab } = this.props;
    return (
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={[tab]}>
            {Object.entries(tabItems).map((item) => {
              return (
                <Menu.Item key={item[0]}>
                  <Link to={item[0]}>{item[1]}</Link>
                </Menu.Item>
              );
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
            <ArticleList
              tab={tab}
              tabItems={tabItems}
              tagsColor={tagsColor}
            ></ArticleList>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
