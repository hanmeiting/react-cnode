import "./App.less";
import React, { Component } from "react";
import { Layout } from "antd";

import axios from "axios";
import { tabItems, tagsColor } from "@/utils/data";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailePage from "./pages/DetailePage";
import UserPage from "./pages/UserPage";

const { Header, Content, Sider } = Layout;

axios.defaults.baseURL = "https://cnodejs.org/api/v1";

class App extends Component {
  constructor(props) {
    super(props);
    // const { match } = this.props;
    // const { tab } = match.prams;
    // this.state = { tab: tab };
  }
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
        <Switch>
          <Route
            path={["/:tab?", "/home/:tab?"]}
            exact
            render={({ match }) => {
              return <HomePage tab={match.params.tab}></HomePage>;
            }}
          ></Route>
          <Route path="/detail/:id" exact component={DetailePage}></Route>
          <Route path="/user/:id" exact component={UserPage}></Route>
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
