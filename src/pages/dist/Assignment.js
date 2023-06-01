"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var js_cookie_1 = require("js-cookie");
var AppContext_1 = require("../AppContext");
var Button_1 = require("../components/Button");
var Card_1 = require("../components/Card");
var Input_1 = require("../components/Input");
var Title_1 = require("../components/Title");
var ListItem_1 = require("../components/ListItem");
var SkeletonCard_1 = require("../components/SkeletonCard");
var Assignment = function () {
    var _a;
    var _b = react_1.useContext(AppContext_1.AppContext), user = _b.user, users = _b.users, groups = _b.groups;
    var _c = react_1.useState({}), assignment = _c[0], setAssignment = _c[1];
    var _d = react_1.useState(''), repoName = _d[0], setRepoName = _d[1];
    var _e = react_1.useState([]), repos = _e[0], setRepos = _e[1];
    var _f = react_1.useState(true), isLoading = _f[0], setIsLoading = _f[1];
    var cookieToken = js_cookie_1["default"].get('token');
    var assignmentId = react_router_dom_1.useParams().assignmentId;
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        setTimeout(function () {
            axios_1["default"]
                .get("https://project-salty-backend.azurewebsites.net/Assignments/" + assignmentId, {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setAssignment(response.data);
                setIsLoading(false);
            })["catch"](function (error) {
                navigate("/error");
            });
        }, 500);
    }, [assignmentId, cookieToken]);
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Repos/Assignment/" + assignmentId, {
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
    }, [assignmentId, cookieToken, repoName]);
    var addRepo = function () {
        if ((repoName === null || repoName === void 0 ? void 0 : repoName.trim()) === '') {
            return;
        }
        if (repoName.match(/^(https?:\/\/)(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)) {
            axios_1["default"]
                .post("https://project-salty-backend.azurewebsites.net/Repos", {
                url: repoName,
                assignmentId: assignmentId,
                userId: user.id
            }, {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                console.log(response.data);
                setRepoName('');
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        else {
            alert('Please enter a valid git repo Url');
        }
    };
    var groupName = (_a = groups.find(function (group) { return group.id === assignment.groupId; })) === null || _a === void 0 ? void 0 : _a.name;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-end" }, user.role === 'admin' && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "md:hidden w-full" },
                React.createElement(Button_1.Button, { buttonColor: "white", label: "Assign to group", type: "button", onClick: function () {
                        navigate("/assignments/" + assignmentId + "/assign");
                    } })),
            React.createElement("div", { className: "w-48 hidden md:flex md:flex-col" },
                React.createElement(Button_1.Button, { buttonColor: "white", label: "Assign to group", type: "button", onClick: function () {
                        navigate("/assignments/" + assignmentId + "/assign");
                    } }))))),
        !isLoading ? (assignment && (React.createElement(Card_1.Card, { cardType: "detailed", description: assignment.description, subtitle: assignment.startDate, title: assignment.title, group: groupName, iconEdit: user.role === 'admin' ? true : false, onClickEditIcon: function (e) {
                navigate("/assignments/" + assignmentId + "/update");
            } }))) : (React.createElement(SkeletonCard_1["default"], { title: "", subtitle: "", description: "" })),
        React.createElement(Title_1["default"], { title: "Post completed assignment" }),
        React.createElement("div", { className: "flex flex-col md:flex-row" },
            React.createElement(Input_1.Input, { placeholder: "Git Repository URL", value: repoName, onChange: function (e) {
                    return setRepoName(e.target.value);
                } }),
            React.createElement(Button_1.Button, { className: "md:w-1/4 md:ml-2", label: "Submit", type: "button", onClick: addRepo })),
        (repos === null || repos === void 0 ? void 0 : repos.length) > 0 && (React.createElement(Title_1["default"], { title: "Completed Assignments (" + (repos === null || repos === void 0 ? void 0 : repos.length) + ")" })),
        React.createElement("ul", { className: "flex flex-row flex-wrap justify-between mb-32" }, repos === null || repos === void 0 ? void 0 : repos.map(function (repo) {
            var _a;
            var userName = (_a = users.find(function (user) { return user.id === repo.userId; })) === null || _a === void 0 ? void 0 : _a.fullName;
            return (React.createElement(ListItem_1.ListItem, { key: repo.id, id: repo.userId, title: userName || '', route: "/users" }));
        }))));
};
exports["default"] = Assignment;
