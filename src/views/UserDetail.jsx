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
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Info from "@material-ui/icons/Info";
import CheckCircle from "@material-ui/icons/CheckCircle";
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
import RoomIcon from "@material-ui/icons/Room";
import CreateIcon from "@material-ui/icons/Create";
import BrushIcon from "@material-ui/icons/Brush";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
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
import config from "config/config";
import Axios from "axios";
import { Divider } from "@material-ui/core";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import * as Core from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";
import translateTable from "config/translateTable";
import MaterialTable from "material-table";
import { Avatar } from "@material-ui/core";
import { Redirect } from "react-router";
import * as firebase from "firebase/app";
import "firebase/database";
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      ancientId:"",
      relations: [],
      histoires: [],
      comments: [],
      redirect: false,
      selectedHistoireUid: "",
      imgUrl: "",
      isOpen: false,
    };
     this.reseau = React.createRef();
     
  }
   EditHistoire(histoire,etat){
    var hist=histoire;
    let string=""
    if((!hist.userText||!hist.userDessin)||hist.userDessin.id==hist.userText.id){
      if(!hist.userDessin){
        string = "null/" + hist.userText.id;
      }
      else if(!hist.userText){
        string = hist.userDessin.id+"/null";
      }
      else if(hist.userDessin.id==hist.userText.id){
        string =hist.userDessin.id +"/null";
      }
    }
    else{
      string = hist.userDessin.id + "/" + hist.userText.id;
    }
    hist.etatHistoire=etat;
      Axios.put(config.API_URL + "histoires/admin/"+string, hist).then(res => {
        Axios.get(
          config.API_URL +
            "histoires/admin/getStorizByUser/" +
            this.state.user.id
        ).then((res) => {
          this.setState({ histoires: res.data },()=>this.forceUpdate());
        });
      }).then(()=>{
         
        if((!hist.userDessin||!hist.userText)||hist.userDessin.id===hist.userText.id){
          if(!hist.userDessin){
            firebase
           .database()
           .ref("newStoriz/"+hist.userText.id)
           .set({
             numbe: 100000 + Math.random() * (100000 - 1),
           });
           firebase
             .database()
             .ref("notifications/" + hist.userText.id)
             .set({
               from: "admin",
               numbe: 100000 + Math.random() * (100000 - 1),
               to: hist.userText.id,
             });
          }
          else if(!hist.userText){
            firebase
           .database()
           .ref("newStoriz/"+hist.userDessin.id)
           .set({
             numbe: 100000 + Math.random() * (100000 - 1),
           });
           firebase
             .database()
             .ref("notifications/" + hist.userDessin.id)
             .set({
               from: "admin",
               numbe: 100000 + Math.random() * (100000 - 1),
               to: hist.userDessin.id,
             });
          }
          else if(hist.userDessin.id===hist.userText.id){
            firebase
              .database()
              .ref("newStoriz/" + hist.userDessin.id)
              .set({
                numbe: 100000 + Math.random() * (100000 - 1),
              });
              firebase
                .database()
                .ref("notifications/" + hist.userDessin.id)
                .set({
                  from: "admin",
                  numbe: 100000 + Math.random() * (100000 - 1),
                  to: hist.userDessin.id,
                });
          }
        }
        else{
            firebase
            .database()
            .ref("newStoriz/" + hist.userDessin.id)
            .set({
              numbe: 100000 + Math.random() * (100000 - 1),
            });
            firebase
              .database()
              .ref("notifications/" + hist.userDessin.id)
              .set({
                from: "admin",
                numbe: 100000 + Math.random() * (100000 - 1),
                to: hist.userDessin.id,
              });
            firebase
              .database()
              .ref("newStoriz/" + hist.userText.id)
              .set({
                numbe: 100000 + Math.random() * (100000 - 1),
              });
              firebase
                .database()
                .ref("notifications/" + hist.userText.id)
                .set({
                  from: "admin",
                  numbe: 100000 + Math.random() * (100000 - 1),
                  to: hist.userText.id,
                });
        };
      });
  }
   componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.id !== this.props.match.params.id
    ) {
       Axios.get(
     config.API_URL + "users/admin/getById/" + nextProps.match.params.id
   ).then((res) => {
     this.setState(
       {
         user: res.data[0],
         ancientId:res.data[0].id
       }
     );
   });
   Axios.get(config.API_URL + "relations/admin/relationOfUser/"+nextProps.match.params.id).then(res=>{
     this.setState({ relations: res.data });
   });
 Axios.get(config.API_URL + "impressions/admin/user/"+nextProps.match.params.id).then(res=>{
     this.setState({ comments: res.data }, () => {
       
     });
   });
Axios.get(
  config.API_URL + "histoires/admin/getStorizByUser/" + nextProps.match.params.id
).then((res) => {
  this.setState({ histoires: res.data });
});
  }
    }
  componentWillMount(){
    if(this.props.match.params.id){
   Axios.get(
     config.API_URL + "users/admin/getById/" + this.props.match.params.id
   ).then((res) => {
     this.setState(
       {
         user: res.data[0],
         ancientId:res.data[0].id,
       }
     );
   });
   Axios.get(config.API_URL + "relations/admin/relationOfUser/"+this.props.match.params.id).then(res=>{
     this.setState({relations:res.data});
   },()=>{});
   Axios.get(
     config.API_URL + "impressions/admin/user/" + this.props.match.params.id
   ).then((res) => {
     this.setState({ comments: res.data });
   });
  Axios.get(
    config.API_URL + "histoires/admin/getStorizByUser/" + this.props.match.params.id
  ).then((res) => {
    this.setState({ histoires: res.data });
  });
  }
  }
  componentDidMount(){
    
  }
  deleteComment(id) {
    Axios.delete(config.API_URL + 'impressions/admin/' + id).then(res => {
      Axios.get(config.API_URL + "impressions/histoire/" + id).then((res) => {
        console.log(res.data);
        this.setState({ comments: res.data });
      });
    })
  }
  
  stateUser(){
    if(!this.state.user.isActive){
      return (<Badge >En Attente d'activation</Badge>);
    }
    else{
      if(this.state.user.dateDebloque &&
        moment(this.state.user.dateDebloque).diff(moment(new Date())) > 0){
          return (
            <Badge color="warning">
              Compte bloque    
            </Badge>
          );
        }
      else{
          if(this.state.user.isDesactive){
          return <Badge color="danger">Compte desactive</Badge>;
        }
          else return <Badge color="success">Compte active</Badge>;
      }
      }
  }
  render() {
    const { redirect, selectedHistoireUid } = this.state;

    if (redirect) {
      return <Redirect to={"/admin/storie/" + selectedHistoireUid} />;
    }
     const columnsComments = [
       {
         title: "Histoire",
         field: "histoire",
         customFilterAndSearch: (term, rowData) =>
           rowData.histoire.titreHistoire
             .toLowerCase()
             .indexOf(term.toLowerCase()) > -1,
         customSort: (a, b) =>
           a.histoire.titreHistoire
             .toLowerCase()
             .localeCompare(b.histoire.titreHistoire.toLowerCase()),
         render: (rowData) => (
           <Core.ButtonBase
             onClick={() =>
               this.props.history.push("/admin/storie/" + rowData.histoire.id)
             }
             style={{ outline: "none", width: "100%" }}
           >
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
                 <div className="avatar" style={{ position: "relative" }}>
                   <div
                     style={{
                       position: "absolute",
                       width: "100%",
                       height: "100%",
                       borderRadius: 4,
                       backgroundColor: "rgba(0,0,0,0.5)",
                     }}
                   ></div>
                   <img
                     alt="..."
                     className="img-circle img-no-padding img-responsive"
                     src={
                       /*rowData.histoire.lienIllustration*/ require("./../assets/img/jan-sendereks.jpg")
                     }
                   />
                   <p
                     style={{
                       position: "absolute",
                       top: 5,
                       left: 5,
                       fontSize: 10,
                       fontWeight: "Bold",
                       color: "white",
                     }}
                   >
                     {rowData.histoire.titreHistoire}
                   </p>
                 </div>
               </Col>
             </Row>
           </Core.ButtonBase>
         ),
       },
       {
         title: "Text commentaire",
         field: "commentaire",
         render: (rowData, key) => {
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
         },
       },
       {
         title: "Note du Dessin",
         field: "noteDessin",
         type: "numeric",
         render: (rowData) => {
           if (rowData.user) {
             return (
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
             );
           }
         },
       },
       {
         title: "Note du Text",
         field: "noteHistoire",
         type: "numeric",
         render: (rowData) => {
           if (rowData.user) {
             return (
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
             );
           }
         },
       },
       {
         title: "Date de Creation",
         field: "dateDeCreation",
         type: "datetime",
       },
     ];
    const columnsStoriz = [
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
              <Core.ButtonBase
                onClick={() =>
                  this.props.history.push(
                    "/admin/user/" + rowData.userDessin.id
                  )
                }
                style={{ outline: "none", width: "100%" }}
              >
                <Row
                  style={{ paddingLeft: 0, paddingRight: 0, width: "100%" }}
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
              </Core.ButtonBase>
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
              <Core.ButtonBase
                onClick={() =>
                  this.props.history.push("/admin/user/" + rowData.userText.id)
                }
                style={{ outline: "none", width: "100%" }}
              >
                <Row style={{ paddingLeft: 10, paddingRight: 10,width:"100%" }}>
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
              </Core.ButtonBase>
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
        render: (rowData) => (
          <Row>
            <Col md={12} sm={12} lg={12}>
              {rowData.etatHistoire === "EN_ATTANTE" ? (
                <Badge color="secondary">EN_ATTANTE</Badge>
              ) : rowData.etatHistoire === "EN_ATTANTE_USER" ? (
                  <Badge color="warning">EN_ATTANTE_USER</Badge>
              ) : rowData.etatHistoire === "VALIDE" ? (
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
          <Row>
            <Col md="4" style={{ display: "flex", flexDirection: "column" }}>
              <Card className="card-user">
                <div className="image">
                  <Core.ButtonBase
                    onClick={() =>{if (
                                     this.state.user.lienCouverture &&
                                     this.state.user.lienCouverture != ""
                                   ) {
                                     this.setState({
                                       isOpen: true,
                                       imgUrl: this.state.user.lienCouverture,
                                     });
                                   }
                    }
                      
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
                        !this.state.user.lienCouverture ||
                        this.state.user.lienCouverture == ""
                          ? config.API_URL + "images/asset/bg1.jpg"
                          : this.state.user.lienCouverture
                      }
                    />
                  </Core.ButtonBase>
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) =>{
                      if (
                        this.state.user.lienPhoto &&
                        this.state.user.lienPhoto != ""
                      ) {
                        this.setState({
                          isOpen: true,
                          imgUrl: this.state.user.lienPhoto,
                        });
                      }
                    }}>
                      {!this.state.user.lienPhoto ||
                      this.state.user.lienPhoto == "" ? (
                        <img
                          className="avatar border-gray"
                          alt=""
                          src={
                            config.API_URL +
                            "images/asset/defaultPhotoProfil.jpg"
                          }
                        />
                      ) : (
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={this.state.user.lienPhoto}
                        />
                      )}
                      <h5 className="title">{this.state.user.pseudo}</h5>
                    </a>
                    <Row>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <p className="description">
                          {this.state.user.nom + " " + this.state.user.prenom}
                        </p>
                      </Col>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <p className="description">
                          <RoomIcon style={{ height: 20 }} />
                          {this.state.user.ville}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <p className="description text-center">
                    {this.state.user.email}
                  </p>
                  <Divider style={{ marginTop: "4%" }} />
                  <Row>
                    <Col
                      className="ml-auto"
                      lg="6"
                      md="6"
                      xs="6"
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
                      lg="3"
                      md="3"
                      xs="3"
                      style={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {this.state.user.nombreHistoire}
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
                            this.state.user.noteHistoire
                              ? parseFloat(
                                  Math.round(
                                    this.state.user.noteHistoire * 100
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
                            Math.round(this.state.user.noteHistoire * 100) / 100
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
                                Math.round(this.state.user.noteHistoire * 100) /
                                  100
                              ).toFixed(1)}
                            </p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: "4%" }} />
                  <Row>
                    <Col
                      className="ml-auto"
                      lg="6"
                      md="6"
                      xs="6"
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
                      lg="3"
                      md="3"
                      xs="3"
                      style={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {this.state.user.nombreDessin}
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
                            this.state.user.noteDessin
                              ? parseFloat(
                                  Math.round(this.state.user.noteDessin * 100) /
                                    100
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
                            Math.round(this.state.user.noteDessin * 100) / 100
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
                                Math.round(this.state.user.noteDessin * 100) /
                                  100
                              ).toFixed(1)}
                            </p>
                          </div>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <h5>
                          {this.state.user.nombreSignaler} <br />
                          <small>Signales</small>
                        </h5>
                      </Col>
                      <Col
                        className="ml-auto mr-auto"
                        lg="6"
                        md="6"
                        xs="6"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {this.stateUser()}
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card style={{ flex: 1 }}>
                <CardHeader>
                  <CardTitle tag="h4">Reseau</CardTitle>
                </CardHeader>
                <CardBody>
                  <SimpleBar
                    style={{
                      maxHeight: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <ul
                      className="list-unstyled team-members sidebar-wrapper"
                      ref={this.reseau}
                    >
                      {this.state.relations.length > 0 ? (
                        this.state.relations.map((relation, index) => {
                          return (
                            <li key={relation.id}>
                              <Row>
                                <Col
                                  md="3"
                                  xs="3"
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <div className="avatar" style={{ margin: 0 }}>
                                    {relation.userOne.id ===
                                    this.state.user.id ? (
                                      !relation.userTwo.lienPhoto ||
                                      relation.userTwo.lienPhoto == "" ? (
                                        <img
                                          className="avatar border-gray"
                                          alt=""
                                          src={
                                            config.API_URL +
                                            "images/asset/defaultPhotoProfil.jpg"
                                          }
                                          style={{ margin: 0 }}
                                        />
                                      ) : (
                                        <img
                                          alt="..."
                                          className="avatar border-gray"
                                          src={relation.userTwo.lienPhoto}
                                          style={{ margin: 0 }}
                                        />
                                      )
                                    ) : !relation.userOne.lienPhoto ||
                                      relation.userOne.lienPhoto == "" ? (
                                      <img
                                        className="avatar border-gray"
                                        alt=""
                                        src={
                                          config.API_URL +
                                          "images/asset/defaultPhotoProfil.jpg"
                                        }
                                        style={{ margin: 0 }}
                                      />
                                    ) : (
                                      <img
                                        alt="..."
                                        className="avatar border-gray"
                                        src={relation.userOne.lienPhoto}
                                        style={{ margin: 0 }}
                                      />
                                    )}
                                  </div>
                                </Col>
                                <Col
                                  md="6"
                                  xs="6"
                                  style={{
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  {relation.userOne.id == this.state.user.id
                                    ? relation.userTwo.pseudo
                                    : relation.userOne.pseudo}
                                </Col>
                                <Col className="text-right" md="3" xs="3">
                                  <Button
                                    className="btn-round btn-icon"
                                    color="warning"
                                    outline
                                    size="sm"
                                    onClick={() => {
                                      if (
                                        relation.userOne.id ==
                                        this.state.user.id
                                      ) {
                                        this.props.history.push(
                                          "/admin/user/" + relation.userTwo.id
                                        );
                                      } else {
                                        this.props.history.push(
                                          "/admin/user/" + relation.userOne.id
                                        );
                                      }
                                    }}
                                  >
                                    <i className="fa fa-info" />
                                  </Button>
                                </Col>
                              </Row>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          <Row>
                            <Col md="2" xs="2"></Col>
                            <Col md="9" xs="9">
                              Aucun utilisateurs inscrit dans le reseau de{" "}
                              {" " + this.state.user.pseudo}
                            </Col>
                          </Row>
                        </li>
                      )}
                    </ul>
                  </SimpleBar>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
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
                    title={"Histoires de " + this.state.user.pseudo}
                    columns={columnsStoriz}
                    data={this.state.histoires}
                    options={{
                      actionsColumnIndex: columnsStoriz.length,
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
                      pageSize: 10,
                      pageSizeOptions: [10],
                      //paginationType:"steped"
                      // doubleHorizontalScroll:true
                    }}
                    actions={[
                      {
                        icon: () => <Info style={{ color: "#fbc658" }} />,
                        tooltip: "Detail",
                        onClick: (event, rowData) => {
                          this.setState({
                            redirect: true,
                            selectedHistoireUid: rowData.id,
                          });
                        },
                        style: { outline: "none" },
                      },
                      (rowData) => ({
                        icon: (e) => (
                          <DeleteOutline
                            style={!e.disabled ? { color: "#ef8157" } : {}}
                          />
                        ),
                        tooltip: "Archiver",
                        onClick: (event, rowData) =>
                          this.EditHistoire(rowData, "ARCHIVE"),
                        disabled: rowData.etatHistoire === "ARCHIVE",
                      }),
                      (rowData) => ({
                        icon: (e) => (
                          <CheckCircle
                            style={!e.disabled ? { color: "#6bd098" } : {}}
                          />
                        ),
                        tooltip: "Valider",
                        onClick: (event, rowData) =>
                          this.EditHistoire(rowData, "VALIDE"),
                        disabled:
                          rowData.etatHistoire !== "EN_ATTANTE" &&
                          rowData.etatHistoire !== "ARCHIVE",
                      }),
                    ]}
                    localization={translateTable.tabTranslation}
                    style={{
                      paddingTop: 15,
                      paddingBottom: 15,
                      paddingLeft: 30,
                      paddingRight: 30,
                      borderRadius: 12,
                      marginBottom: 20,
                      boxShadow: "0 6px 10px -4px rgba(0, 0, 0, 0.15)",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                </Col>
              </Row>
            </Col>
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
                title={"Commentaires de " + this.state.user.pseudo}
                columns={columnsComments}
                data={this.state.comments}
                options={{
                  actionsColumnIndex: columnsComments.length,
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
                  marginBottom: 20,
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

export default UserDetail;
