"use strict";
exports.__esModule = true;
exports.Repo = void 0;
var ti_1 = require("react-icons/ti");
exports.Repo = function (_a) {
    var id = _a.id, assignment = _a.assignment, repoUrl = _a.repoUrl, assignmentUrl = _a.assignmentUrl, deleteIcon = _a.deleteIcon, onClick = _a.onClick;
    var classes = "text-left leading-relaxed mb-2 w-full text-black bg-gray-100 py-2 md:w-129 py-2";
    return (React.createElement("div", { className: classes },
        React.createElement("div", { className: "px-4 pt-1 flex flex-row justify-between" },
            React.createElement("h1", { className: "text-lg font-bold font-poppins" }, assignment),
            deleteIcon && React.createElement(ti_1.TiDeleteOutline, { className: 'text-2xl text-neutral-400 cursor-pointer	', onClick: onClick })),
        React.createElement("div", { className: "px-4 py-1" },
            React.createElement("div", { className: "text-md font-roboto" },
                React.createElement("a", { className: "hover:underline", href: "/assignments/" + assignmentUrl }, "Assignment"),
                " |",
                ' ',
                React.createElement("a", { className: "hover:underline", href: repoUrl }, "Repository")))));
};
