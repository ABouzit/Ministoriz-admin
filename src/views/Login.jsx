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
import { Base64 } from "js-base64";
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
  
} from "reactstrap";
import config from "config/config";
import Axios from "axios";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
const HEIGHT = window.innerHeight;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      emailError: false,
      passwordError: false,
      email: "",
      password: "",
      signinPassword: false,
      signinUtilisateur: false,
      signinDesactive:false,
    };
    this.handleClose = this.handleClose.bind(this);
    
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
     this.props.history.push("/admin/dashboard/");
    }
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      emailError: false,
      passwordError: false,
      signinPassword: false,
      signinUtilisateur: false,
      signinDesactive:false,
    });
  };
 
  submit() {
    const _this = this;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (_this.state.password.length < 6 || !re.test(_this.state.email)) {
      if (!re.test(_this.state.email)) {
        _this.setState({ emailError: true }, () => {
          this.forceUpdate();
        });
      }
      if (_this.state.password.length < 6) {
        _this.setState({ passwordError: true }, () => {
          this.forceUpdate();
        });
      }
    } else {
      return Axios.post(config.API_URL + "admins/signin", {
        email: _this.state.email,
        motDePasse: Base64.encode(_this.state.password),
      }).then((res) => {
        if (res.data == "errorPassword") {
          _this.setState({ passwordError: true, signinPassword: true }, () => {
            _this.forceUpdate();
          });
        } else if (res.data == "errorUtilisateur") {
          _this.setState(
            { errorMail: true, errorPassword: true, signinUtilisateur: true },
            () => {
              _this.forceUpdate();
            }
          );
        }else if (res.data == "errorActivation") {
                _this.setState(
                  {
                    signinDesactive:true
                  },
                  () => {
                    _this.forceUpdate();
                  }
                );
              } else {
                localStorage.setItem("user", JSON.stringify(res.data));
                this.props.history.push("/admin/dashboard/");
              }
      });
    }
  }
  render() {
    return (
      <>
        <div
          className="content"
          style={{
            height: HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#212120",
          }}
        >
          <Snackbar
            open={this.state.signinPassword}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              Le mot de passe ne correspond pas à la connexion spécifiée !
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.signinUtilisateur}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              Comptes Administrateur introuvable !
            </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.signinDesactive}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert onClose={this.handleClose} severity="error">
              Votre compte Administrateur a ete desactivee !
            </Alert>
          </Snackbar>
          <Row style={{ margin: 0 }}>
            <Col md="12" style={{ padding: 0 }}>
              <Card className="card-user">
                <CardHeader
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    className="border-gray"
                    alt=""
                    src={config.API_URL + "images/asset/logo.png"}
                  />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Adresse Email</label>
                        <Input
                          invalid={this.state.emailError ? true : false}
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Email"
                          onChange={(email) =>
                            this.setState({
                              email: email.currentTarget.value,
                              emailError: false,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Mot de passe</label>
                        <Input
                          invalid={this.state.passwordError ? true : false}
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password"
                          onChange={(password) =>
                            this.setState({
                              password: password.currentTarget.value,
                              passwordError: false,
                            })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      md="12"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 30,
                      }}
                    >
                      <Button
                        onClick={() => {
                          this.submit();
                        }}
                      >
                        Se Connecter
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default Login;
