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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppProvider = exports.AppContext = void 0;
var axios_1 = require("axios");
var react_1 = require("react");
var js_cookie_1 = require("js-cookie");
var react_router_dom_1 = require("react-router-dom");
var react_secure_storage_1 = require("react-secure-storage");
var jwt_decode_1 = require("jwt-decode");
var AppContext = react_1.createContext(null);
exports.AppContext = AppContext;
var AppProvider = function (_a) {
    var children = _a.children;
    var cookieToken = js_cookie_1["default"].get('token');
    var _b = react_1.useState(undefined), userGoogleToken = _b[0], setUserGoogleToken = _b[1];
    var _c = react_1.useState({}), user = _c[0], setUser = _c[1];
    var _d = react_1.useState({}), profile = _d[0], setProfile = _d[1];
    var _e = react_1.useState([]), assignments = _e[0], setAssignments = _e[1];
    var _f = react_1.useState([]), users = _f[0], setUsers = _f[1];
    var _g = react_1.useState([]), groups = _g[0], setGroups = _g[1];
    var _h = react_1.useState(false), update = _h[0], setUpdate = _h[1];
    // eslint-disable-next-line
    var _j = react_1.useState(false), refresh = _j[0], setRefresh = _j[1];
    var _k = react_1.useState(false), isLoggedIn = _k[0], setIsLoggedIn = _k[1];
    var localUserId = react_secure_storage_1["default"].getItem('id');
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        if (userGoogleToken && profile.name !== undefined) {
            axios_1["default"]
                .put('https://project-salty-backend.azurewebsites.net/Users/login', {
                googleId: userGoogleToken.access_token,
                email: profile.email,
                fullName: profile.name,
                imageUrl: profile.picture
            })
                .then(function (res) {
                setUser(res.data);
                js_cookie_1["default"].set('token', res.data.token);
                react_secure_storage_1["default"].setItem('id', res.data.id);
                react_secure_storage_1["default"].setItem('role', res.data.role);
                react_secure_storage_1["default"].setItem('refreshToken', res.data.refreshToken);
                setIsLoggedIn(true);
                navigate('/home');
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        // eslint-disable-next-line
    }, [profile, userGoogleToken, update]);
    react_1.useEffect(function () {
        var token = js_cookie_1["default"].get('token');
        setRefresh(false);
        if (token) {
            var expiry = jwt_decode_1["default"](token.toString());
            var exp = expiry.exp;
            if (exp) {
                var expirationTime = Number(exp) * 1000 - 60000;
                // const expirationTime = Number(exp) * 1000 - 28 * 60 * 1000;
                var currentTime = Date.now();
                if (expirationTime < currentTime) {
                    updateToken();
                }
                else {
                    setIsLoggedIn(true);
                }
            }
        }
        else {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [refresh, localUserId]);
    var updateToken = function () { return __awaiter(void 0, void 0, void 0, function () {
        var userId, refreshToken, expiry, exp, response, newAccessToken, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = react_secure_storage_1["default"].getItem('id');
                    refreshToken = react_secure_storage_1["default"].getItem('refreshToken');
                    if (!refreshToken) return [3 /*break*/, 5];
                    expiry = jwt_decode_1["default"](refreshToken.toString());
                    exp = expiry.exp;
                    if (!exp) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("https://project-salty-backend.azurewebsites.net/Users/refreshToken?id=" + userId, {
                            headers: {
                                Authorization: "Bearer " + refreshToken,
                                Accept: 'text/plain'
                            }
                        })];
                case 2:
                    response = _a.sent();
                    newAccessToken = response === null || response === void 0 ? void 0 : response.data;
                    react_secure_storage_1["default"].removeItem('refreshToken');
                    js_cookie_1["default"].set('token', newAccessToken);
                    react_secure_storage_1["default"].setItem('refreshToken', newAccessToken);
                    setRefresh(true);
                    setIsLoggedIn(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setIsLoggedIn(false);
                    navigate('/');
                    js_cookie_1["default"].remove('token');
                    react_secure_storage_1["default"].clear();
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    navigate('/');
                    js_cookie_1["default"].remove('token');
                    react_secure_storage_1["default"].clear();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (isLoggedIn && localUserId !== null) {
            axios_1["default"]
                .get("https://project-salty-backend.azurewebsites.net/Users/" + localUserId, {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setUser(__assign({}, response.data));
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        // eslint-disable-next-line
    }, [cookieToken, localUserId, isLoggedIn]);
    react_1.useEffect(function () {
        if (isLoggedIn && localUserId !== null) {
            axios_1["default"]
                .get('https://project-salty-backend.azurewebsites.net/Users', {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setUsers(__spreadArrays(response.data));
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        // eslint-disable-next-line
    }, [cookieToken, localUserId, user.role, isLoggedIn]);
    react_1.useEffect(function () {
        if (isLoggedIn && cookieToken) {
            axios_1["default"]
                .get('https://project-salty-backend.azurewebsites.net/Groups', {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                setGroups(__spreadArrays(response.data));
                setUpdate(false);
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        // eslint-disable-next-line
    }, [cookieToken, update, isLoggedIn]);
    react_1.useEffect(function () {
        if (isLoggedIn && cookieToken) {
            if (user.role === 'admin') {
                axios_1["default"]
                    .get('https://project-salty-backend.azurewebsites.net/Assignments', {
                    headers: {
                        Authorization: "Bearer " + cookieToken,
                        Accept: 'text/plain'
                    }
                })
                    .then(function (response) {
                    setAssignments(__spreadArrays(response.data));
                })["catch"](function (error) {
                    navigate("/error");
                });
            }
            else if (user.role === 'pgp') {
                axios_1["default"]
                    .get("https://project-salty-backend.azurewebsites.net/Assignments/user/" + user.id, {
                    headers: {
                        Authorization: "Bearer " + cookieToken,
                        Accept: 'text/plain'
                    }
                })
                    .then(function (response) {
                    setAssignments(response.data);
                })["catch"](function (error) {
                    navigate("/error");
                });
            }
        }
        // eslint-disable-next-line
    }, [user, cookieToken, isLoggedIn]);
    return (React.createElement(AppContext.Provider, { value: {
            groups: groups,
            user: user,
            profile: profile,
            setUser: setUser,
            setUsers: setUsers,
            setProfile: setProfile,
            assignments: assignments,
            setAssignments: setAssignments,
            setGroups: setGroups,
            setUpdate: setUpdate,
            users: users,
            userGoogleToken: userGoogleToken,
            setUserGoogleToken: setUserGoogleToken
        } }, children));
};
exports.AppProvider = AppProvider;
