"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var js_cookie_1 = require("js-cookie");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var UserDetails_1 = require("../components/UserDetails");
var Repo_1 = require("../components/Repo");
var ListItem_1 = require("../components/ListItem");
var react_router_dom_2 = require("react-router-dom");
var User = function () {
    var _a;
    var _b = react_1.useContext(AppContext_1.AppContext), user = _b.user, assignments = _b.assignments, groups = _b.groups;
    var _c = react_1.useState({}), singleUser = _c[0], setSingleUser = _c[1];
    var userId = react_router_dom_1.useParams().userId;
    var _d = react_1.useState([]), repos = _d[0], setRepos = _d[1];
    var cookieToken = js_cookie_1["default"].get('token');
    var navigate = react_router_dom_2.useNavigate();
    var userGroups = (_a = singleUser === null || singleUser === void 0 ? void 0 : singleUser.groupsId) === null || _a === void 0 ? void 0 : _a.map(function (group) {
        var currentGroup = groups.find(function (item) { return item.id === group; });
        var groupObj = {
            id: group,
            name: currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.name
        };
        return groupObj;
    });
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
        })["catch"](function (error) {
            navigate('/error');
        });
        // eslint-disable-next-line
    }, [userId, cookieToken]);
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Repos/User/" + userId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            setRepos(response.data);
        })["catch"](function (error) {
            navigate('/error');
        });
        // eslint-disable-next-line
    }, [cookieToken, userId]);
    return (React.createElement(React.Fragment, null,
        React.createElement(UserDetails_1["default"], { id: singleUser.id, name: singleUser.fullName, email: singleUser.email, imageUrl: singleUser.imageUrl, location: singleUser.location, bootcamp: singleUser.role === 'admin' ? 'Instructors group' : singleUser.bootcamp }),
        userGroups && userGroups.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Groups (" + (userGroups === null || userGroups === void 0 ? void 0 : userGroups.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" },
            React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize gap-x-1 w-full" }, userGroups === null || userGroups === void 0 ? void 0 : userGroups.map(function (group, index) {
                return (React.createElement(ListItem_1.ListItem, { key: group === null || group === void 0 ? void 0 : group.id, id: group === null || group === void 0 ? void 0 : group.id, title: (group === null || group === void 0 ? void 0 : group.name) || '', route: user.role === 'admin' ? "/groups" : '' }));
            }))),
        repos.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Completed Assignments (" + (repos === null || repos === void 0 ? void 0 : repos.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" }, repos === null || repos === void 0 ? void 0 : repos.map(function (repo, index) {
            var _a;
            var name = (_a = assignments.find(function (assign) { return assign.id === repo.assignmentId; })) === null || _a === void 0 ? void 0 : _a.title;
            return (React.createElement(Repo_1.Repo, { id: repo.id, key: index, assignment: name || '', repoUrl: repo.url, assignmentUrl: repo.assignmentId }));
        }))));
};
exports["default"] = User;
