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
import moment from "moment";
import "moment/locale/fr";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import React from "react";
import { isMobile } from "react-device-detect";
import Parallax from "components/Parallax/Parallax.js";
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
  UncontrolledTooltip
} from "reactstrap";

import Slider from "react-slick";
import * as Core from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FiberManualRecordIconOutlined from "@material-ui/icons/FiberManualRecordOutlined";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import Axios from "axios";
import config from "config/config";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import translateTable from "config/translateTable";
import MaterialTable from "material-table";
import Info from "@material-ui/icons/Info";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Remove from "@material-ui/icons/Remove";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import Save from "@material-ui/icons/Save";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Visibility from "@material-ui/icons/Visibility";
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
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import * as firebase from "firebase/app";
import "firebase/database";
class StoriDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoire: {},
      planches: [],
      commentaires: [],
      index: 0,
      imgUrl: "",
      isOpen: false,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.setState({index:this.state.index+1},()=>this.forceUpdate())
  }
  previous() {
     this.setState({index:this.state.index-1},()=>this.forceUpdate())
  }
  componentWillMount() {
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      Axios.get(config.API_URL + "histoires/byId/" + id).then((histoire) => {
        console.log(JSON.stringify(histoire));
        this.setState({ histoire: histoire.data[0] }, () => {
          Axios.get(config.API_URL + "planches/histoire/" + id).then(
            (planches) => {
              this.setState({ planches: planches.data });
            }
          );
        });
      });
      Axios.get(config.API_URL + "impressions/histoire/"+id).then((res)=>{
        this.setState({commentaires:res.data});
      });
      firebase
        .database()
        .ref("deleteStoriz/" + this.props.match.params.id)
        .on("value", (snapshot) => {
          console.log(snapshot);
          if (snapshot && snapshot.val()) {
            Axios.get(config.API_URL + "histoires/byId/" + id).then((histoire) => {
               this.setState({ histoire: histoire.data[0] });
          }).catch((res)=>this.props.history.push("/admin/dashboard"));
        }
      });
      firebase
        .database()
        .ref("comments/" + this.props.match.params.id)
        .on("value", (snapshot) => {
          console.log(snapshot);
          if (snapshot && snapshot.val()) {
            Axios.get(config.API_URL + "impressions/histoire/" + id).then(
              (res) => {
                this.setState({ commentaires: res.data });
              }
            );
          }
        }); 
    }
    
  }
  render() {
     const columns = [
     {
       title: "Utilisateur",
       field: "user",
       customFilterAndSearch: (term, rowData) =>
         rowData.user.pseudo.toLowerCase().indexOf(term.toLowerCase()) > -1,
       customSort: (a, b) => a.user.pseudo.toLowerCase().localeCompare(b.user.pseudo.toLowerCase()),
       render: (rowData) => {
         if (rowData.user) {
           return (
             <Core.ButtonBase
               onClick={() =>
                 this.props.history.push("/admin/user/" + rowData.user.id)
               }
               style={{ outline: "none",width:"100%" }}
             >
               <Row style={{ paddingLeft: 0, paddingRight: 0 ,width:"100%"}}>
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
                   {rowData.user.lienPhoto == "" ? (
                     <Core.Avatar
                       className="img-circle img-no-padding img-responsive"
                       alt=""
                       src={
                         config.API_URL + "images/asset/defaultPhotoProfil.jpg"
                       }
                     />
                   ) : (
                     <Core.Avatar
                       alt="..."
                       className="img-circle img-no-padding img-responsive"
                       src={rowData.user.lienPhoto}
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
                   <p style={{ margin: 0 }}>{rowData.user.pseudo}</p>
                 </Col>
               </Row>
             </Core.ButtonBase>
           );
         }
       },
     },
     { title: "Text commentaire", field: "commentaire",render:(rowData,key)=>{
       return (
         <div>
           <p
             style={{
               maxHeight: 60,
               color: "rgb(81, 203, 206)",
               marginBottom: 0,
               display: "-webkit-box",
               overflow: "hidden",
               textOverflow: "ellipsis",
               WebkitLineClamp: 3,
               WebkitBoxOrient: "vertical",
             }}
             href="#"
             id={
               "UncontrolledTooltipExample" +
               rowData.id.charAt(9) +
               rowData.id.charAt(2) +
               rowData.id.charAt(6)
             }
           >
             {rowData.commentaire}
           </p>
           <UncontrolledTooltip
             placement="left"
             target={
               "UncontrolledTooltipExample" +
               rowData.id.charAt(9) +
               rowData.id.charAt(2) +
               rowData.id.charAt(6)
             }
           >
             {rowData.commentaire}
           </UncontrolledTooltip>
         </div>
       );
     } },
     {
       title: "Note du Dessin",
       field: "noteDessin",
       type: "numeric",
       render: (rowData) => {
         if (rowData.user) {return(<div
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
           </div>);
         }
     },
    },
     {
       title: "Note du Text",
       field: "noteHistoire",
       type: "numeric",
       render: (rowData) => {
         if (rowData.user) {return(
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
         );}
     },
     },
     {
       title: "Date de Creation",
       field: "dateDeCreation",
       type: "datetime",
     },
    
    
   ];
    return (
      <>
        <div className="content">
          {this.state.isOpen ? (
            <Lightbox
              mainSrc={this.state.imgUrl}
              onCloseRequest={() =>
                this.setState({ isOpen: false, imgUrl: "" })
              }
              reactModalStyle={{
                overlay: { zIndex: 2000 },
              }}
            />
          ) : (
            <div></div>
          )}
          <Row style={{}}>
            <Col
              md="4"
              sm="12"
              style={!isMobile ? { flex: 1, display: "flex" } : {}}
            >
              <Card className="card-user">
                <div className="image">
                  <Core.ButtonBase
                    onClick={() =>
                      this.setState({
                        isOpen: true,
                        imgUrl: this.state.planches[this.state.index]
                          .lienDessin,
                      })
                    }
                    style={{
                      outline: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <img
                      alt="..."
                      src={
                        !this.state.histoire.lienIllustration ||
                        this.state.histoire.lienIllustration == ""
                          ? config.API_URL + "images/asset/bg1.jpg"
                          : this.state.histoire.lienIllustration
                      }
                    />
                  </Core.ButtonBase>
                </div>
                <CardBody style={{ display: "flex", flexDirection: "column" }}>
                  <div className="author" style={{ marginTop: 0 }}>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <h5 className="title">
                        {this.state.histoire.titreHistoire}
                      </h5>
                    </a>
                    <p className="description">
                      {"Cree le " +
                        moment(this.state.histoire.dateDeCreation)
                          .format("DD/MM/YYYY à HH:mm:ss")
                          .toString()}
                    </p>
                  </div>
                  <Core.Divider style={{ marginTop: "4%" }} />
                  {this.state.histoire.userText ? (
                    <Row style={{ flex: 1 }}>
                      <Col
                        className="ml-auto"
                        lg="5"
                        md="5"
                        xs="5"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Row>
                          <Col
                            className="ml-auto"
                            lg="4"
                            md="4"
                            xs="4"
                            style={{ textAlign: "center" }}
                          >
                            <CreateIcon
                              style={{
                                width: 20,
                                color: "black",
                              }}
                            />
                          </Col>
                          <Col
                            className="ml-auto"
                            lg="8"
                            md="8"
                            xs="8"
                            style={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            Histoires
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        className="ml-auto"
                        lg="4"
                        md="4"
                        xs="4"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Core.ButtonBase
                          onClick={() =>
                            this.props.history.push(
                              "/admin/user/" + this.state.histoire.userText.id
                            )
                          }
                          style={{ outline: "none", width: "100%" }}
                        >
                          <Row
                            style={{
                              paddingLeft: 0,
                              paddingRight: 0,
                              width: "100%",
                            }}
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
                              {this.state.histoire.userText.lienPhoto == "" ? (
                                <Core.Avatar
                                  className="img-circle img-no-padding img-responsive"
                                  alt=""
                                  src={
                                    config.API_URL +
                                    "images/asset/defaultPhotoProfil.jpg"
                                  }
                                />
                              ) : (
                                <Core.Avatar
                                  alt="..."
                                  className="img-circle img-no-padding img-responsive"
                                  src={this.state.histoire.userText.lienPhoto}
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
                              <p style={{ margin: 0 }}>
                                {this.state.histoire.userText.pseudo}
                              </p>
                            </Col>
                          </Row>
                        </Core.ButtonBase>
                      </Col>
                      <Col
                        className="ml-auto"
                        lg="3"
                        md="3"
                        xs="3"
                        style={{ textAlign: "center" }}
                      >
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
                              this.state.histoire.noteHistoireMoy
                                ? parseFloat(
                                    Math.round(
                                      this.state.histoire.noteHistoireMoy * 100
                                    ) / 100
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
                              Math.round(
                                this.state.histoire.noteHistoireMoy * 100
                              ) / 100
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
                                  Math.round(
                                    this.state.histoire.noteHistoireMoy * 100
                                  ) / 100
                                ).toFixed(1)}
                              </p>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ flex: 1 }}>
                      <Col
                        md={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Badge color="danger" style={{ height: 15 }}>
                          Dessins uniquement
                        </Badge>
                      </Col>
                    </Row>
                  )}
                  <Core.Divider style={{ marginTop: "4%" }} />
                  {this.state.histoire.userDessin ? (
                    <Row style={{ flex: 1 }}>
                      <Col
                        className="ml-auto"
                        lg="5"
                        md="5"
                        xs="5"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Row>
                          <Col
                            className="ml-auto"
                            lg="4"
                            md="4"
                            xs="4"
                            style={{ textAlign: "center" }}
                          >
                            <BrushIcon
                              style={{
                                width: 20,
                                color: "black",
                              }}
                            />
                          </Col>
                          <Col
                            className="ml-auto"
                            lg="8"
                            md="8"
                            xs="8"
                            style={{
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            Dessins
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        className="ml-auto"
                        lg="4"
                        md="4"
                        xs="4"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Core.ButtonBase
                          onClick={() =>
                            this.props.history.push(
                              "/admin/user/" + this.state.histoire.userDessin.id
                            )
                          }
                          style={{ outline: "none", width: "100%" }}
                        >
                          <Row
                            style={{
                              paddingLeft: 10,
                              paddingRight: 10,
                              width: "100%",
                            }}
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
                              {this.state.histoire.userDessin.lienPhoto ==
                              "" ? (
                                <Core.Avatar
                                  className="img-circle img-no-padding img-responsive"
                                  alt=""
                                  src={
                                    config.API_URL +
                                    "images/asset/defaultPhotoProfil.jpg"
                                  }
                                />
                              ) : (
                                <Core.Avatar
                                  alt="..."
                                  className="img-circle img-no-padding img-responsive"
                                  src={this.state.histoire.userDessin.lienPhoto}
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
                              <p style={{ margin: 0 }}>
                                {this.state.histoire.userDessin.pseudo}
                              </p>
                            </Col>
                          </Row>
                        </Core.ButtonBase>
                      </Col>
                      <Col
                        className="ml-auto"
                        lg="3"
                        md="3"
                        xs="3"
                        style={{ textAlign: "center" }}
                      >
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
                              this.state.histoire.noteDessinMoy
                                ? parseFloat(
                                    Math.round(
                                      this.state.histoire.noteDessinMoy * 100
                                    ) / 100
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
                              Math.round(this.state.histoire.noteDessin * 100) /
                                100
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
                                  Math.round(
                                    this.state.histoire.noteDessinMoy * 100
                                  ) / 100
                                ).toFixed(1)}
                              </p>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </Col>
                    </Row>
                  ) : (
                    <Row style={{ flex: 1 }}>
                      <Col
                        md={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Badge color="primary" style={{ height: 15 }}>
                          Texts uniquement
                        </Badge>
                      </Col>
                    </Row>
                  )}
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          {this.state.histoire.nombreVue} <br />
                          <small>Vues</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          {this.state.histoire.nombreComment} <br />
                          <small>comments</small>
                        </h5>
                      </Col>
                      <Col
                        className="mr-auto"
                        lg="3"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Row>
                          <Col md={12} sm={12} lg={12}>
                            {this.state.histoire.etatHistoire ===
                            "EN_ATTANTE" ? (
                              <Badge color="secondary">EN_ATTENTE</Badge>
                            ) : this.state.histoire.etatHistoire ===
                              "VALIDE" ? (
                              <Badge color="success">VALIDE</Badge>
                            ) : (
                              <Badge color="danger">ARCHIVE</Badge>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8" sm="12" style={!isMobile ? { flex: 1 } : {}}>
              <Card
                className="card-user"
                style={{ height: "calc( 100% - 20px)" }}
              >
                <CardBody
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ position: "relative", width: "100%" }}>
                    <SampleNextArrow
                      onClick={() => this.next()}
                      style={Styles.NextArrow}
                      Color={
                        this.state.index === this.state.planches.length - 1
                          ? "rgba(0, 0, 0, 0.26)"
                          : "#332861"
                      }
                      disabled={
                        this.state.index === this.state.planches.length - 1
                          ? true
                          : false
                      }
                    />

                    {this.state.planches.length > 0 ? (
                      <div>
                        {this.state.planches[this.state.index].text === "" ? (
                          <Row
                            style={{
                              margin: 0,
                              marginBottom: 30,
                              marginTop: 20,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              style={
                                isMobile
                                  ? {
                                      height: 400,
                                      borderRadius: "15px 15px 15px 15px",
                                      padding: 0,
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }
                                  : {
                                      height: 400,
                                      borderRadius: "15px 15px 15px 15px",
                                      padding: 0,
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }
                              }
                            >
                              <div
                                style={
                                  isMobile
                                    ? {
                                        textAlign: "-webkit-center",
                                        background: "#5a517f",
                                        borderRadius: "15px 15px 15px 15px",
                                        height: "100%",
                                        width: "100%",
                                      }
                                    : {
                                        textAlign: "-webkit-center",
                                        background: "#2f99b1",
                                        borderRadius: "15px 15px 15px 15px",
                                        height: "100%",
                                        width: "100%",
                                      }
                                }
                              >
                                <Core.ButtonBase
                                  onClick={() =>
                                    this.setState({
                                      isOpen: true,
                                      imgUrl: this.state.planches[
                                        this.state.index
                                      ].lienDessin,
                                    })
                                  }
                                  style={{
                                    outline: "none",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <Parallax
                                    image={
                                      this.state.planches[this.state.index]
                                        .lienDessin
                                    }
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            borderRadius: "15px 15px 15px 15px",
                                            display: "block",
                                            width: "100%",
                                          }
                                        : {
                                            height: 400,

                                            display: "block",
                                            width: "70%",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                          }
                                    }
                                  ></Parallax>
                                </Core.ButtonBase>
                              </div>
                            </Col>
                          </Row>
                        ) : this.state.planches[this.state.index].lienDessin ===
                            null ||
                          this.state.planches[this.state.index].lienDessin ===
                            "" ? (
                          <Row
                            style={
                              isMobile
                                ? {
                                    width: "100%",
                                    margin: 0,
                                    marginBottom: 30,
                                    marginTop: 20,
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                  }
                                : {
                                    width: "100%",
                                    margin: 0,
                                    marginBottom: 30,
                                    marginTop: 20,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                  }
                            }
                          >
                            <Col
                              xs={12}
                              sm={12}
                              md={12}
                              style={
                                isMobile
                                  ? {
                                      height: 400,
                                      backgroundColor: "#fcd77f",
                                      borderRadius: "15px 15px 15px 15px",
                                      borderRadiusTopLeft: 15,
                                      padding: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }
                                  : {
                                      height: 400,
                                      backgroundColor: "#fcd77f",
                                      borderRadius: "15px 15px 15px 15px",
                                      borderRadiusTopLeft: 15,
                                      padding: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }
                              }
                            >
                              {" "}
                              <SimpleBar
                                style={
                                  isMobile
                                    ? {
                                        maxHeight: "350px",
                                        width: "100%",
                                      }
                                    : {
                                        maxHeight: "350px",
                                        width: "70%",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                      }
                                }
                              >
                                <h5
                                  style={{
                                    color: "#332861",
                                    width: "100%",
                                    maxHeight: "350px",
                                    margin: "0px",
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    fontSize: "17px",
                                  }}
                                >
                                  {this.state.planches[this.state.index].text}
                                </h5>
                              </SimpleBar>
                            </Col>
                          </Row>
                        ) : (
                          <Row
                            style={{
                              margin: 0,
                              marginBottom: 30,
                              marginTop: 20,
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Col
                              xs={12}
                              sm={12}
                              md={6}
                              style={
                                isMobile
                                  ? {
                                      height: 400,
                                      borderRadius: "15px 15px 0px 0px",
                                      padding: 0,
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }
                                  : {
                                      height: 400,
                                      borderRadius: "15px 0px 0px 15px",
                                      padding: 0,
                                      alignItems: "center",
                                      display: "flex",
                                      justifyContent: "center",
                                    }
                              }
                            >
                              <div
                                style={
                                  isMobile
                                    ? {
                                        textAlign: "-webkit-center",
                                        background: "#2f99b1",
                                        borderRadius: "15px 15px 0px 0px",
                                        height: "100%",
                                        width: "100%",
                                      }
                                    : {
                                        textAlign: "-webkit-center",
                                        background: "#2f99b1",
                                        borderRadius: "15px 0px 0px 15px",
                                        height: "100%",
                                        width: "100%",
                                      }
                                }
                              >
                                <Core.ButtonBase
                                  onClick={() =>
                                    this.setState({
                                      isOpen: true,
                                      imgUrl: this.state.planches[
                                        this.state.index
                                      ].lienDessin,
                                    })
                                  }
                                  style={{
                                    outline: "none",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <Parallax
                                    image={
                                      this.state.planches[this.state.index]
                                        .lienDessin
                                    }
                                    style={
                                      isMobile
                                        ? {
                                            height: 400,
                                            borderRadius: "15px 15px 0px 0px",
                                            display: "block",
                                            width: "100%",
                                          }
                                        : {
                                            height: 400,
                                            borderRadius: "15px 0px 0px 15px",
                                            display: "block",
                                            width: "100%",
                                          }
                                    }
                                  ></Parallax>
                                </Core.ButtonBase>
                              </div>
                            </Col>

                            <Col
                              xs={12}
                              sm={12}
                              md={6}
                              style={
                                isMobile
                                  ? {
                                      height: 400,
                                      backgroundColor: "#fcd77f",
                                      borderRadius: "0px 0px 15px 15px",
                                      borderRadiusTopLeft: 15,
                                      padding: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }
                                  : {
                                      height: 400,
                                      backgroundColor: "#fcd77f",
                                      borderRadius: "0px 15px 15px 0px",
                                      borderRadiusTopLeft: 15,
                                      padding: 0,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }
                              }
                            >
                              <div
                                style={{
                                  width: "100%",
                                }}
                              >
                                <SimpleBar
                                  style={
                                    isMobile
                                      ? {
                                          maxHeight: "350px",
                                          width: "100%",
                                        }
                                      : {
                                          maxHeight: "350px",
                                          width: "100%",
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                        }
                                  }
                                >
                                  <h5
                                    style={{
                                      color: "#332861",
                                      width: "100%",
                                      maxHeight: "350px",
                                      margin: "0px",
                                      paddingLeft: "30px",
                                      paddingRight: "30px",
                                      fontSize: "17px",
                                    }}
                                  >
                                    {this.state.planches[this.state.index].text}
                                  </h5>
                                </SimpleBar>
                              </div>
                            </Col>
                          </Row>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <SamplePrevArrow
                      onClick={() => this.previous()}
                      Color={
                        this.state.index === 0
                          ? "rgba(0, 0, 0, 0.26)"
                          : "#332861"
                      }
                      disabled={this.state.index === 0 ? true : false}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
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
                title={"Commentaires de " + this.state.histoire.titreHistoire}
                columns={columns}
                data={this.state.commentaires}
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
                  (rowData) => ({
                    icon: (e) => (
                      <DeleteOutline
                        style={!e.disabled ? { color: "#ef8157" } : {}}
                      />
                    ),
                    tooltip: "Supprimer",
                    onClick: (event, rowData) => this.deleteComment(rowData.id),
                    disabled: rowData.etatHistoire === "ARCHIVE",
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
function SampleNextArrow(props) {
  const { className, style, onClick, disabled, Color } = props;
  return (
    <Core.IconButton
      aria-label="delete"
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "47%",
        right: "-25px",
        zIndex: 100,
        padding: 0,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={className} style={{ height: "50px", width: "50px" }}>
        <ArrowRightOutlined
          color="green"
          style={{ color: Color, fontSize: "50px" }}
        />
      </div>
    </Core.IconButton>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick, disabled, Color } = props;
  return (
    <Core.IconButton
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "47%",
        zIndex: 100,
        left: "-25px",
        padding: 0,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={className} style={{ height: "50px", width: "50px" }}>
        <ArrowLeftOutlined style={{ fontSize: "50px", color: Color }} />
      </div>
    </Core.IconButton>
  );
}
const Styles = {};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Core.Slide direction="down" ref={ref} {...props} />;
});
export default StoriDetail;
