"use strict";
exports.__esModule = true;
exports.InputErrorAlert = void 0;
var ri_1 = require("react-icons/ri");
exports.InputErrorAlert = function (_a) {
    var isValid = _a.isValid, toShowValidationError = _a.toShowValidationError, errorMessage = _a.errorMessage;
    return (React.createElement("p", { className: isValid === false && toShowValidationError === true ? "text-[12px] flex font-sans text-red-500 items-center -mt-2 mb-4 transition ease-in-out delay-150 visible;" : "invisible -mt-4 mb-0 text-[0px] transition ease-in-out delay-150" },
        React.createElement(ri_1.RiAlertFill, { className: 'text-lg text-red-500' }),
        React.createElement("span", null, "\u00A0"),
        " ",
        errorMessage ? errorMessage : "Please fill in the required field"));
};
