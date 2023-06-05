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
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var Input_1 = require("../components/Input");
var react_multi_select_component_1 = require("react-multi-select-component");
var Button_1 = require("../components/Button");
var ri_1 = require("react-icons/ri");
var InputErrorAlert_1 = require("../components/InputErrorAlert");
var AssignAssignmentToGroup = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), groups = _a.groups, assignments = _a.assignments, setAssignments = _a.setAssignments;
    var _b = react_1.useState({
        id: undefined,
        title: "",
        startDate: "",
        description: "",
        groupId: undefined
    }), assignment = _b[0], setAssignment = _b[1];
    var selectOptions = groups === null || groups === void 0 ? void 0 : groups.map(function (item) {
        var option = {
            label: item.name,
            value: item.id,
            disabled: false
        };
        return option;
    });
    var _c = react_1.useState([]), groupsWithCurrentAssignment = _c[0], setGroupsWithCurrentAssignment = _c[1];
    selectOptions.map(function (item) {
        if (groupsWithCurrentAssignment === null || groupsWithCurrentAssignment === void 0 ? void 0 : groupsWithCurrentAssignment.some(function (id) { return id === item.value; })) {
            item.disabled = true;
            return item;
        }
        return item;
    });
    var _d = react_1.useState([]), selected = _d[0], setSelected = _d[1];
    var selectedGroupIds = selected.map(function (group) { return group.value; });
    var _e = react_1.useState({
        groups: false
    }), isValid = _e[0], setIsValid = _e[1];
    var _f = react_1.useState(false), toShowValidationError = _f[0], setToShowValidationError = _f[1];
    var cookieToken = js_cookie_1["default"].get('token');
    var assignmentId = react_router_dom_1.useParams().assignmentId;
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Assignments/" + assignmentId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            setAssignment(response.data);
        })["catch"](function (error) {
            navigate("/error");
        });
        // eslint-disable-next-line
    }, [assignmentId, cookieToken]);
    react_1.useEffect(function () {
        var groupsWithCurAssignment = [];
        assignments.forEach(function (item) {
            if (assignment.groupId !== undefined && (assignment === null || assignment === void 0 ? void 0 : assignment.title) === (item === null || item === void 0 ? void 0 : item.title)) {
                groupsWithCurAssignment.push(item.groupId);
                return;
            }
        });
        setGroupsWithCurrentAssignment(groupsWithCurAssignment);
        // eslint-disable-next-line
    }, [assignments, assignment]);
    react_1.useEffect(function () {
        setIsValid(__assign(__assign({}, isValid), { groups: selected.length > 0 ? true : false }));
        // eslint-disable-next-line
    }, [selected]);
    var handleAssiignAssignmentToGroup = function (e) {
        e.preventDefault();
        if (isValid.groups === true) {
            selectedGroupIds.forEach(function (groupId) {
                var newAssignment = {
                    title: assignment.title,
                    startDate: assignment.startDate,
                    description: assignment.description,
                    groupId: groupId
                };
                axios_1["default"]
                    .post("https://project-salty-backend.azurewebsites.net/Assignments/", __assign({}, newAssignment), {
                    headers: {
                        Authorization: "Bearer " + cookieToken,
                        Accept: 'text/plain'
                    }
                })
                    .then(function (response) {
                    setAssignments(__spreadArrays(assignments, [response.data]));
                    navigate("/home");
                })["catch"](function (error) {
                    navigate("/error");
                });
            });
        }
        else {
            setToShowValidationError(true);
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: handleAssiignAssignmentToGroup },
            react_1["default"].createElement(Title_1["default"], { underline: true, title: "Assign Assignment to Groups" }),
            react_1["default"].createElement(Input_1.Input, { label: "Title", disabled: true, onChange: function (e) { return setAssignment(__assign(__assign({}, assignment), { title: e.target.value })); }, value: assignment === null || assignment === void 0 ? void 0 : assignment.title }),
            react_1["default"].createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
                "Groups  ",
                react_1["default"].createElement("span", null, "\u00A0"),
                " ",
                react_1["default"].createElement(ri_1.RiAsterisk, { className: 'text-[10px] text-red-500' })),
            react_1["default"].createElement("div", { className: ".dropdown-container mb-4" },
                react_1["default"].createElement(react_multi_select_component_1.MultiSelect, { options: selectOptions, value: selected, onChange: setSelected, labelledBy: "Select" })),
            react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.groups, toShowValidationError: toShowValidationError }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Button_1.Button, { label: "Assign to Groups", type: "submit" })))));
};
exports["default"] = AssignAssignmentToGroup;
