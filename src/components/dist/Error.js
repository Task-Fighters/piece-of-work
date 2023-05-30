"use strict";
exports.__esModule = true;
exports.Error = void 0;
var cg_1 = require("react-icons/cg");
exports.Error = function (_a) {
    var errorCode = _a.errorCode, text = _a.text;
    return (React.createElement("div", null,
        React.createElement(cg_1.CgSmileSad, { className: 'text-gray-600 text-8xl' }),
        React.createElement("p", { className: "text" }, "Something went wrong!")));
};
