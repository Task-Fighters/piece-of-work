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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var js_cookie_1 = require("js-cookie");
var react_quill_1 = require("react-quill");
var axios_1 = require("axios");
var Title_1 = require("../components/Title");
var Input_1 = require("../components/Input");
var AppContext_1 = require("../AppContext");
var Button_1 = require("../components/Button");
var Datepicker_1 = require("../components/Datepicker");
require("react-quill/dist/quill.snow.css");
var react_select_1 = require("react-select");
var ri_1 = require("react-icons/ri");
var InputErrorAlert_1 = require("../components/InputErrorAlert");
var modules = {
    toolbar: [
        [
            { header: [2, 3, 4, 5, 6, false] },
            { color: [] },
            { background: [] },
            'bold',
            'italic',
            'strike',
            'underline',
            'link',
            'blockquote',
            'code-block',
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
            'link',
            'image',
            'video',
            'clean'
        ]
    ]
};
var AddAssignment = function () {
    var groups = react_1.useContext(AppContext_1.AppContext).groups;
    var _a = react_1.useState(''), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(''), startDate = _b[0], setStartDate = _b[1];
    var _c = react_1.useState(''), description = _c[0], setDescription = _c[1];
    var navigate = react_router_dom_1.useNavigate();
    var cookieToken = js_cookie_1["default"].get('token');
    var selectOptions = groups.map(function (item) { return ({
        label: item.name,
        value: item.id
    }); });
    var _d = react_1.useState({}), selectedGroups = _d[0], setSelectedGroups = _d[1];
    var _e = react_1.useState({
        title: false,
        startDate: false,
        description: false,
        groupId: false
    }), isValid = _e[0], setIsValid = _e[1];
    var _f = react_1.useState(false), toShowValidationError = _f[0], setToShowValidationError = _f[1];
    react_1.useEffect(function () {
        setIsValid(__assign(__assign({}, isValid), { title: title ? true : false, startDate: startDate ? true : false, description: description ? true : false, groupId: selectedGroups.value ? true : false }));
        // eslint-disable-next-line
    }, [title, startDate, description, selectedGroups]);
    var handleSubmit = function (e) {
        e.preventDefault();
        var newAssignment;
        if (isValid.startDate === true &&
            isValid.title === true &&
            isValid.description === true &&
            isValid.groupId === true) {
            newAssignment = {
                title: title,
                startDate: startDate,
                description: description,
                groupId: selectedGroups.value
            };
            axios_1["default"]
                .post("https://project-salty-backend.azurewebsites.net/Assignments", __assign({}, newAssignment), {
                headers: {
                    Authorization: "Bearer " + cookieToken,
                    Accept: 'text/plain'
                }
            })
                .then(function (response) {
                navigate("/assignments/" + response.data.id);
            })["catch"](function (error) {
                navigate("/error");
            });
            var target = e.target;
            target.reset();
            setTitle('');
            setStartDate('');
            setDescription('');
        }
        else {
            setToShowValidationError(true);
        }
    };
    var handleChangeGroup = function (selectedOption) {
        setSelectedGroups(selectedOption);
    };
    return (react_1["default"].createElement("form", { onSubmit: handleSubmit, id: "formList" },
        react_1["default"].createElement(Title_1["default"], { underline: true, title: "Add New Assignment" }),
        react_1["default"].createElement(Input_1.Input, { label: "Title", required: true, onChange: function (e) { return setTitle(e.target.value); }, value: title }),
        react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.title, toShowValidationError: toShowValidationError }),
        react_1["default"].createElement(Datepicker_1["default"], { value: startDate, required: true, onChange: function (e) {
                return setStartDate(e.target.value);
            } }),
        react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.startDate, toShowValidationError: toShowValidationError }),
        react_1["default"].createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
            "Group ",
            react_1["default"].createElement("span", null, "\u00A0"),
            ' ',
            react_1["default"].createElement(ri_1.RiAsterisk, { className: "text-[10px] text-red-500" })),
        react_1["default"].createElement("div", { className: ".dropdown-container" },
            react_1["default"].createElement(react_select_1["default"], { className: "mb-4 ", classNamePrefix: "single_select", onChange: handleChangeGroup, options: selectOptions, value: selectedGroups })),
        react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.groupId, toShowValidationError: toShowValidationError }),
        react_1["default"].createElement("label", { className: "text-pink-600 text-lg font-bold font-sans flex items-center" },
            "Details ",
            react_1["default"].createElement("span", null, "\u00A0"),
            ' ',
            react_1["default"].createElement(ri_1.RiAsterisk, { className: "text-[10px] text-red-500" })),
        react_1["default"].createElement(react_quill_1["default"], { className: "h-44 mb-14", theme: "snow", modules: modules, value: description, onChange: function (e) { return setDescription(e); } }),
        react_1["default"].createElement(InputErrorAlert_1.InputErrorAlert, { isValid: isValid.description, toShowValidationError: toShowValidationError }),
        react_1["default"].createElement("div", { className: "mb-32 mt-20 md:mt-0" },
            react_1["default"].createElement(Button_1.Button, { label: "Add Assignment", type: "submit" }))));
};
exports["default"] = AddAssignment;
