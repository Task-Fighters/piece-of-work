"use strict";
exports.__esModule = true;
exports.Error = void 0;
var cg_1 = require("react-icons/cg");
exports.Error = function (_a) {
    var errorCode = _a.errorCode, text = _a.text;
    return (React.createElement("div", { className: 'flex flex-col justify-center w-full items-center' },
        React.createElement(cg_1.CgSmileSad, { className: 'text-gray-600 text-9xl' }),
        React.createElement("p", { className: "text-5xl mt-6 text-pink-600" }, "Something went wrong!")));
};
exports["default"] = exports.Error;
