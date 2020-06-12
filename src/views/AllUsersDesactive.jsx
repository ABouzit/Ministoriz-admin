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
import Block from '@material-ui/icons/Block';
import Info from '@material-ui/icons/Info';
import Report from '@material-ui/icons/Report';
import People from '@material-ui/icons/People';
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import Save from "@material-ui/icons/Save";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Create from '@material-ui/icons/Create';
import Edit from "@material-ui/icons/Edit";
import React from "react";
 import Axios from "axios";
import Brush from '@material-ui/icons/Brush';
import * as Core  from '@material-ui/core';
import config from "config/config";
import MaterialTable from "material-table";
import { Avatar } from "@material-ui/core";
import translateTable from "config/translateTable";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import * as firebase from "firebase/app";
import "firebase/database";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  InputGroupAddon,
  InputGroup,
  Badge
} from "reactstrap";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import moment from 'moment';
import "moment/locale/fr";
import { Redirect } from 'react-router';
class AllUsersDesactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoires: [],
      users: [],
      nestedModal: false,
      closeAll: false,
      modal: false,
      selectedUser: {},
      numberJours: 0,
      redirect: false,
      selectedUserUid: "",
    };
    this.fetchUsers();
    firebase.database().ref("activeUsers").on("value",(snapshot) => {
      if (snapshot && snapshot.val()) {
       this.fetchUsers();
      }
    }
    )
    
  }
  fetchUsers() {
    console.log("asdkjn");
    Axios.get(config.API_URL + "users/admin/getAllAorD").then((res) => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  }
  toggleNested() {
    this.setState({ nestedModal: !this.state.nestedModal });
    this.setState({ closeAll: false });
  }
  toggleAll() {
    this.setState({ nestedModal: !this.state.nestedModal });
    this.setState({ closeAll: true });
  }
  toggle() {
    this.setState({ modal: !this.state.modal, numberJours: 0 });
  }
  bloquer() {
    Axios.put(
      config.API_URL + "users/bloquer/" + this.state.numberJours,
      this.state.selectedUser
    ).then((res) => {
      this.fetchUsers();
      this.toggle();
    });
  }
  desactiver(rowData){
    console.log("push3");
    let us = rowData;
    us.demandeResignation = false;
    us.isDesactive=true;
    console.log(us)
    Axios.put(config.API_URL + "users/admin/AorD", us).then((res) => {
      this.fetchUsers();
    });
    firebase
      .database()
      .ref("activeUsers/" + us.id)
      .set({
        stat: "DESACTIVE",
        numbe: 100000 + Math.random() * (100000 - 1),
      });
  }
  activer(rowData){
 console.log("push3");
 let us = rowData;
 us.demandeActivation = false;
 us.isDesactive = false;
 console.log(us);
 Axios.put(config.API_URL + "users/admin/AorD", us).then((res) => {
   this.fetchUsers();
 });
 firebase
   .database()
   .ref("activeUsers/" + us.id)
   .set({
     stat: "ACTIVE",
     numbe: 100000 + Math.random() * (100000 - 1),
   });
  }
  debloquer() {
    Axios.put(
      config.API_URL + "users/debloquer/",
      this.state.selectedUser
    ).then((res) => {
      this.fetchUsers();
    });
  }
  render() {
    const { redirect, selectedUserUid } = this.state;

    if (redirect) {
      return <Redirect to={"/admin/user/" + selectedUserUid} />;
    }
    const columns = [
      {
        title: "Status",
        field: "isDesactive",
        filtering: false,
        render: (rowData) =>
          rowData.isDesactive == true ? (
            <Badge style={{ backgroundColor: "rgb(239, 129, 87)" }}>
              Desactive
            </Badge>
          ) : (
            <Badge style={{ backgroundColor: "#6bd098" }}>Active</Badge>
          ),
      },
      {
        title: "Avatar",
        field: "lienPhoto",
        filtering: false,
        render: (rowData) => (
          <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Col
              md="12"
              xs="12"
              style={{ padding: 0, display: "flex", alignItems: "center" }}
            >
              {rowData.lienPhoto == "" ? (
                <Avatar
                  className="img-circle img-no-padding img-responsive"
                  alt=""
                  src={config.API_URL + "images/asset/defaultPhotoProfil.jpg"}
                />
              ) : (
                <Avatar
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={rowData.lienPhoto}
                />
              )}
            </Col>
          </Row>
        ),
      },
      { title: "Pseudo", field: "pseudo" },
      { title: "Email", field: "email" },
      { title: "Nom", field: "nom" },
      { title: "Prenom", field: "prenom" },
      { title: "Ville", field: "ville" },
    ];
    const data = [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      {
        name: "Zerya Betül",
        surname: "Baran",
        birthYear: 2017,
        birthCity: 34,
      },
    ];

    return (
      <>
        <div className="content">
          <Modal
            isOpen={this.state.modal}
            toggle={() => this.toggle()}
            onClosed={this.state.closeAll ? () => this.toggle() : undefined}
          >
            <ModalHeader
              toggle={() => this.toggle()}
              style={{ borderBottom: 0, fontSize: 15 }}
            >
              {this.state.selectedUser.pseudo}
            </ModalHeader>
            <ModalBody>
              Choisir la duree du bloquage
              <InputGroup>
                <Input
                  placeholder="Nombres de Jours"
                  min={0}
                  max={100}
                  type="number"
                  step="1"
                  value={this.state.numberJours}
                  onChange={(numberJours) => {
                    this.setState({
                      numberJours: numberJours.currentTarget.value,
                    });
                  }}
                />
                <InputGroupAddon addonType="append">Jours</InputGroupAddon>
              </InputGroup>
            </ModalBody>
            <ModalFooter style={{ borderTop: 0 }}>
              <Button color="primary" onClick={() => this.bloquer()}>
                Sauvegarder
              </Button>
              <Button color="secondary" onClick={() => this.toggle()}>
                Annuler
              </Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col md={12} lg={12} xs={12}>
              <MaterialTable
                icons={{
                  Add: AddBox,
                  Check: Check,
                  Clear: Clear,
                  Delete: DeleteOutline,
                  DetailPanel: ChevronRight,
                  Edit: Edit,
                  Export: SaveAlt,
                  Filter: FilterList,
                  FirstPage: FirstPage,
                  LastPage: LastPage,
                  NextPage: ChevronRight,
                  PreviousPage: ChevronLeft,
                  ResetSearch: Clear,
                  Search: Search,
                  SortArrow: ExpandMore,
                  ThirdStateCheck: Remove,
                  ViewColumn: ViewColumn,
                }}
                title="Utilisateurs signales"
                columns={columns}
                data={this.state.users}
                options={{
                  actionsColumnIndex: columns.length,
                  filtering: true,
                  headerStyle: {
                    color: "#51cbce",
                    fontSize: 14,
                    fontWeight: 700,
                  },
                  rowStyle: {
                    color: "#212529",
                    fontSize: 14,
                  },
                }}
                actions={[
                  {
                    icon: () => <Info style={{ color: "#fbc658" }} />,
                    tooltip: "Detail",
                    onClick: (event, rowData) =>
                      this.setState({
                        redirect: true,
                        selectedUserUid: rowData.id,
                      }),
                  },
                  (rowData) => ({
                    icon: (e) => (
                      <Cancel style={!e.disabled ? { color: "#ef8157" } : {}} />
                    ),
                    tooltip: rowData.demandeResignation
                      ? "Desactiver compte"
                      : "",
                    onClick: (event, rowData) => {
                      this.desactiver(rowData);
                    },
                    disabled: !rowData.demandeResignation,
                  }),
                  (rowData) => ({
                    icon: (e) => (
                      <CheckCircle
                        style={!e.disabled ? { color: "#6bd098" } : {}}
                      />
                    ),
                    tooltip: rowData.demandeActivation ? "Activer compte" : "",
                    onClick: (event, rowData) => {
                      this.activer(rowData);
                    },
                    disabled: !rowData.demandeActivation,
                  }),
                  ,
                ]}
                localization={translateTable.tabTranslation}
                style={{
                  paddingTop: 15,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderRadius: 12,
                  boxShadow: "0 6px 10px -4px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#FFFFFF",
                }}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AllUsersDesactive;