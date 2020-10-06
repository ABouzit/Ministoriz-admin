/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import routes from "routes.js";
import routesSecondaire from "routesSecondaire";
import * as firebase from "firebase/app";
import "firebase/database";
var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
    
  }
componentWillMount(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(user)
  firebase
    .database()
    .ref("bloqueAdmin/" + user.id).on("value", snapshot => {
      if (snapshot && snapshot.val() && snapshot.val().stat === "BLOQUE")
        localStorage.clear();
    })
}
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    // if (!user) {
    //   this.props.history.push("/admin/Login/");
    // }
  }
  componentWillUnmount() {}
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    if (!JSON.parse(localStorage.getItem("user"))||JSON.parse(localStorage.getItem("user")).role!=="ADMIN"){
      localStorage.clear();
      return( <Redirect to={"/admin/login"} />)
     
    }
    else{
      return (
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            activeColor={this.state.activeColor}
          />
          <div className="main-panel" ref={this.mainPanel}>
            <DemoNavbar {...this.props} />
            <Switch>
              {routes.map((prop, key) => {
                if (!prop.sub)
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                else {
                  return prop.sub.map((sub, index) => {
                    return (
                      <Route
                        path={sub.layout + sub.path}
                        component={sub.component}
                        key={index}
                      />
                    );
                  });
                }
              })}
              {routesSecondaire.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout + prop.path + prop.varProp}
                    component={prop.component}
                    key={routes.lenght + key}
                  />
                );
              })}
            </Switch>
            <Footer fluid />
          </div>
          <FixedPlugin
            bgColor={this.state.backgroundColor}
            activeColor={this.state.activeColor}
            handleActiveClick={this.handleActiveClick}
            handleBgClick={this.handleBgClick}
          />
        </div>
      );
    }
  
  }
}

export default Dashboard;
