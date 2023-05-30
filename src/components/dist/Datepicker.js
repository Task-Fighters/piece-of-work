"use strict";
exports.__esModule = true;
var Input_1 = require("../components/Input");
var Datepicker = function (_a) {
    var onChange = _a.onChange, value = _a.value, required = _a.required;
    return (React.createElement("div", null,
        React.createElement(Input_1.Input, { value: value, placeholder: "Select a date", date: true, label: "Date", required: required, onChange: onChange })));
};
exports["default"] = Datepicker;
