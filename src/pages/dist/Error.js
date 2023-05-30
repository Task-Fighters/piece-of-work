"use strict";
exports.__esModule = true;
exports.Error = void 0;
var Title_1 = require("../components/Title");
exports.Error = function () {
    return (React.createElement("div", { className: 'flex flex-col justify-center w-full items-center h-[60vh]' },
        React.createElement(Title_1["default"], { title: "Ooops!", className: '!text-5xl text-pink-600' }),
        React.createElement("p", { className: "text-3xl mt-6 text-gray-600 md:text-5xl" }, "Something went wrong!")));
};
exports["default"] = exports.Error;
