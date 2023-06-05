"use strict";
exports.__esModule = true;
exports.Error = void 0;
var Title_1 = require("../components/Title");
var Button_1 = require("../components/Button");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
exports.Error = function () {
    var navigate = react_router_dom_1.useNavigate();
    return (react_1["default"].createElement("div", { className: "flex flex-col justify-center w-full items-center h-[60vh]" },
        react_1["default"].createElement(Title_1["default"], { title: "Ooops!", className: "!text-5xl text-pink-600" }),
        react_1["default"].createElement("p", { className: "text-3xl mt-6 text-gray-600 md:text-5xl" }, "Something went wrong!"),
        react_1["default"].createElement(Button_1.Button, { buttonColor: "pink", type: "button", label: "Go Home", className: "mt-8 !w-36", onClick: function (e) { return navigate('/home'); } })));
};
exports["default"] = exports.Error;
