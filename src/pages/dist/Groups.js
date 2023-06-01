"use strict";
exports.__esModule = true;
var react_1 = require("react");
var js_cookie_1 = require("js-cookie");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var ListItem_1 = require("../components/ListItem");
var Button_1 = require("../components/Button");
var Groups = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), user = _a.user, groups = _a.groups, setUpdate = _a.setUpdate;
    var navigate = react_router_dom_1.useNavigate();
    var cookieToken = js_cookie_1["default"].get('token');
    var handleDeleteGroup = function (e, groupId) {
        e.preventDefault();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Groups/" + groupId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function () { return setUpdate(true); })["catch"](function (error) {
            navigate("/error");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-end" }, user.role === 'admin' && (React.createElement("div", { className: "md:w-48 md:flex xs:w-full" },
            React.createElement(Button_1.Button, { buttonColor: "white", label: "Add New Group", type: "button", onClick: function () {
                    navigate('/groups/new');
                } })))),
        React.createElement(Title_1["default"], { underline: true, title: "Groups" }),
        React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize mb-32" }, groups.map(function (group) {
            return (React.createElement(ListItem_1.ListItem, { key: group === null || group === void 0 ? void 0 : group.id, id: group === null || group === void 0 ? void 0 : group.id, title: group === null || group === void 0 ? void 0 : group.name, route: "/groups", onClickDeleteIcon: function (e) { return handleDeleteGroup(e, group.id); } }));
        }))));
};
exports["default"] = Groups;
