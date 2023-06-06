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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var ListItem_1 = require("../components/ListItem");
var Button_1 = require("../components/Button");
var Editable_1 = require("../components/Editable");
var Title_1 = require("../components/Title");
var react_multi_select_component_1 = require("react-multi-select-component");
var Card_1 = require("../components/Card");
var ri_1 = require("react-icons/ri");
var Group = function () {
    var _a, _b;
    var _c = react_1.useContext(AppContext_1.AppContext), user = _c.user, users = _c.users, setUpdate = _c.setUpdate, assignments = _c.assignments;
    var _d = react_1.useState({}), group = _d[0], setGroup = _d[1];
    var _e = react_1.useState(''), groupName = _e[0], setGroupName = _e[1];
    var selectOptions = users === null || users === void 0 ? void 0 : users.map(function (item) { return ({
        label: item.email,
        value: item.id,
        disabled: false
    }); });
    selectOptions.map(function (item) {
        var _a;
        if ((_a = group.users) === null || _a === void 0 ? void 0 : _a.some(function (user) { return user.id === item.value; })) {
            item.disabled = true;
            return item;
        }
        return item;
    });
    var _f = react_1.useState([]), selected = _f[0], setSelected = _f[1];
    var selectedUsersIds = selected.map(function (user) { return user.value; });
    var groupId = react_router_dom_1.useParams().groupId;
    var cookieToken = js_cookie_1["default"].get('token');
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Groups/" + groupId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            setGroup(response.data);
            setGroupName(response.data.name);
        })["catch"](function (error) {
            navigate("/error");
        });
        // eslint-disable-next-line
    }, [cookieToken, groupId]);
    var handleAddUserToGroup = function (e) {
        e.preventDefault();
        axios_1["default"]
            .post("https://project-salty-backend.azurewebsites.net/Groups/" + groupId + "/AddUser", __spreadArrays(selectedUsersIds), {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (res) {
            var newGroupUsers = __spreadArrays(group.users);
            selectedUsersIds.forEach(function (userId) {
                return newGroupUsers.push({
                    id: userId,
                    name: ''
                });
            });
            setGroup(__assign(__assign({}, group), { users: __spreadArrays(newGroupUsers) }));
            setSelected([]);
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    var handleRemoveUser = function (e, id) {
        e.preventDefault();
        e.stopPropagation();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Groups/" + groupId + "/RemoveUser", {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            },
            data: [id]
        })
            .then(function (res) {
            var newGroupUsers = __spreadArrays(group.users).filter(function (user) { return user.id !== id; });
            setGroup(__assign(__assign({}, group), { users: __spreadArrays(newGroupUsers) }));
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    var handleDeleteGroup = function (e, groupId) {
        e.preventDefault();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Groups/" + groupId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function () {
            setUpdate(true);
            navigate('/groups');
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Editable_1["default"], { text: groupName, groupId: Number(groupId), type: "input" },
            React.createElement("input", { type: "text", name: "task", value: groupName, className: "focus:outline-none w-96", onChange: function (e) { return setGroupName(e.target.value); } })),
        React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
            "User E-mail Address ",
            React.createElement("span", null, "\u00A0"),
            " ",
            React.createElement(ri_1.RiAsterisk, { className: 'text-xxs text-red-500' })),
        React.createElement("div", { className: ".dropdown-container" },
            React.createElement(react_multi_select_component_1.MultiSelect, { options: selectOptions, value: selected, onChange: setSelected, labelledBy: "Select" })),
        React.createElement("div", { className: "mt-4" },
            React.createElement(Button_1.Button, { label: "Add User to Group", type: "button", onClick: handleAddUserToGroup })),
        ((_a = group.users) === null || _a === void 0 ? void 0 : _a.length) > 0 && (React.createElement(Title_1["default"], { title: "Group Users (" + group.users.length + ")" })),
        React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize mb-4" }, (_b = group.users) === null || _b === void 0 ? void 0 : _b.map(function (person) {
            var _a;
            var fullName = (_a = users.find(function (user) { return person.id === user.id; })) === null || _a === void 0 ? void 0 : _a.fullName;
            return (React.createElement(ListItem_1.ListItem, { key: person === null || person === void 0 ? void 0 : person.id, id: person === null || person === void 0 ? void 0 : person.id, title: fullName || '', route: "/users", iconDelete: user.role === 'admin' ? true : false, onClickDeleteIcon: function (e) { return handleRemoveUser(e, person.id); } }));
        })),
        React.createElement(Title_1["default"], { title: "Group Assignments" }),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mb-6" }, assignments
            .filter(function (assignment) { return assignment.groupId === group.id; })
            .map(function (assignment, index) { return (React.createElement(Card_1.Card, { cardType: "card", id: assignment.id, key: index, pointer: true, description: assignment.description, subtitle: assignment.startDate, title: assignment.title })); })),
        React.createElement(Button_1.Button, { label: "Delete Group", type: "button", className: "bg-pink-600 border-pink-600 text-white mb-36", onClick: function (e) {
                handleDeleteGroup(e, Number(groupId));
            } })));
};
exports["default"] = Group;
