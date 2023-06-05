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
exports.__esModule = true;
var axios_1 = require("axios");
var js_cookie_1 = require("js-cookie");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var Input_1 = require("../components/Input");
var Button_1 = require("../components/Button");
var Datepicker_1 = require("../components/Datepicker");
var react_quill_1 = require("react-quill");
var moment_1 = require("moment");
var InputErrorAlert_1 = require("../components/InputErrorAlert");
var ri_1 = require("react-icons/ri");
var RichTextEditor_1 = require("../components/RichTextEditor");
moment_1["default"]().format();
var convertDate = function (date) {
    var initialDate = new Date(date);
    var convertedDate = moment_1["default"](initialDate).format('YYYY-MM-DD');
    return convertedDate;
};
var UpdateAssignment = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), groups = _a.groups, assignments = _a.assignments, setAssignments = _a.setAssignments;
    var _b = react_1.useState(''), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(''), startDate = _c[0], setStartDate = _c[1];
    var _d = react_1.useState(''), description = _d[0], setDescription = _d[1];
    var _e = react_1.useState({
        id: 0,
        name: '',
        users: [],
        assignmentsId: []
    }), group = _e[0], setGroup = _e[1];
    var _f = react_1.useState({
        title: true,
        startDate: true,
        description: true
    }), isValid = _f[0], setIsValid = _f[1];
    var _g = react_1.useState(false), toShowValidationError = _g[0], setToShowValidationError = _g[1];
    var cookieToken = js_cookie_1["default"].get('token');
    var assignmentId = react_router_dom_1.useParams().assignmentId;
    var navigate = react_router_dom_1.useNavigate();
    var regexForDescription = /(?<=>)[\w\s]+(?=<)/g;
    react_1.useEffect(function () {
        axios_1["default"]
            .get("https://project-salty-backend.azurewebsites.net/Assignments/" + assignmentId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function (response) {
            var _a;
            var group = groups.find(function (group) { return group.id === response.data.groupId; });
            var date = convertDate(response.data.startDate);
            setTitle(response.data.title);
            setStartDate(date);
            group && setGroup(group);
            setDescription((_a = response.data) === null || _a === void 0 ? void 0 : _a.description);
        })["catch"](function (error) {
            navigate("/error");
        });
        // eslint-disable-next-line
    }, [assignmentId, cookieToken, groups]);
    react_1.useEffect(function () {
        setIsValid(__assign(__assign({}, isValid), { title: title ? true : false, startDate: startDate ? true : false, description: regexForDescription.test(description.replace("<br>", "")) ? true : false }));
        // eslint-disable-next-line
    }, [title, startDate, description]);
    var handleUpdateAssignment = function (e) {
        e.preventDefault();
        var updatedAssignment;
        if (isValid.startDate === true &&
            isValid.title === true &&
            isValid.description === true) {
            updatedAssignment = {
                title: title,
                startDate: startDate,
                description: description,
                groupId: group.id
            };
            axios_1["default"]
                .put("https://project-salty-backend.azurewebsites.net/Assignments/" + assignmentId, __assign({}, updatedAssignment), {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function () {
                navigate("/assignments/" + assignmentId);
            })["catch"](function (error) {
                navigate("/error");
            });
        }
        else {
            setToShowValidationError(true);
        }
    };
    var handleDeleteAssignment = function (e) {
        e.preventDefault();
        axios_1["default"]["delete"]("https://project-salty-backend.azurewebsites.net/Assignments/" + assignmentId, {
            headers: {
                Authorization: "Bearer " + cookieToken,
                Accept: 'text/plain'
            }
        })
            .then(function () {
            setAssignments(assignments.filter(function (assignment) { return assignment.id !== Number(assignmentId); }));
            navigate("/home");
        })["catch"](function (error) {
            navigate("/error");
        });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: handleUpdateAssignment },
            react_1["default"].createElement(Title_1["default"], { underline: true, title: "Update Assignment" }),
            react_1["default"].createElement(Input_1.Input, { label: "Title", onChange: function (e) { return setTitle(e.target.value); }, value: title, required: true }),
            react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.title, toShowValidationError: toShowValidationError }),
            react_1["default"].createElement(Datepicker_1["default"], { value: startDate, required: true, onChange: function (e) {
                    return setStartDate(e.target.value);
                } }),
            react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.startDate, toShowValidationError: toShowValidationError }),
            react_1["default"].createElement(Input_1.Input, { label: "Group", disabled: true, placeholder: group === null || group === void 0 ? void 0 : group.name, value: group === null || group === void 0 ? void 0 : group.name }),
            react_1["default"].createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
                "Details ",
                react_1["default"].createElement("span", null, "\u00A0"),
                ' ',
                react_1["default"].createElement(ri_1.RiAsterisk, { className: "text-[10px] text-red-500" })),
            react_1["default"].createElement(react_quill_1["default"], { className: "h-44 mb-14", theme: "snow", modules: RichTextEditor_1.modules, formats: RichTextEditor_1.formats, value: description, onChange: function (e) { return setDescription(e); } }),
            react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.description, toShowValidationError: toShowValidationError }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Button_1.Button, { label: "Update Assignment", type: "submit" })),
            react_1["default"].createElement("div", { className: "mb-32" },
                react_1["default"].createElement(Button_1.Button, { buttonColor: "pink", label: "Delete Assignment", type: "button", onClick: handleDeleteAssignment })))));
};
exports["default"] = UpdateAssignment;
