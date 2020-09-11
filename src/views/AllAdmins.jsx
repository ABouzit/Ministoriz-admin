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

import CheckCircle from "@material-ui/icons/CheckCircle";
import { Base64 } from "js-base64";
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
  Badge
} from "reactstrap";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Redirect } from 'react-router';
import moment from "moment";
import "moment/locale/fr";
class AllAdmins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoires: [],
      users: [],
      redirect: false,
      selectedUserUid: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
    this.fetchUsers();
    firebase
      .database()
      .ref("bloqueAdmin/").on("value", snapshot => {
        if (snapshot && snapshot.val())
          this.fetchUsers();
      })
  }
  bloquer(ad) {
    let admin=ad;
    admin.isActive=false;
    Axios.put(config.API_URL+"admins",admin).then(()=>this.fetchUsers()).then(()=>{
      firebase
        .database()
        .ref("bloqueAdmin/" + ad.id)
        .set({
          stat: "BLOQUE",
          numbe: 100000 + Math.random() * (100000 - 1),
        });
    });
  }
  debloquer(ad) {
    let admin = ad;
    admin.isActive = true;
    Axios.put(config.API_URL + "admins", admin).then(() => this.fetchUsers()).then(() => {
      firebase
        .database()
        .ref("bloqueAdmin/" + ad.id)
        .set({
          stat: "DEBLOQUE",
          numbe: 100000 + Math.random() * (100000 - 1),
        });
    });;
  }
  fetchUsers() {
    console.log("asdkjn");
    Axios.get(config.API_URL + "admins/admin/getAll").then((res) => {
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
  addAdmin(email, pseudo) {
    const _this = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var generator = require("generate-password");

    var password = generator.generate({
      length: 10,
      numbers: true,
    });

    var epassword = Base64.encode(password);
    return Axios.post(config.API_URL + "admins/signup", {
      pseudo: pseudo,
      email: email,
      hashedMotDePasse: epassword,
      motDePasse: password,
    }).then((res) => {
      if (res.data == "exist") {
        alert("email exist");
        return res;
      } else {
        this.fetchUsers();
        return res;
      }
    });
  }
  render() {
    const { redirect, selectedUserUid } = this.state;

    if (redirect) {
      return <Redirect to={"/admin/user/" + selectedUserUid} />;
    }
    const columns = [
      { title: "Pseudo", field: "pseudo" },
      { title: "Email", field: "email" },
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
          <Row>
            <Col md={12} lg={12} xs={12}>
              <MaterialTable
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        this.addAdmin(newData.email, newData.pseudo);
                        resolve();
                      }, 1000);
                    }),
                }}
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
                title="Tous les Administrateur"
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
                  (rowData) => ({
                    icon: (e) => (
                      <Block style={!e.disabled ? { color: "#ef8157" } : {}} />
                    ),
                    tooltip: "Bloquer",
                    onClick: (event, rowData) =>
                      this.bloquer(rowData),
                   disabled: !rowData.isActive||rowData.id===this.state.user.id,
                  }),
                  (rowData) => ({
                    icon: (e) => (
                      <CheckCircle
                        style={!e.disabled ? { color: "#6bd098" } : {}}
                      />
                    ),
                    tooltip: "Valider",
                    onClick: (event, rowData) =>
                      this.debloquer(rowData),
                    disabled:
                      rowData.isActive || rowData.id === this.state.user.id
                      
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

export default AllAdmins;
