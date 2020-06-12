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
import { NavLink } from "react-router-dom";
import { Nav, NavItem, Collapse, NavbarToggler, DropdownToggle} from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";
import config from "config/config";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      collapse:[false,false],
      histoire:false
    }
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName,type) {
      return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  active2Route(sub) {
    var bool=false;
sub.map((route,index)=>{
  if (this.props.location.pathname.indexOf(route.path) > -1)
  bool=true;
})

    return bool ? "active2" : "";
  }
  isOpen(key){
    this.state.collapse[key]=!this.state.collapse[key];
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo" style={{ background:"#F4F3EF"}}>
          <img
            src={config.API_URL + "images/asset/logo.png"}
            alt="react-logo"
            style={{height:48}}
          />
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.type == "develope") {
                return (
                  <div>
                    <li
                      className={
                        this.active2Route(prop.sub) +
                        (prop.pro ? " active-pro" : "")
                      }
                      key={key}
                    >
                      <NavLink
                        // to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <div onClick={() => this.isOpen(key - 1)}>
                          <i className={prop.icon} />

                          <p>
                            {prop.name}{" "}
                            <i
                              style={{
                                fontSize: 10,
                                position: "absolute",
                                right: -10,
                              }}
                              className={
                                this.state.collapse[key - 1]
                                  ? "nc-icon nc-minimal-up"
                                  : "nc-icon nc-minimal-down"
                              }
                            />
                          </p>
                        </div>
                      </NavLink>
                    </li>
                    <Collapse isOpen={this.state.collapse[key - 1]} navbar>
                      {prop.sub.map((sub, index) => {
                        return (
                          <NavItem
                            className="nav-link"
                            activeClassName="active"
                            style={{ padding: 0 }}
                            key={index}
                          >
                            <li
                              className={
                                this.activeRoute(sub.path) +
                                (sub.pro ? " active-pro" : "")
                              }
                              key={key}
                            >
                              <NavLink
                                to={sub.layout + sub.path}
                                className="nav-link"
                                activeClassName="active"
                                style={{ marginTop: 0 }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    float: "left",
                                    width: 30,
                                    textAlign: "center",
                                    marginRight: 15,
                                    letterSpacing: 1,
                                  }}
                                >
                                  {sub.abrev}
                                </span>
                                <span
                                  style={{ textTransform: "capitalize" }}
                                  className="sidebar-normal"
                                >
                                  {sub.name}
                                </span>
                              </NavLink>
                            </li>
                          </NavItem>
                        );
                      })}
                    </Collapse>
                  </div>
                );
              } else {
                return (
                  <li
                    className={
                      this.activeRoute(prop.path) +
                      (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
