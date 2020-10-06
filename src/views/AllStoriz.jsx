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
import Visibility from '@material-ui/icons/Visibility';
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
import Comment from '@material-ui/icons/Comment';
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import * as Core from '@material-ui/core';
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
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import Axios from "axios";
import config from "config/config";
import MaterialTable from "material-table";
import { Avatar } from "@material-ui/core";
import translateTable from "config/translateTable";
import { Redirect } from 'react-router';
import * as firebase from "firebase/app";
import "firebase/database";
import { subscriberNewStoriz, messageService } from "./../services/messageService";
class AllStoriz extends React.Component {
  constructor(props){
    super(props);
    this.state={
      histoires:[],
      redirect:false,
      selectedHistoireUid:"",
    }
    this.fetchUsers()
 firebase.database().ref("newStoriz").on("value",snapshot=>{
  if (snapshot && snapshot.val()) {
    this.fetchUsers();
  }
});
  }
  sorting(a, b) {
    if (!a) return 1
    else if (!b) return -1
    else return a.pseudo.toLowerCase().localeCompare(b.pseudo.toLowerCase())
  }
  modificationDelete(data){
    Axios.delete(config.API_URL + "histoires/admin/updateNotValid/"+data.id).then(()=>{
      this.fetchUsers();
      this.forceUpdate();
    });
  }
  modificationValide(data) {
    Axios.put(config.API_URL + "histoires/admin/updateValide", data).then(() => {
      this.fetchUsers();
      this.forceUpdate();
    });
  }
  fetchUsers(){
    console.log('asdkjn')
    Axios.get(config.API_URL+'histoires').then(res=>{
      console.log(res.data);
    this.setState({histoires:res.data})}
    );
  }
  EditHistoire(histoire,etat){
     var hist = histoire;
     let string = "";
     if (
       !hist.userText ||
       !hist.userDessin ||
       hist.userDessin.id == hist.userText.id
     ) {
       if (!hist.userDessin) {
         string = "null/" + hist.userText.id;
       } else if (!hist.userText) {
         string = hist.userDessin.id + "/null";
       } else if (hist.userDessin.id == hist.userText.id) {
         string = hist.userDessin.id + "/null";
       }
     } else {
       string = hist.userDessin.id + "/" + hist.userText.id;
     }
     hist.etatHistoire = etat;
     Axios.put(config.API_URL + "histoires/admin/" + string, hist)
       .then((res) => {
         this.fetchUsers();
         this.forceUpdate();
       })
       .then(() => {
         if (
           !hist.userDessin ||
           !hist.userText ||
           hist.userDessin.id === hist.userText.id
         ) {
           if (!hist.userDessin) {
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
           } else if (!hist.userText) {
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
           } else if (hist.userDessin.id === hist.userText.id) {
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
         } else {
           firebase
             .database()
             .ref("newStoriz/" + hist.userDessin.id)
             .set({
               numbe: 100000 + Math.random() * (100000 - 1),
             });
             
           firebase
             .database()
             .ref("newStoriz/" + hist.userText.id)
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
                 .ref("notifications/" + hist.userText.id)
                 .set({
                   from: "admin",
                   numbe: 100000 + Math.random() * (100000 - 1),
                   to: hist.userText.id,
                 });
         }
       });
  }
  render() {
     const { redirect,selectedHistoireUid } = this.state;

     if (redirect) {
       return <Redirect to={"/admin/storie/"+selectedHistoireUid} />;
     }
   const columns = [
     {
       title: "Photo",
       field: "lienIllustration",
       filtering: false,
       sorting:false,
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
         rowData.userDessin &&
         rowData.userDessin.pseudo.toLowerCase().indexOf(term.toLowerCase()) >
         -1 || ("Textes uniquement").toLowerCase().indexOf(term.toLowerCase())>-1&&!rowData.userDessin,
       customSort: (a, b) => this.sorting(a.userDessin,b.userDessin),
       render: (rowData) => {
         if (rowData.userDessin) {
           return (
             <Core.ButtonBase
               onClick={() =>
                 this.props.history.push("/admin/user/" + rowData.userDessin.id)
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
         }else {
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
         rowData.userText &&
         rowData.userText.pseudo.toLowerCase().indexOf(term.toLowerCase()) > -1
         || ("Dessins uniquement").toLowerCase().indexOf(term.toLowerCase()) > -1 && !rowData.userText,
       customSort: (a, b) => this.sorting(a.userText,b.userText),
       render: (rowData) => {
         if (rowData.userText) {
           return (
             <Core.ButtonBase
               onClick={() =>
                 this.props.history.push("/admin/user/" + rowData.userText.id)
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
         }else {return (
                 <Badge style={{ backgroundColor: "#EF8157" }}>
                   Dessins uniquement
                 </Badge>
               );}
       },
     },

     {
       title: "Nombre Vue",
       field: "nombreVue",
       type: "numeric",
       render: (rowData) => (
         <Core.Badge
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "right",
           }}
           style={
             rowData.nombreVue == 0 ? { color: "rgba(0, 0, 0, 0.26)" } : {}
           }
           badgeContent={rowData.nombreVue}
         >
           <Visibility />
         </Core.Badge>
       ),
     },

     {
       title: "Nombre Commentaires",
       field: "nombreComment",
       type: "numeric",
       render: (rowData) => (
         <Core.Badge
           anchorOrigin={{
             vertical: "bottom",
             horizontal: "right",
           }}
           style={
             rowData.nombreComment == 0 ? { color: "rgba(0, 0, 0, 0.26)" } : {}
           }
           badgeContent={rowData.nombreComment}
         >
           <Comment />
         </Core.Badge>
       ),
     },

     {
       title: "Moyenne Dessin",
       field: "noteDessinMoy",
       type: "numeric",
       render: (rowData) => {
         if (rowData.userDessin) {return(<div
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
                 rowData.noteDessinMoy
                   ? parseFloat(
                       Math.round(rowData.noteDessinMoy * 100) / 100
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
                 Math.round(rowData.noteDessinMoy * 100) / 100
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
                     Math.round(rowData.noteDessinMoy * 100) / 100
                   ).toFixed(1)}
                 </p>
               </div>
             </CircularProgressbarWithChildren>
           </div>);
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
       title: "Moyenne Text",
       field: "noteHistoireMoy",
       type: "numeric",
       render: (rowData) => {
         if (rowData.userText) {return(
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
               rowData.noteHistoireMoy
                 ? parseFloat(
                     Math.round(rowData.noteHistoireMoy * 100) / 100
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
               Math.round(rowData.noteHistoireMoy * 100) / 100
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
                   Math.round(rowData.noteHistoireMoy * 100) / 100
                 ).toFixed(1)}
               </p>
             </div>
           </CircularProgressbarWithChildren>
         </div>
         );}else {
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
       lookup: {
         EN_ATTANTE: "EN_ATTANTE",
         VALIDE: "VALIDE",
         ARCHIVE: "ARCHIVE",
         EN_ATTANTE_USER: "EN_ATTANTE_USER",
         EN_ATTANTE_UPDATE: "EN_ATTANTE_UPDATE",
       },
       render: (rowData) => (
         <Row>
           <Col md={12} sm={12} lg={12}>
             {rowData.etatHistoire === "EN_ATTANTE" ? (
               <Badge color="secondary">EN_ATTENTE</Badge>
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
    const data= [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
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
                title="Toutes les Histoires"
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
                    tooltip: rowData.etatHistoire === "EN_ATTANTE_UPDATE" ? "Supprimer la modification" : "Archiver",
                    onClick: (event, rowData) => {
                      if (rowData.etatHistoire === "EN_ATTANTE_UPDATE") { this.modificationDelete(rowData) }
                      else { this.EditHistoire(rowData, "VALIDE") }
                    },
                    disabled: rowData.etatHistoire === "ARCHIVE",
                  }),
                  (rowData) => ({
                    icon: (e) => (
                      <CheckCircle
                        style={!e.disabled ? { color: "#6bd098" } : {}}
                      />
                    ),
                    
                    tooltip: rowData.etatHistoire === "EN_ATTANTE_UPDATE" ? "Valier la modification" : "Valider",
                    onClick: (event, rowData) =>{
                      if(rowData.etatHistoire==="EN_ATTANTE_UPDATE"){this.modificationValide(rowData)}
                      else { this.EditHistoire(rowData, "VALIDE") }}
                      ,
                    disabled:
                      rowData.etatHistoire !== "EN_ATTANTE" &&
                      rowData.etatHistoire !== "ARCHIVE" && rowData.etatHistoire !== "EN_ATTANTE_UPDATE",
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

export default AllStoriz;
