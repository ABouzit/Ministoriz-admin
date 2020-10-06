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
// import  tabTranslation from "config/translateTable"
import Info from '@material-ui/icons/Info';
import CheckCircle from '@material-ui/icons/CheckCircle';
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
import Edit from "@material-ui/icons/Edit";
import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Container,
  Badge
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import Axios from "axios";
import config from "config/config";
import MaterialTable from "material-table";
import { Avatar, ButtonBase } from "@material-ui/core";
import translateTable from "config/translateTable";
import { Redirect } from 'react-router';

class AllStorizDemandeSuppression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoires: [],
      redirect: false,
      selectedHistoireUid: "",
    };
    this.fetchUsers();
    firebase
      .database()
      .ref("deleteStoriz")
      .on("value", (snapshot) => {
        console.log(snapshot);
        if (snapshot && snapshot.val()) {
        this.fetchUsers();
        }
      });
  }
  fetchUsers() {
    console.log("asdkjn");
    Axios.get(config.API_URL + "histoires/demandeSuppression/true").then((res) => {
      console.log(res.data);
      this.setState({ histoires: res.data });
    });
  }
  sorting(a, b) {
    if (!a) return 1;
    else if (!b) return -1;
    else return a.pseudo.toLowerCase().localeCompare(b.pseudo.toLowerCase());
  }
  deleteHistoire(rowData){
    Axios.delete(
    config.API_URL +
      "impressions/histoire/" +
     rowData.id
  )
    .then(res => {
      this.fetchUsers();
      if (
        !rowData.userText ||
        !rowData.userDessin ||
        rowData.userText.id === rowData.userDessin.id
      ) {
        if (!rowData.userText) {
          firebase
            .database()
            .ref("deleteStoriz/" +rowData.id+"/"+ rowData.userDessin.id)
            .set({
              numbe: 100000 + Math.random() * (100000 - 1),
            });
        } else if (!rowData.userDessin) {
                 firebase
                   .database()
                   .ref(
                     "deleteStoriz/" + rowData.id + "/" + rowData.userText.id
                   )
                   .set({
                     numbe: 100000 + Math.random() * (100000 - 1),
                   });
               } else if (rowData.userDessin.id === rowData.userDessin.id) {
                        firebase
                          .database()
                          .ref(
                            "deleteStoriz/" +
                              rowData.id +
                              "/" +
                              rowData.userText.id
                          )
                          .set({
                            numbe: 100000 + Math.random() * (100000 - 1),
                          });
                      }
      } else {
        {
          firebase
            .database()
            .ref("deleteStoriz/" + rowData.id + "/" + rowData.userDessin.id)
            .set({
              numbe: 100000 + Math.random() * (100000 - 1),
            });
          firebase
            .database()
            .ref("deleteStoriz/" + rowData.id + "/" + rowData.userText.id)
            .set({
              numbe: 100000 + Math.random() * (100000 - 1),
            });
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  render() {
    const { redirect, selectedHistoireUid } = this.state;

    if (redirect) {
      return <Redirect to={"/admin/storie/" + selectedHistoireUid} />;
    }
    const columns = [
      {
        title: "Photo",
        field: "lienIllustration",
        filtering: false,
        sorting: false,
        render: (rowData) => (
          <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Col
              md="12"
              xs="12"
              style={{
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="avatar">
                <img
                  alt="..."
                  className="img-circle img-no-padding img-responsive"
                  src={rowData.lienIllustration}
                />
              </div>
            </Col>
          </Row>
        ),
      },
      {
        title: "Date de Creation",
        field: "dateDeCreation",
        type: "datetime",
      },
      { title: "Titre", field: "titreHistoire" },
      {
        title: "Utilisateur Dessin",
        field: "userDessin",
        customFilterAndSearch: (term, rowData) =>
          (rowData.userDessin &&
            rowData.userDessin.pseudo
              .toLowerCase()
              .indexOf(term.toLowerCase()) > -1) ||
          ("Textes uniquement".toLowerCase().indexOf(term.toLowerCase()) > -1 &&
            !rowData.userDessin),
        customSort: (a, b) => this.sorting(a.userDessin, b.userDessin),
        render: (rowData) => {
          if (rowData.userDessin) {
            return (
              <ButtonBase
                onClick={() =>
                  this.props.history.push(
                    "/admin/user/" + rowData.userDessin.id
                  )
                }
                style={{ outline: "none", width: "100%" }}
              >
                <Row
                  style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}
                >
                  <Col
                    md="4"
                    xs="4"
                    style={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {rowData.userDessin.lienPhoto == "" ? (
                      <Avatar
                        className="img-circle img-no-padding img-responsive"
                        alt=""
                        src={
                          config.API_URL + "images/asset/defaultPhotoProfil.jpg"
                        }
                      />
                    ) : (
                      <Avatar
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={rowData.userDessin.lienPhoto}
                      />
                    )}
                  </Col>
                  <Col
                    md="8"
                    xs="8"
                    style={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ margin: 0 }}>{rowData.userDessin.pseudo}</p>
                  </Col>
                </Row>
              </ButtonBase>
            );
          } else {
            return (
              <Badge style={{ backgroundColor: "rgb(81, 203, 206)" }}>
                Textes uniquement
              </Badge>
            );
          }
        },
      },
      {
        title: "Utilisateur Text",
        field: "userText",
        customFilterAndSearch: (term, rowData) =>
          (rowData.userText &&
            rowData.userText.pseudo.toLowerCase().indexOf(term.toLowerCase()) >
              -1) ||
          ("Dessins uniquement".toLowerCase().indexOf(term.toLowerCase()) >
            -1 &&
            !rowData.userText),
        customSort: (a, b) => this.sorting(a.userText, b.userText),
        render: (rowData) => {
          if (rowData.userText) {
            return (
              <ButtonBase
                onClick={() =>
                  this.props.history.push("/admin/user/" + rowData.userText.id)
                }
                style={{ outline: "none", width: "100%" }}
              >
                <Row
                  style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}
                >
                  <Col
                    md="4"
                    xs="4"
                    style={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {rowData.userText.lienPhoto == "" ? (
                      <Avatar
                        className="img-circle img-no-padding img-responsive"
                        alt=""
                        src={
                          config.API_URL + "images/asset/defaultPhotoProfil.jpg"
                        }
                      />
                    ) : (
                      <Avatar
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={rowData.userText.lienPhoto}
                      />
                    )}
                  </Col>

                  <Col
                    md="8"
                    xs="8"
                    style={{
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ margin: 0 }}>{rowData.userText.pseudo}</p>
                  </Col>
                </Row>
              </ButtonBase>
            );
          } else {
            return (
              <Badge style={{ backgroundColor: "#EF8157" }}>
                Dessins uniquement
              </Badge>
            );
          }
        },
      },
      {
        title: "Etat",
        field: "etatHistoire",
        filtering: false,
        render: (rowData) => (
          <Row>
            <Col md={12} sm={12} lg={12}>
              {rowData.etatHistoire === "EN_ATTANTE" ? (
                <Badge color="secondary">EN_ATTENTE</Badge>
              ) : rowData.etatHistoire === "EN_ATTANTE_USER" ? (
                  <Badge color="warning">EN_ATTANTE_USER"</Badge>
              ): rowData.etatHistoire === "VALIDE" ? (
                <Badge color="success">VALIDE</Badge>
                  ) : rowData.etatHistoire === "EN_ATTANTE_UPDATE" ? (
                    <Badge color="primary">EN_ATTANTE_UPDATE</Badge>
                  ) : (
                <Badge color="danger">ARCHIVE</Badge>
              )}
            </Col>
          </Row>
        ),
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
                title="Suppression Histoires"
                columns={columns}
                data={this.state.histoires}
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
                  filterCellStyle: {
                    color: "secondary",
                  },
                  //paginationType:"steped"
                  // doubleHorizontalScroll:true
                }}
                actions={[
                  {
                    icon: () => <Info style={{ color: "#fbc658" }} />,
                    tooltip: "Detail",
                    onClick: (event, rowData) =>
                      this.setState({
                        redirect: true,
                        selectedHistoireUid: rowData.id,
                      }),
                  },
                  (rowData) => ({
                    icon: (e) => (
                      <DeleteOutline
                        style={!e.disabled ? { color: "#ef8157" } : {}}
                      />
                    ),
                    tooltip: "Supprimer",
                    onClick: (event, rowData) => this.deleteHistoire(rowData),
                  }),
                ]}
                localization={translateTable.tabTranslation}
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
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

export default AllStorizDemandeSuppression;
