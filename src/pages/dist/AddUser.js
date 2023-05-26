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
var react_1 = require("react");
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var Input_1 = require("../components/Input");
var Button_1 = require("../components/Button");
require("../styles/external-components.css");
var react_select_1 = require("react-select");
var ri_1 = require("react-icons/ri");
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
var AddUser = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), groups = _a.groups, setUpdate = _a.setUpdate;
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(''), fullName = _c[0], setFullName = _c[1];
    var _d = react_1.useState('Amsterdam'), userLocation = _d[0], setUserLocation = _d[1];
    var _e = react_1.useState('pgp'), role = _e[0], setRole = _e[1];
    var cookieToken = js_cookie_1["default"].get('token');
    var selectOptions = groups.map(function (item) { return ({
        label: item.name,
        value: item.id
    }); });
    var _f = react_1.useState({}), selectedGroups = _f[0], setSelectedGroups = _f[1];
    var isValidEmail = function (email) {
        var regex = /^[a-zA-Z0-9._%+-]+@appliedtechnology\.se$/;
        console.log(regex.test(email));
        return regex.test(email);
    };
    react_1.useEffect(function () {
        var getUserName = function () {
            if (email !== '') {
                try {
                    var string = email.split('@')[0];
                    var name = string.split('.');
                    var firstName = name[0].charAt(0).toUpperCase() + name[0].slice(1);
                    var lastName = name[1].charAt(0).toUpperCase() + name[1].slice(1);
                    var fullName_1 = firstName + " " + lastName;
                    setFullName(fullName_1);
                    return;
                }
                catch (err) {
                    return;
                }
            }
            return;
        };
        getUserName();
    }, [email]);
    var handleChangeBootcamp = function (selectedOption) {
        setSelectedGroups(selectedOption);
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var newUser = {
            email: email,
            fullName: fullName,
            role: role.toLowerCase(),
            location: userLocation,
            status: 'active',
            groupsId: [selectedGroups.value],
            bootcamp: selectedGroups.label
        };
        if (isValidEmail(email)) {
            axios_1["default"]
                .post("https://project-salty-backend.azurewebsites.net/Users", __assign({}, newUser), {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                console.log(response.statusText);
            });
        }
        else {
            //change this later into styled alert
            alert('Enter appliedtechnology email address');
        }
        var target = e.target;
        target.reset();
        setEmail('');
        setUserLocation('Amsterdam');
        setRole('PGP');
        setSelectedGroups({
            label: "",
            value: ""
        });
        setUpdate(true);
    };
    var handleChangeLocation = function (selectedOption) {
        setUserLocation(selectedOption.label);
    };
    var handleChangeRole = function (selectedOption) {
        setRole(selectedOption.label);
    };
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement(Title_1["default"], { underline: true, title: "Add New User" }),
        React.createElement(Input_1.Input, { label: "E-mail address", required: true, value: email, onChange: function (e) { return setEmail(e.target.value); } }),
        React.createElement("div", null,
            React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
                "Location ",
                React.createElement("span", null, "\u00A0"),
                " ",
                React.createElement(ri_1.RiAsterisk, { className: 'text-[10px] text-red-500' })),
            React.createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeLocation, options: locationArr, defaultValue: locationArr[0] })),
        React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
            "Bootcamp ",
            React.createElement("span", null, "\u00A0"),
            " ",
            React.createElement(ri_1.RiAsterisk, { className: 'text-[10px] text-red-500' })),
        React.createElement("div", { className: ".dropdown-container" },
            React.createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeBootcamp, options: selectOptions, value: selectedGroups })),
        React.createElement("div", null,
            React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
                "Role ",
                React.createElement("span", null, "\u00A0"),
                " ",
                React.createElement(ri_1.RiAsterisk, { className: 'text-[10px] text-red-500' })),
            React.createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeRole, options: roleArr, defaultValue: roleArr[0] })),
        React.createElement("div", { className: "mb-32" },
            React.createElement(Button_1.Button, { label: "Add User", type: "submit" }))));
};
exports["default"] = AddUser;
