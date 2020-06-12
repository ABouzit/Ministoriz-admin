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
import Dashboard from "views/Dashboard.jsx";
import Notifications from "views/Notifications.jsx";
import Typography from "views/Typography.jsx";
import TableList from "views/Tables.jsx";
import Maps from "views/Map.jsx";
import UpgradeToPro from "views/Upgrade.jsx";
import AllStoriz from "views/AllStoriz";
import Tables from "views/Tables";
import Upgrade from "views/Upgrade"
import AllUsers from "views/AllUsers";
import AllStorizEnAttante from "views/AllStorizEnAttante";
import AllUsersDesactive from "views/AllUsersDesactive";
import AllUsersSignaled from "views/AllUsersSignaled";
import AllComments from "views/AllComments";
import AllStorizDemandeSuppression from "views/AllStorizDemandeSuppression";
import StoriDetail from "views/StoriDetail";
import UserDetail from "views/UserDetail";

var routesSecondaire = [
  {
    path: "/storie",
    varProp: "/:id",
    component: StoriDetail,
    layout: "/admin",
  },
  {
    path: "/user",
    varProp: "/:id",
    component: UserDetail,
    layout: "/admin",
  },
];
export default routesSecondaire;
