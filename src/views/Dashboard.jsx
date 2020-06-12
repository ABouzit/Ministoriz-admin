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
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import * as firebase from "firebase/app";
import "firebase/database";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import { ButtonBase } from "@material-ui/core";
import Axios from "axios";
import config from "config/config";

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={
      nombreUsers:0,
      nombreMails:0,
      nombreComments:0,
      nombreStoriz:0
    }
    this.fetchStoriz();
    this.fetchUsers();
    this.fetchComments();
    this.fetchMails();
  }
  
  componentWillMount(){
    firebase.database().ref("newStoriz").on("value",snapshot=>{
      if(snapshot&&snapshot.val()){
        this.fetchStoriz()
      }});
    firebase.database().ref("deleteStoriz").on("value", snapshot => {
      if (snapshot && snapshot.val()) {
        this.fetchStoriz()
      }
    });
    firebase.database().ref("newUsers").on("value", snapshot => {
      if (snapshot && snapshot.val()) {
        this.fetchUsers()
      }
    });
    firebase.database().ref("comments").on("value", snapshot => {
      if (snapshot && snapshot.val()) {
        this.fetchComments()
      }
    });
    firebase.database().ref("mails").on("value", snapshot => {
      if (snapshot && snapshot.val()) {
        this.fetchMails()
      }
    });
  }
  fetchStoriz(){
    Axios.get(config.API_URL +"histoires/admin/count").then((res)=>{
      this.setState({nombreStoriz:res.data})
    })
  }
  fetchUsers(){
    Axios.get(config.API_URL + "users/admin/count").then((res) => {
      this.setState({nombreUsers: res.data })
    })
  }
  fetchComments(){
    Axios.get(config.API_URL + "impressions/admin/count").then((res) => {
      this.setState({nombreComments: res.data })
    })
  }
  fetchMails(){
    Axios.get(config.API_URL + "contacts/admin/count").then((res) => {
      this.setState({ nombreMails: res.data })
    })
  }
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="3" md="6" sm="6" style={{ marginBottom: 20 }}>
              <ButtonBase style={{ outline: "none", width: "100%", height: "100%" }} onClick={() => this.props.history.push("/admin/all-storiz")}>
                <Card className="card-stats" style={{ marginBottom: 0, width: "100%", height: "100%" }}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-copy-04 text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">histoires</p>
                        <CardTitle tag="p">{this.state.nombreStoriz}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter></CardFooter>
              </Card>
              </ButtonBase>
            </Col>
            <Col lg="3" md="6" sm="6" style={{ marginBottom: 20}}>
              <ButtonBase style={{ outline: "none", width: "100%", height: "100%" }} onClick={() => this.props.history.push("/admin/all-users")}>
                <Card className="card-stats" style={{ marginBottom: 0, width: "100%", height: "100%" }}>
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Utilisateurs</p>
                          <CardTitle tag="p">{this.state.nombreUsers}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter></CardFooter>
              </Card>
              </ButtonBase>
            </Col>
            <Col lg="3" md="6" sm="6" style={{ marginBottom: 20 }}>
              <ButtonBase style={{ outline: "none", width: "100%", height: "100%" }} onClick={() => this.props.history.push("/admin/all-comments")}>
                <Card className="card-stats" style={{ marginBottom: 0, width: "100%", height: "100%" }} >
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chat-33 text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Commentaires</p>
                          <CardTitle tag="p">{this.state.nombreComments}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>

                <CardFooter></CardFooter>
              </Card>
              </ButtonBase>
            </Col>
            <Col lg="3" md="6" sm="6" style={{ marginBottom: 20 }}>
              <ButtonBase style={{ outline: "none", width: "100%", height: "100%" }} onClick={() => this.props.history.push("/admin/all-mails")}>
                <Card className="card-stats" style={{ marginBottom: 0, width: "100%", height: "100%" }} >
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-email-85 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Mails</p>
                          <CardTitle tag="p">{this.state.nombreMails}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter></CardFooter>
              </Card></ButtonBase>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
