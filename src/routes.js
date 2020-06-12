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
import AllAdmins from "views/AllAdmins";
import Mail from "views/Mail";

var routes = [
  {
    path: "/dashboard",
    name: "Acceuil",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/all-admins",
    name: "administrateurs",
    icon: "nc-icon nc-badge",
    component: AllAdmins,
    layout: "/admin",
  },
  {
    path: "/histoire",
    name: "Histoires",
    icon: "nc-icon nc-single-copy-04",
    component: AllStoriz,
    layout: "/admin",
    type: "develope",
    sub: [
      {
        path: "/all-storiz",
        name: "Toutes les Histoires",
        abrev: "HS",
        component: AllStoriz,
        layout: "/admin",
      },
      {
        path: "/add-storiz",
        name: "Ajout Histoires",
        abrev: "AH",
        component: AllStorizEnAttante,
        layout: "/admin",
      },
      {
        path: "/delete-storiz",
        name: "Suppression Histoire",
        abrev: "SH",
        component: AllStorizDemandeSuppression,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/utilisateurs",
    name: "Utilisateurs",
    icon: "nc-icon nc-single-02",
    component: AllStoriz,
    layout: "/admin",
    type: "develope",
    sub: [
      {
        path: "/all-users",
        name: "Tous les Utilisateurs",
        abrev: "US",
        component: AllUsers,
        layout: "/admin",
      },
      {
        path: "/signaled-users",
        name: "Utilisateurs signale",
        icon: "nc-icon nc-tile-56",
        abrev: "USi",
        layout: "/admin",
        component: AllUsersSignaled,
      },
      {
        path: "/desactive-users",
        name: "Activer/Desactiver",
        icon: "nc-icon nc-tile-56",
        abrev: "AD",
        layout: "/admin",
        component: AllUsersDesactive,
      },
    ],
  },
  
  {
    path: "/all-comments",
    name: "Commentaires",
    icon: "nc-icon nc-chat-33",
    component: AllComments,
    layout: "/admin",
  },

  {
    path: "/all-mails",
    name: "Mails",
    icon: "nc-icon nc-email-85",
    component: Mail,
    layout: "/admin",
  },
];
export default routes;
