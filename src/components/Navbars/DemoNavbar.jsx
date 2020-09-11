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
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Row,
  Col
} from "reactstrap";

import routes from "routes.js";
import routesSecondaire from "routesSecondaire";
import * as firebase from "firebase/app";
import "firebase/database";
import { subscriberNewStoriz } from "services/messageService";
import Axios from "axios";
import config from "config/config";
import { Avatar, Divider } from "@material-ui/core";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      dropdownSetting: false,
      color: "transparent",
      numberNewStoriz: 0,
      numberCommentsToday: 0,
      user: JSON.parse(localStorage.getItem("user")),
      numberSuppDemande:0,
      numberDesactiveUsers:0,
      numberActiveUsers:0,
    };
    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();

    firebase
      .database()
      .ref("newStoriz")
      .on("value", (snapshot) => {
        if (snapshot && snapshot.val()) {
          console.log("asdkjn");
          Axios.get(config.API_URL + "histoires/count/EN_ATTANTE").then(
            (res) => {
              this.setState({ numberNewStoriz: res.data });
            }
          );
        }
      });
       firebase
         .database()
         .ref("comments")
         .on("value", (snapshot) => {
           if (snapshot && snapshot.val()) {
             console.log("asdkjn");
             Axios.get(config.API_URL + "impressions/admin/countToday").then(
               (res) => {
                 this.setState({ numberCommentsToday: res.data });
               }
             );
           }
         });
         firebase
           .database()
           .ref("activeUsers")
           .on("value", (snapshot) => {
             if (snapshot && snapshot.val()) {
               console.log("asdkjn");
               Axios.get(config.API_URL + "users/admin/getAllDCount").then(
                 (res) => {
                   this.setState({ numberDesactiveUsers: res.data });
                 }
               );
                Axios.get(config.API_URL + "users/admin/getAllACount").then(
                  (res) => {
                    this.setState({ numberActiveUsers: res.data });
                  }
                );
             }
           });
          firebase
         .database()
         .ref("deleteStoriz")
         .on("value", (snapshot) => {
           if (snapshot && snapshot.val()) {
             Axios.get(config.API_URL + "histoires/demandeSuppressionCount/:etat").then(
               (res) => {
                 this.setState({ numberSuppDemande: res.data });
               }
             );
           }
         });
  }
  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent",
      });
    } else {
      this.setState({
        color: "dark",
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  dropdownSettingsToggle(e) {
    this.setState({
      dropdownSetting: !this.state.dropdownSetting,
    });
  }
  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (!prop.sub) {
        if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
          brandName = prop.name;
        }
        return null;
      } else {
        prop.sub.map((sub, key) => {
          if (window.location.href.indexOf(sub.layout + sub.path) !== -1) {
            brandName = prop.name;
          }
          return null;
        });
      }
    });
    routesSecondaire.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        if (prop.path == "/histoire") brandName = "Histoires";
        else brandName = "Utilisateurs";
      }
      return null;
    });
    return brandName;
  }
  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark",
      });
    } else {
      this.setState({
        color: "transparent",
      });
    }
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }
  render() {
    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : this.state.color
        }
        expand="lg"
        className={
          this.props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (this.state.color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={this.state.isOpen}
            navbar
            className="justify-content-end"
          >
            <Nav navbar>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={(e) => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i
                    className="nc-icon nc-bell-55"
                    style={
                      this.state.numberActiveUsers !== 0 ||
                      this.state.numberDesactiveUsers !== 0 ||
                      this.state.numberNewStoriz !== 0 ||
                      this.state.numberSuppDemande !== 0
                        ? { color: "#ef8157" }
                        : {}
                    }
                  />
                  <p>
                    <span className="d-lg-none d-md-block">Notifications</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-nude" right>
                  <DropdownItem>
                    {" "}
                    <NavLink
                      to={routes[2].sub[1].layout + routes[2].sub[1].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}
                    >
                      <Row>
                        <Col md="2" xs="2" lg="2">
                          <div className="avatar">
                            <i class="fas fa-file-medical"></i>
                          </div>
                        </Col>
                        <Col md="10" xs="10" lg="10">
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="sidebar-normal"
                          >
                            {this.state.numberNewStoriz + " "}nouvelles
                            histoires
                          </span>
                        </Col>
                      </Row>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      to={routes[2].sub[2].layout + routes[2].sub[2].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}
                    >
                      <Row>
                        <Col md="2" xs="2" lg="2">
                          <div className="avatar">
                            <i class="fas fa-file-excel"></i>
                          </div>
                        </Col>
                        <Col md="10" xs="10" lg="10">
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="sidebar-normal"
                          >
                            {this.state.numberSuppDemande + " "} demandes de
                            suppression d'histoires
                          </span>
                        </Col>
                      </Row>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      to={routes[3].sub[2].layout + routes[3].sub[2].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}
                    >
                      <Row>
                        <Col md="2" xs="2" lg="2">
                          <div className="avatar">
                            <i class="fas fa-user-plus"></i>
                          </div>
                        </Col>
                        <Col md="10" xs="10" lg="10">
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="sidebar-normal"
                          >
                            {this.state.numberActiveUsers + " "} demandes
                            d'activation de compte
                          </span>
                        </Col>
                      </Row>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      to={routes[3].sub[2].layout + routes[3].sub[2].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}
                    >
                      <Row>
                        <Col md="2" xs="2" lg="2">
                          <div className="avatar">
                            <i class="fas fa-user-times"></i>
                          </div>
                        </Col>
                        <Col md="10" xs="10" lg="10">
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="sidebar-normal"
                          >
                            {this.state.numberDesactiveUsers + " "} demandes de
                            desactivation de compte
                          </span>
                        </Col>
                      </Row>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink
                      to={routes[4].layout + routes[4].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}
                    >
                      <Row>
                        <Col md="2" xs="2" lg="2">
                          <div className="avatar">
                            <i class="fas fa-comments"></i>
                          </div>
                        </Col>
                        <Col md="10" xs="10" lg="10">
                          <span
                            style={{ textTransform: "capitalize" }}
                            className="sidebar-normal"
                          >
                            {this.state.numberCommentsToday + " "} nouveaux
                            commentaires aujourd'hui
                          </span>
                        </Col>
                      </Row>
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                nav
                isOpen={this.state.dropdownSetting}
                toggle={(e) => this.dropdownSettingsToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Compte</span>
                  </p>
                </DropdownToggle>

                <DropdownMenu className="dropdown-nude" right>
                  <DropdownItem disabled >
                    <NavLink
                      
                      // to={routes[2].sub[1].layout + routes[2].sub[1].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar
                        className="img-circle img-no-padding img-responsive"
                        alt=""
                        src={config.API_URL + "images/asset/logo.png"}
                      />
                      <p style={{ margin: 0, marginLeft: 26 }}>
                        {this.state.user && this.state.user.pseudo ? this.state.user.pseudo : ""}
                      </p>
                    </NavLink>

                    {/*  */}
                  </DropdownItem>
                  <DropdownItem>
                    {" "}
                    <NavLink
                      onClick={() => {
                        localStorage.clear();
                        this.forceUpdate();
                      }}
                      // to={routes[2].sub[1].layout + routes[2].sub[1].path}
                      className="nav-link"
                      activeClassName="active"
                      style={{ marginTop: 0 }}

                    >
                      Deconnexion
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
