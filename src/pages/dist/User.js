"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    var userGroups = (_a = user.groupsId) === null || _a === void 0 ? void 0 : _a.map(function (group) {
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
            navigate("/error");
        });
    }, [userId, cookieToken]);
    react_1.useEffect(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1["default"].get("https://project-salty-backend.azurewebsites.net/Repos/User/" + userId, {
                                headers: {
                                    Authorization: "Bearer " + cookieToken,
                                    Accept: 'text/plain'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        setRepos(response.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, [cookieToken, userId]);
    return (React.createElement(React.Fragment, null,
        React.createElement(UserDetails_1["default"], { id: singleUser.id, name: singleUser.fullName, email: singleUser.email, imageUrl: singleUser.imageUrl, location: singleUser.location, bootcamp: singleUser.role === 'admin' ? 'Instructors group' : user.bootcamp }),
        userGroups && userGroups.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Groups (" + (userGroups === null || userGroups === void 0 ? void 0 : userGroups.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" },
            React.createElement("ul", { className: "flex flex-row flex-wrap justify-between capitalize gap-x-1 w-full" }, userGroups === null || userGroups === void 0 ? void 0 : userGroups.map(function (group, index) {
                return (React.createElement(ListItem_1.ListItem, { key: group === null || group === void 0 ? void 0 : group.id, id: group === null || group === void 0 ? void 0 : group.id, title: (group === null || group === void 0 ? void 0 : group.name) || "", route: user.role === 'admin' ? "/groups" : "" }));
            }))),
        repos.length > 0 && (React.createElement(Title_1["default"], { className: "mx-2 md:mx-0 md:my-2", underline: true, title: "Completed Assignments (" + (repos === null || repos === void 0 ? void 0 : repos.length) + ")" })),
        React.createElement("div", { className: "flex flex-row flex-wrap justify-between mx-2 md:m-0" }, repos === null || repos === void 0 ? void 0 : repos.map(function (repo, index) {
            var _a;
            var name = (_a = assignments.find(function (assign) { return assign.id === repo.assignmentId; })) === null || _a === void 0 ? void 0 : _a.title;
            return (React.createElement(Repo_1.Repo, { id: repo.id, key: index, assignment: name || '', repoUrl: repo.url, assignmentUrl: repo.assignmentId }));
        }))));
};
exports["default"] = User;
