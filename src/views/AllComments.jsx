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
import PerfectScrollbar from "perfect-scrollbar";


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
  Badge,
  UncontrolledTooltip
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
import * as firebase from "firebase/app";
import "firebase/database";
var ps;
class AllComments extends React.Component {
  constructor(props){
    super(props);
    this.state={
      histoires:[],
      commentaires:[],
    }
    this.fetchUsers()
 firebase
   .database()
   .ref("comments/")
   .on("value", (snapshot) => {
     console.log(snapshot);
     if (snapshot && snapshot.val()) {
       this.fetchUsers();
     }
   }); 
  }

  fetchUsers(){
  
    Axios.get(config.API_URL + 'impressions').then(res => {
      console.log(res.data);
      this.setState({ commentaires: res.data })
    }
    );
  }
  deleteComment(id){
Axios.delete(config.API_URL + 'impressions/admin/'+id).then(res => {
  this.fetchUsers();
})
  }
  render() {
   const columns = [
     {
       title: "Utilisateur",
       field: "user",
       customFilterAndSearch: (term, rowData) =>
         rowData.user.pseudo.toLowerCase().indexOf(term.toLowerCase()) > -1,
       customSort: (a, b) =>
         a.user.pseudo.toLowerCase().localeCompare(b.user.pseudo.toLowerCase()),
       render: (rowData) => {
         if (rowData.user) {
           return (
             <Core.ButtonBase
               onClick={() =>
                 this.props.history.push("/admin/user/" + rowData.user.id)
               }
               style={{ outline: "none" }}
             >
               <Row style={{ paddingLeft: 10, paddingRight: 10 }}>
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
           <Row style={{ paddingLeft: 10, paddingRight: 10, width: "100%" }}>
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
           <Col md={12} lg={12} xs={12} >
             
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
                }
              }
              title="Tous les Commentaires"
                columns={columns}
                data={this.state.commentaires}
                options={{
                  actionsColumnIndex: columns.length,
                  filtering: true,
                  headerStyle: {
                    color: "#51cbce",
                    fontSize: 14,
                    fontWeight: 700
                  },
                  rowStyle: {
                    color: "#212529",
                    fontSize: 14
                  },
                  filterCellStyle:{
                    color:"secondary"
                  },
                  //paginationType:"steped"
                 // doubleHorizontalScroll:true
                }}
                actions={[
                  
                  rowData => ({
                    icon: (e) => <DeleteOutline style={!e.disabled ?{ color: "#ef8157" }:{}} />,
                    tooltip: "Supprimer",
                    onClick: (event, rowData) => this.deleteComment(rowData.id),
                    disabled: rowData.etatHistoire === "ARCHIVE"
                  }),
                  
                ]}
              localization={translateTable.tabTranslation}
              style={{
                paddingTop: 15, paddingBottom: 15, paddingLeft: 30, paddingRight: 30  , borderRadius: 12,
    boxShadow: "0 6px 10px -4px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#FFFFFF"}}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AllComments;
