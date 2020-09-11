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
// reactstrap components
import SendIcon from '@material-ui/icons/Send';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Collapse, Button, Label, Input, ButtonToggle, Badge } from "reactstrap";
import MaterialTable from "material-table";
import Axios from "axios";
import config from "config/config";
import translateTable from "config/translateTable";
import { Divider, FormGroup } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import * as firebase from "firebase/app";
import "firebase/database";
class Mail extends React.Component {
  constructor(props){
    super(props);
    this.state={
      mails:[],
      toggle:false,
      object: "",
      message: ""
    }
    firebase
      .database()
      .ref("mails").on("value",snapshot=>{
        if(snapshot&&snapshot.val()){
          this.fetchMails();
        }
      })
    this.fetchMails();
  }
   toggle = () => this.setState({toggle:!this.state.toggle});
  fetchMails(){
    Axios.get(config.API_URL + "contacts/").then((res) => {
      console.log(res.data);
      this.setState({ mails: res.data });
    });
  }
  deleteComment(id) {
    Axios.delete(config.API_URL + 'contacts/' + id).then(res => {
      this.fetchMails();
    })
  }
  stateUser(rowData) {
    if (!rowData.repondue) {
      return <Badge color="warning">n'a été répondu</Badge>;
      } else {
      return <Badge color="success">a été répondu</Badge>;
      }
  }
  envoyerMail(rowData){
    let t=rowData;
    Axios.post(config.API_URL + "messages/contact", {
      nom:rowData.pseudo,
      objet:this.state.object,
      email:rowData.email,
      message:this.state.message
    }).then((res)=>{
      t.repondue =  true;
      Axios.put(config.API_URL + "contacts", t).then(()=>{
        this.setState({message:"",nom:""});
        firebase
          .database()
          .ref("mails")
          .set({
            numbe: 100000 + Math.random() * (100000 - 1)
          });
        this.fetchMails();
      });
    });
  }
  sort(a, b){
    return (a === b) ? 0 : a ? 1 : -1;
  }
  render() {
    const columns = [
      {
        title: "Date de Creation",
        field: "dateDeCreation",
        type: "datetime",
      },
      { title: "Pseudo/Nom", field: "pseudo" },
      { title: "Email", field: "email" },
      {
        title: "Etat",
        field: "repondue",
        render: (rowData) => this.stateUser(rowData),
        filtering: false,
        customSort: (a, b) => this.sort(a.repondue, b.repondue),
      },
    ];
    return (
      <>
        <div className="content">
          <Row>
            <Col md={12}>
            <MaterialTable
                style={{
                  paddingTop: 15,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderRadius: 12,
                  boxShadow: "0 6px 10px -4px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#FFFFFF",
                }}
                options={{
                  detailPanelType:"single",
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
                localization={translateTable.tabTranslation}
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
              title="Tous les mails"
              columns={columns}
              data={this.state.mails}
                onRowClick={(event, rowData, togglePanel) => {togglePanel();this.setState({object:"",message:"",toggle:false})}}
                actions={[
                  rowData => ({
                    icon: (e) => <DeleteOutline style={{ color: "#ef8157" }} />,
                    tooltip: "Supprimer",
                    onClick: (event, rowData) => this.deleteComment(rowData.id),
                  }),
                ]}
              detailPanel={[{
                disabled:true,
                icon: ' ',
                openIcon: ' ',
                render:rowData => {
                return (
                  <Row style={{padding:50}}>
                    <Col md={12} style={{marginBottom:50}}>
                      <p>
                        <span style={{ fontSize: 20, marginRight: 20 }}>Objet :</span>
                        <span style={{ fontSize: 20, color: "#66615B" }}>{rowData.objet}</span>
                        <Button color="success" close aria-label="Repondre" onClick={this.toggle}>
                          Repondre
                          <ArrowDownwardIcon style={{ marginLeft: 5 }} />
                        </Button>
                      </p>
                    </Col>
                    
                    <Col md={12}>
                      <p style={{ fontSize: 15, color: "#66615B" }}>{rowData.message}</p>
                    </Col>
                  <Collapse
                    isOpen={this.state.toggle}
                    style={{width:"100%"}}
                  > 
                  <Col>
                  <Row md={12} style={{paddingBottom:15}}>
                          <Divider style={{ width: "100%" }}/>
                          </Row>
                        <Row md={12} style={{ paddingBottom: 15 }}>
                          <FormGroup row style={{ width: "100%" }}>
                            <Label for="objet" xs={2} sm={2}>Objet</Label>
                            <Col xs={1} sm={1} style={{paddingTop:7}}>:</Col>
                            <Col sm={9} xs={9}>
                              <Input type="text" name="text" id="objet" value={this.state.object} onChange={(object)=>this.setState({object:object.currentTarget.value})}/>
                            </Col>
                          </FormGroup>
                          </Row>
                          <Row md={12} style={{ paddingBottom: 15 }}>
                          <FormGroup row style={{ width: "100%" }}>
                            <Label for="objet" xs={2} sm={2}>Objet</Label>
                            <Col xs={1} sm={1} style={{paddingTop:7}}>:</Col>
                            <Col sm={9} xs={9}>
                              <Input type="text" name="text" id="objet" value={this.state.object} onChange={(object)=>this.setState({object:object.currentTarget.value})}/>
                            </Col>
                          </FormGroup>
                          </Row>
                        <Row md={12} style={{ paddingBottom: 15 }}>
                          <FormGroup row style={{ width: "100%" }}>
                            <Label for="exampleText" xs={2} sm={2}>Messages</Label>
                            <Col xs={1} sm={1} style={{ paddingTop: 7 }}>:</Col>
                            <Col sm={9} xs={9}>
                              <Input type="textarea" name="text" id="exampleText" style={{ padding: 10 }} value={this.state.message} onChange={(object) => this.setState({ message: object.currentTarget.value })} />
                            </Col>
                          </FormGroup>
                          <p style={{
                            width: "100%",
                            padding: 15}}>
                            <Button color="success" close aria-label="envoyer" onClick={() => this.envoyerMail(rowData)} disabled={this.state.message===""||this.state.object===""?true:false}>
                              Envoyer
                              <SendIcon style={{ marginLeft: 5 }} />
                        </Button>
                        </p>
                    </Row>
                    </Col>  
                  </Collapse>
                  </Row>
                )
              }}]}
            />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Mail;
