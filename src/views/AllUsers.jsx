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
import Add from "@material-ui/icons/Add";
import Check from "@material-ui/icons/Check";
import FilterList from "@material-ui/icons/FilterList";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import LockOpen from "@material-ui/icons/LockOpen";
import Lock from "@material-ui/icons/Lock";
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
  Badge,
  ModalFooter,
  InputGroupAddon,
  InputGroup,
  ModalBody,
  ModalHeader,
  Modal
} from "reactstrap";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Redirect } from 'react-router';
import moment from "moment";
import "moment/locale/fr";
class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoires: [],
      users: [],
      redirect: false,
      selectedUser:{},
      selectedUserUid: "",
      modal:false,
    };
    this.fetchUsers();
    firebase.database().ref("signalUsers").on("value",snapshot=>{
      if(snapshot&&snapshot.val()){
      this.fetchUsers();
      }
    });
     firebase
      .database()
      .ref("newUsers").on("value", snapshot => {
        if (snapshot && snapshot.val()) {
          this.fetchUsers();
        }
      });
  }
  fetchUsers() {
    console.log("asdkjn");
    Axios.get(config.API_URL + "users/admin/getAll").then((res) => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  }
  stateUser(rowData) {
    if (!rowData.isActive) {
      return <Badge>En Attente d'activation</Badge>;
    } else {
      if (
        rowData.dateDebloque &&
        moment(rowData.dateDebloque).diff(moment(new Date())) > 0
      ) {
        return <Badge color="warning">Compte bloque</Badge>;
      } else {
        if (rowData.isDesactive) {
          return <Badge color="danger">Compte desactive</Badge>;
        } else return <Badge color="success">Compte active</Badge>;
      }
    }
  }
  bloquer() {
    Axios.put(
      config.API_URL + "users/bloquer/" + this.state.numberJours,
      this.state.selectedUser
    ).then((res) => {
      this.fetchUsers();
      this.toggle();
      firebase
        .database()
        .ref("signalUsers/" + this.state.selectedUser.id)
        .set({
          stat: "BLOQUE",
          numbe: 100000 + Math.random() * (100000 - 1),
        });
    });
  }
  debloquer() {
    Axios.put(
      config.API_URL + "users/debloquer/",
      this.state.selectedUser
    ).then((res) => {
      this.fetchUsers();
      firebase
        .database()
        .ref("signalUsers/" + this.state.selectedUser.id)
        .set({
          stat: "DEBLOQUE",
          numbe: 100000 + Math.random() * (100000 - 1),
        });
    });
  }
  toggle() {
    this.setState({ modal: !this.state.modal, numberJours: 0 });
  }
  render() {
    const { redirect, selectedUserUid } = this.state;

    if (redirect) {
      return <Redirect to={"/admin/user/" + selectedUserUid} />;
    }
    const columns = [
      // {
      //   title: 'Photo', field: 'lienIllustration', filtering: false,
      //   render: rowData =>
      //     <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
      //       <Col md="12" xs="12" style={{ padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      //         <div className="avatar">
      //           <img
      //             alt="..."
      //             className="img-circle img-no-padding img-responsive"
      //             src={rowData.lienIllustration}
      //           />
      //         </div>
      //       </Col>
      //     </Row>
      // },
      //   render: (rowData) => (
      //     <Core.Badge
      //       anchorOrigin={{
      //         vertical: "bottom",
      //         horizontal: "right",
      //       }}
      //       style={
      //         rowData.nombreVue == 0 ? { color: "rgba(0, 0, 0, 0.26)" } : {}
      //       }
      //       badgeContent={rowData.nombreVue}
      //     >
      //       <Visibility />
      //     </Core.Badge>
      //   ),
      //  },
      {
        title: "Avatar",
        field: "lienPhoto",
        filtering: false,
        sorting: false,
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
      {
        title: "Nombre de dessins",
        field: "nombreDessin",
        type: "numeric",
        render: (rowData) => (
          <Core.Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            style={
              rowData.nombreDessin == 0 ? { color: "rgba(0, 0, 0, 0.26)" } : {}
            }
            badgeContent={rowData.nombreDessin}
          >
            <Brush style={{ alignSelf: "flex-end", display: "flex" }} />
          </Core.Badge>
        ),
      },
      {
        title: "Moyenne Dessin",
        field: "noteDessin",
        type: "numeric",
        render: (rowData) => (
          <div
            style={{
              width: 40,
              height: 40,
              position: "relative",
              marginLeft: "auto",
            }}
          >
            <Core.Tooltip
              disableFocusListener
              disableTouchListener
              style={{ width: 40, height: 40 }}
              title={
                rowData.noteDessin
                  ? parseFloat(
                      Math.round(rowData.noteDessin * 100) / 100
                    ).toFixed(2) + "/5"
                  : 0
              }
            >
              <Core.ButtonBase
                style={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  zIndex: 10,
                  right: 0,
                }}
              ></Core.ButtonBase>
            </Core.Tooltip>
            <CircularProgressbarWithChildren
              maxValue={5}
              minValue={0}
              strokeWidth={3}
              value={parseFloat(
                Math.round(rowData.noteDessin * 100) / 100
              ).toFixed(2)}
              styles={buildStyles({
                textColor: "transparent",
                pathColor: "rgb(239, 129, 87)",
                trailColor: "#d6d6d6",
                strokeLinecap: "butt",
              })}
            >
              <div
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    color: "rgb(239, 129, 87)",
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {parseFloat(
                    Math.round(rowData.noteDessin * 100) / 100
                  ).toFixed(1)}
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        ),
      },
      {
        title: "Nombre de Textes",
        field: "nombreHistoire",
        type: "numeric",
        render: (rowData) => (
          <Core.Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            style={
              rowData.nombreHistoire == 0
                ? { color: "rgba(0, 0, 0, 0.26)" }
                : {}
            }
            badgeContent={rowData.nombreHistoire}
          >
            <Create />
          </Core.Badge>
        ),
      },
      {
        title: "Moyenne Textes",
        field: "noteHistoire",
        type: "numeric",
        render: (rowData) => (
          <div
            style={{
              width: 40,
              height: 40,
              position: "relative",
              marginLeft: "auto",
            }}
          >
            <Core.Tooltip
              disableFocusListener
              disableTouchListener
              style={{ width: 40, height: 40 }}
              title={
                rowData.noteHistoire
                  ? parseFloat(
                      Math.round(rowData.noteHistoire * 100) / 100
                    ).toFixed(2) + "/5"
                  : 0
              }
            >
              <Core.ButtonBase
                style={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  zIndex: 10,
                  right: 0,
                }}
              ></Core.ButtonBase>
            </Core.Tooltip>
            <CircularProgressbarWithChildren
              maxValue={5}
              minValue={0}
              strokeWidth={3}
              value={parseFloat(
                Math.round(rowData.noteHistoire * 100) / 100
              ).toFixed(2)}
              styles={buildStyles({
                textColor: "transparent",
                pathColor: "rgb(81, 203, 206)",
                trailColor: "#d6d6d6",
                strokeLinecap: "butt",
              })}
            >
              <div
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    color: "rgb(81, 203, 206)",
                    fontSize: 15,
                    margin: 0,
                  }}
                >
                  {parseFloat(
                    Math.round(rowData.noteHistoire * 100) / 100
                  ).toFixed(1)}
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        ),
      },
      {
        title: "Nombre d'ami",
        field: "nombreReseau",
        type: "numeric",
        render: (rowData) => (
          <Core.Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            style={
              rowData.nombreReseau == 0 ? { color: "rgba(0, 0, 0, 0.26)" } : {}
            }
            badgeContent={rowData.nombreReseau}
          >
            <People />
          </Core.Badge>
        ),
      },
      {
        title: "Nombre de fois signale",
        field: "nombreSignaler",
        type: "numeric",
        render: (rowData) => (
          <Core.Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            style={
              rowData.nombreSignaler == 0
                ? { color: "rgba(0, 0, 0, 0.26)" }
                : {}
            }
            badgeContent={rowData.nombreSignaler}
          >
            <Report />
          </Core.Badge>
        ),
      },
      {
        title: "status compte",
        render: (rowData) => this.stateUser(rowData),
        sorting: false,
        customFilterAndSearch: (term, rowData) =>
          (!rowData.isActive &&
            "En Attente d'activation"
              .toLowerCase()
              .indexOf(term.toLowerCase()) > -1) ||
          (rowData.isActive &&
            rowData.dateDebloque &&
            moment(rowData.dateDebloque).diff(moment(new Date())) > 0 &&
            "Compte bloque".toLowerCase().indexOf(term.toLowerCase()) > -1) ||
          (rowData.isActive &&
            (!rowData.dateDebloque ||
              (rowData.dateDebloque &&
                moment(rowData.dateDebloque).diff(moment(new Date())) < 0)) &&
            rowData.isDesactive &&
            "Compte desactive".toLowerCase().indexOf(term.toLowerCase()) >
              -1) ||
          (rowData.isActive &&
            (!rowData.dateDebloque ||
              (rowData.dateDebloque &&
                moment(rowData.dateDebloque).diff(moment(new Date())) < 0)) &&
            !rowData.isDesactive &&
            "Compte active".toLowerCase().indexOf(term.toLowerCase()) > -1),
      },
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
                title="Tous les Utilisateurs"
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
                    icon: (e) =>
                      rowData.dateDebloque &&
                      moment(rowData.dateDebloque).diff(moment(new Date())) >
                        0 ? (
                        <LockOpen style={{ color: "#ef8157" }} />
                      ) : (
                        <Lock style={{ color: "#ef8157" }} />
                      ),
                    tooltip:
                      rowData.dateDebloque &&
                      moment(rowData.dateDebloque).diff(moment(new Date())) > 0
                        ? "Debloquer"
                        : "Bloquer",
                    onClick: (event, rowData) => {
                      if (
                        rowData.dateDebloque &&
                        moment(rowData.dateDebloque).diff(moment(new Date())) >
                          0
                      ) {
                        this.setState({ selectedUser: rowData }, () => {
                          this.debloquer();
                        });
                      } else {
                        this.toggle();
                        this.setState({ selectedUser: rowData });
                      }
                    },
                    disabled: rowData.etatHistoire === "Bloqued",
                  }),
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

export default AllUsers;
