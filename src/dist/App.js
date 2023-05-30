"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
require("./App.css");
var Login_1 = require("./pages/Login");
var Home_1 = require("./pages/Home");
var Groups_1 = require("./pages/Groups");
var Group_1 = require("./pages/Group");
var User_1 = require("./pages/User");
var Users_1 = require("./pages/Users");
var Assignment_1 = require("./pages/Assignment");
var AddUser_1 = require("./pages/AddUser");
var AddAssignment_1 = require("./pages/AddAssignment");
var Error_1 = require("./pages/Error");
var Profile_1 = require("./pages/Profile");
var AddGroup_1 = require("./pages/AddGroup");
var UpdateUser_1 = require("./pages/UpdateUser");
var UpdateAssignment_1 = require("./pages/UpdateAssignment");
var AssignAssignmentToGroup_1 = require("./pages/AssignAssignmentToGroup");
var react_secure_storage_1 = require("react-secure-storage");
var Header_1 = require("./components/Header");
var react_1 = require("react");
var AppContext_1 = require("./AppContext");
var Footer_1 = require("./components/Footer");
var PrivateRoute = function (_a) {
    var allowedRoles = _a.allowedRoles;
    var location = react_router_dom_1.useLocation();
    var localUserRole = react_secure_storage_1["default"].getItem('role');
    return typeof localUserRole === 'string' &&
        allowedRoles.includes(localUserRole) ? (React.createElement(react_router_dom_1.Outlet, null)) : localUserRole ? (React.createElement(react_router_dom_1.Navigate, { to: "/home", state: { from: location }, replace: true })) : (React.createElement(react_router_dom_1.Navigate, { to: "/", state: { from: location }, replace: true }));
};
function App() {
    var location = react_router_dom_1.useLocation().pathname.toLowerCase();
    var user = react_1.useContext(AppContext_1.AppContext).user;
    var isRootPage = location === '/';
    return (React.createElement("div", { className: "container-xl" },
        !isRootPage && React.createElement(Header_1.Header, { role: user.role, location: location }),
        React.createElement("div", { className: "flex justify-center" },
            React.createElement("div", { className: "max-w-6xl mx-2 w-full" },
                React.createElement(react_router_dom_1.Routes, null,
                    React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(Login_1["default"], null) }),
                    React.createElement(react_router_dom_1.Route, { element: React.createElement(PrivateRoute, { allowedRoles: ['pgp', 'admin'] }) },
                        React.createElement(react_router_dom_1.Route, { path: "/home", element: React.createElement(Home_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/users", element: React.createElement(Users_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/users/:userId", element: React.createElement(User_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/profile", element: React.createElement(Profile_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/assignments/:assignmentId", element: React.createElement(Assignment_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/error", element: React.createElement(Error_1["default"], null) })),
                    React.createElement(react_router_dom_1.Route, { element: React.createElement(PrivateRoute, { allowedRoles: ['admin'] }) },
                        React.createElement(react_router_dom_1.Route, { path: "/groups", element: React.createElement(Groups_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/groups/:groupId", element: React.createElement(Group_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/groups/new", element: React.createElement(AddGroup_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/users/:userId", element: React.createElement(User_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/users/:userId/update", element: React.createElement(UpdateUser_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/users/new", element: React.createElement(AddUser_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/assignments/:assignmentId/update", element: React.createElement(UpdateAssignment_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/assignments/:assignmentId/assign", element: React.createElement(AssignAssignmentToGroup_1["default"], null) }),
                        React.createElement(react_router_dom_1.Route, { path: "/assignments/new", element: React.createElement(AddAssignment_1["default"], null) })))),
            !isRootPage && React.createElement(Footer_1.Footer, { role: user.role, image: user.imageUrl }))));
}
exports["default"] = App;
