"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Repo_1 = require("../components/Repo");
var Title_1 = require("../components/Title");
var Button_1 = require("../components/Button");
var UserDetails_1 = require("../components/UserDetails");
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var react_secure_storage_1 = require("react-secure-storage");
var ListItem_1 = require("../components/ListItem");
var Profile = function () {
    var _a;
    var _b = react_1.useContext(AppContext_1.AppContext), user = _b.user, assignments = _b.assignments, groups = _b.groups;
    var cookieToken = js_cookie_1["default"].get('token');
    var _c = react_1.useState([]), repos = _c[0], setRepos = _c[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleLogout = function () {
        navigate('/');
        js_cookie_1["default"].remove('token');
        react_secure_storage_1["default"].clear();
    };
    var userGroups = (_a = user.groupsId) === null || _a === void 0 ? void 0 : _a.map(function (group) {
        var currentGroup = groups.find(function (item) { return item.id === group; });
        var groupObj = {
            id: group,
            name: currentGroup === null || currentGroup === void 0 ? void 0 : currentGroup.name
        };
        return groupObj;
    });
    react_1.useEffect(function () {
        if (user.id !== undefined) {
            axios_1["default"]
                .get("https://project-salty-backend.azurewebsites.net/Repos/User/" + user.id, {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setRepos(response.data);
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        // eslint-disable-next-line
    }, [cookieToken, user.id]);
    var handleDeleteRepo = function (e, id) {
        e.preventDefault();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Repos/" + id, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function () {
            var newReposList = repos.filter(function (repo) { return repo.id !== id; });
            setRepos(newReposList);
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-end" }, user.role === 'admin' && (React.createElement("div", { className: "w-48 hidden md:flex" },
            React.createElement(Button_1.Button, { buttonColor: "pink", type: "button", label: "Logout", className: " hover:bg-pink-600 hover:text-white", onClick: handleLogout })))),
        React.createElement(UserDetails_1["default"], { id: user.id, name: user.fullName, email: user.email, location: user.location, imageUrl: user.imageUrl, bootcamp: user.role === 'admin' ? 'Instructors group' : user.bootcamp }),
        userGroups && userGroups.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Groups (" + (userGroups === null || userGroups === void 0 ? void 0 : userGroups.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" },
            React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize gap-x-1 w-full" }, userGroups === null || userGroups === void 0 ? void 0 : userGroups.map(function (group, index) {
                return (React.createElement(ListItem_1.ListItem, { key: group === null || group === void 0 ? void 0 : group.id, id: group === null || group === void 0 ? void 0 : group.id, title: (group === null || group === void 0 ? void 0 : group.name) || '', route: user.role === 'admin' ? "/groups" : '' }));
            }))),
        repos.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Completed Assignments (" + (repos === null || repos === void 0 ? void 0 : repos.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" }, repos === null || repos === void 0 ? void 0 : repos.map(function (repo, index) {
            var repoAssignment = assignments === null || assignments === void 0 ? void 0 : assignments.find(function (assignment) { return assignment.id === repo.assignmentId; });
            return (React.createElement(Repo_1.Repo, { id: repo.id, key: index, assignment: (repoAssignment === null || repoAssignment === void 0 ? void 0 : repoAssignment.title) || '', repoUrl: repo.url, deleteIcon: true, assignmentUrl: repo.assignmentId, onClick: function (e) { return handleDeleteRepo(e, repo.id); } }));
        })),
        React.createElement("div", { className: "flex justify-center mx-2 mt-4 mb-32" }, user.role === 'admin' && (React.createElement("div", { className: "w-full md:hidden flex" },
            React.createElement(Button_1.Button, { label: "Logout", type: "button", className: "bg-pink-600 border-pink-600 text-white border-", onClick: handleLogout }))))));
};
exports["default"] = Profile;
