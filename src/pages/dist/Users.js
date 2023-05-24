"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Input_1 = require("../components/Input");
var Title_1 = require("../components/Title");
var ListItem_1 = require("../components/ListItem");
var Button_1 = require("../components/Button");
var Users = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), user = _a.user, users = _a.users;
    var navigate = react_router_dom_1.useNavigate();
    var _b = react_1.useState(''), search = _b[0], setSearch = _b[1];
    var handleEditUser = function (e, id) {
        e.preventDefault();
        e.stopPropagation();
        navigate("/users/" + id + "/update");
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-end" }, user.role === 'admin' && (React.createElement("div", { className: "md:w-48 md:flex xs:w-full" },
            React.createElement(Button_1.Button, { buttonColor: "white", label: "Add User", type: "button", onClick: function () {
                    navigate('/users/new');
                } })))),
        React.createElement(Input_1.Input, { icon: true, placeholder: "Search", onChange: function (e) { return setSearch(e.target.value); } }),
        React.createElement(Title_1["default"], { underline: true, title: "Users" }),
        React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize mb-32" }, users.map(function (person, index) {
            if (search === '' || (person === null || person === void 0 ? void 0 : person.fullName.toLowerCase().includes(search.toLowerCase())))
                return (React.createElement(ListItem_1.ListItem, { key: index, id: person === null || person === void 0 ? void 0 : person.id, title: person === null || person === void 0 ? void 0 : person.fullName, route: "/users", iconEdit: user.role === 'pgp' ? false : true, onClickEditIcon: function (e) { return handleEditUser(e, person.id); } }));
            return React.createElement("div", { key: index });
        }))));
};
exports["default"] = Users;
