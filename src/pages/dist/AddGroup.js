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
var react_router_dom_1 = require("react-router-dom");
var Input_1 = require("../components/Input");
var Button_1 = require("../components/Button");
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var Title_1 = require("../components/Title");
var react_multi_select_component_1 = require("react-multi-select-component");
var AppContext_1 = require("../AppContext");
var InputErrorAlert_1 = require("../components/InputErrorAlert");
var AddGroup = function () {
    var users = react_1.useContext(AppContext_1.AppContext).users;
    var _a = react_1.useState(''), groupName = _a[0], setGroupName = _a[1];
    var navigate = react_router_dom_1.useNavigate();
    var cookieToken = js_cookie_1["default"].get('token');
    var selectOptions = users === null || users === void 0 ? void 0 : users.map(function (item) { return ({
        label: item.email,
        value: item.id,
        disabled: false
    }); });
    var _b = react_1.useState([]), selected = _b[0], setSelected = _b[1];
    var selectedUsersIds = selected.map(function (user) { return user.value; });
    var _c = react_1.useState({
        groupName: false
    }), isValid = _c[0], setIsValid = _c[1];
    var _d = react_1.useState(false), toShowValidationError = _d[0], setToShowValidationError = _d[1];
    react_1.useEffect(function () {
        setIsValid(__assign(__assign({}, isValid), { groupName: groupName ? true : false }));
        // eslint-disable-next-line
    }, [groupName]);
    var addGroup = function () {
        // if (groupName.trim() === '') {
        //   return;
        // }
        if (isValid.groupName === true) {
            axios_1["default"]
                .post("https://project-salty-backend.azurewebsites.net/Groups", {
                name: groupName,
                userIds: selectedUsersIds
            }, {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setGroupName('');
                navigate("/groups/" + response.data.id);
            });
        }
        else {
            setToShowValidationError(true);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Title_1["default"], { underline: true, title: "Add New Group" }),
        React.createElement(Input_1.Input, { label: "Group Name", value: groupName, required: true, onChange: function (e) {
                return setGroupName(e.target.value);
            } }),
        React.createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.groupName, toShowValidationError: toShowValidationError }),
        React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans" }, "User E-mail Address"),
        React.createElement("div", { className: ".dropdown-container mb-4" },
            React.createElement(react_multi_select_component_1.MultiSelect, { options: selectOptions, value: selected, onChange: setSelected, labelledBy: "Select" })),
        React.createElement("div", { className: "mb-4" },
            React.createElement(Button_1.Button, { label: "Add Group", onClick: addGroup, type: "button" }))));
};
exports["default"] = AddGroup;
