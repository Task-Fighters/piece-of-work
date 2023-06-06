"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Input_1 = require("../components/Input");
var Card_1 = require("../components/Card");
var Button_1 = require("../components/Button");
var Title_1 = require("../components/Title");
var Home = function () {
    var _a;
    var _b = react_1.useContext(AppContext_1.AppContext), user = _b.user, assignments = _b.assignments, groups = _b.groups;
    var navigate = react_router_dom_1.useNavigate();
    var _c = react_1.useState(''), search = _c[0], setSearch = _c[1];
    var currentDate = new Date();
    var filteredAssignments = assignments.filter(function (assignment) {
        return (search === '' ||
            assignment.title.toLowerCase().includes(search.toLowerCase()));
    });
    var closestStartDate = (_a = filteredAssignments
        .filter(function (assignment) { return new Date(assignment.startDate) <= currentDate; })
        .sort(function (a, b) {
        return Math.abs(currentDate.getTime() - new Date(a.startDate).getTime()) -
            Math.abs(currentDate.getTime() - new Date(b.startDate).getTime());
    })[0]) === null || _a === void 0 ? void 0 : _a.startDate;
    var featuredAssignments = filteredAssignments.filter(function (assignment) { return assignment.startDate === closestStartDate; });
    var upcomingAssignments = filteredAssignments
        .filter(function (assignment) {
        return new Date(assignment.startDate).getTime() > new Date().getTime();
    })
        .sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    var pastAssignments = filteredAssignments
        .filter(function (assignment) {
        return new Date(assignment.startDate).getTime() <= new Date().getTime() &&
            !featuredAssignments.includes(assignment);
    })
        .sort(function (a, b) {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "float-right" }, user.role === 'admin' && (React.createElement("div", { className: "w-48 hidden md:flex" },
            React.createElement(Button_1.Button, { buttonColor: "white", label: "Add new Assignment", type: "button", onClick: function () {
                    navigate('/assignments/new');
                } })))),
        React.createElement(Input_1.Input, { icon: true, placeholder: "Search", onChange: function (e) { return setSearch(e.target.value); } }),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mb-6" }, featuredAssignments.map(function (assignment, index) {
            var _a;
            var groupName = (_a = groups.find(function (group) { return group.id === assignment.groupId; })) === null || _a === void 0 ? void 0 : _a.name;
            return (React.createElement(Card_1.Card, { cardType: "feature", id: assignment.id, key: index, pointer: true, description: assignment.description, subtitle: assignment.startDate, title: assignment.title, group: groupName }));
        })),
        user.role === 'admin' && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Upcoming Assignments (" + (upcomingAssignments === null || upcomingAssignments === void 0 ? void 0 : upcomingAssignments.length) + ")" })),
        user.role === 'admin' && (React.createElement("div", { className: "flex flex-row flex-wrap justify-between mb-6" }, upcomingAssignments.map(function (assignment, index) {
            var _a;
            var groupName = (_a = groups.find(function (group) { return group.id === assignment.groupId; })) === null || _a === void 0 ? void 0 : _a.name;
            return (React.createElement(Card_1.Card, { cardType: 'card', id: assignment.id, pointer: true, key: index, description: assignment.description, subtitle: assignment.startDate, title: assignment.title, group: groupName }));
        }))),
        React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Past Assignments (" + (pastAssignments === null || pastAssignments === void 0 ? void 0 : pastAssignments.length) + ")" }),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mb-32" }, pastAssignments.map(function (assignment, index) {
            var _a;
            var groupName = (_a = groups.find(function (group) { return group.id === assignment.groupId; })) === null || _a === void 0 ? void 0 : _a.name;
            return (React.createElement(Card_1.Card, { cardType: "card", id: assignment.id, key: index, pointer: true, description: assignment.description, subtitle: assignment.startDate, title: assignment.title, group: groupName }));
        }))));
};
exports["default"] = Home;
