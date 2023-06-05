"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var Button_1 = require("../components/Button");
var react_select_1 = require("react-select");
var Input_1 = require("../components/Input");
var roleArr = [
    {
        value: 'PGP',
        label: 'PGP'
    },
    {
        value: 'Admin',
        label: 'Admin'
    }
];
var locationArr = [
    {
        value: 'Amsterdam',
        label: 'Amsterdam'
    },
    {
        value: 'Oslo',
        label: 'Oslo'
    },
    {
        value: 'Stockholm',
        label: 'Stockholm'
    }
];
var UpdateUser = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), users = _a.users, groups = _a.groups, setUsers = _a.setUsers;
    var _b = react_1.useState({}), singleUser = _b[0], setSingleUser = _b[1];
    var _c = react_1.useState({}), singleUserLocation = _c[0], setSingleUserLocation = _c[1];
    var _d = react_1.useState({}), singleUserRole = _d[0], setSingleUserRole = _d[1];
    var userId = react_router_dom_1.useParams().userId;
    var navigate = react_router_dom_1.useNavigate();
    var cookieToken = js_cookie_1["default"].get('token');
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Users/" + userId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            setSingleUser(response.data);
            setSingleUserLocation(locationArr.find(function (location) {
                return location.label.toLowerCase() ===
                    response.data.location.toLowerCase();
            }));
            setSingleUserRole(roleArr.find(function (item) {
                return item.label.toLowerCase() === response.data.role.toLowerCase();
            }));
        })["catch"](function (error) {
            navigate("/error");
        });
        // eslint-disable-next-line
    }, [userId, cookieToken, groups]);
    var handleUpdateUser = function (e) {
        e.preventDefault();
        var updatedUser = {
            email: singleUser.email,
            fullName: singleUser.fullName,
            imageUrl: singleUser.imageUrl,
            role: singleUserRole.value.toLowerCase(),
            location: singleUserLocation.value,
            status: singleUser.status,
            bootcamp: singleUser.bootcamp,
            groupsId: singleUser.groupsId
        };
        axios_1["default"]
            .put("https://project-salty-backend.azurewebsites.net/Users/update/" + userId, __assign({}, updatedUser), {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            console.log(response.statusText);
            navigate("/users/" + userId);
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    var handleDeleteUser = function (e) {
        e.preventDefault();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Users/" + userId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            console.log(response.statusText);
            setUsers(users.filter(function (user) { return user.id !== Number(userId); }));
            navigate("/users");
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    var handleChangeSelectedLocation = function (selectedOption) {
        setSingleUserLocation(selectedOption);
    };
    var handleChangeSelectedRole = function (selectedOption) {
        setSingleUserRole(selectedOption);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("form", null,
            React.createElement(Title_1["default"], { underline: true, title: "Update User" }),
            React.createElement("div", { className: "bg-gray-100 mb-4 px-4 pb-2 pt-1" },
                React.createElement(Title_1["default"], { className: "!mb-0 !text-lg font-bold !font-poppins", title: singleUser.fullName }),
                React.createElement("p", { className: "text-sm font-bold font-roboto" }, singleUser.email)),
            React.createElement("div", null,
                React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans" }, "Location"),
                React.createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeSelectedLocation, options: locationArr, value: singleUserLocation })),
            React.createElement(Input_1.Input, { label: "Bootcamp", disabled: true, placeholder: singleUser === null || singleUser === void 0 ? void 0 : singleUser.bootcamp }),
            React.createElement("div", null,
                React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans" }, "Role"),
                React.createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeSelectedRole, options: roleArr, value: singleUserRole })),
            React.createElement("div", null,
                React.createElement(Button_1.Button, { label: "Update User", type: "button", onClick: function (e) {
                        handleUpdateUser(e);
                    } })),
            React.createElement("div", { className: "mb-32" },
                React.createElement(Button_1.Button, { buttonColor: "pink", label: "Delete User", type: "button", onClick: function (e) {
                        handleDeleteUser(e);
                    } })))));
};
exports["default"] = UpdateUser;
