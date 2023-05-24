"use strict";
exports.__esModule = true;
exports.ListItem = void 0;
var react_router_dom_1 = require("react-router-dom");
var md_1 = require("react-icons/md");
var ti_1 = require("react-icons/ti");
var base_listItem = 'text-left leading-relaxed mb-2 w-full text-black bg-gray-100 py-2 md:w-129';
exports.ListItem = function (_a) {
    var id = _a.id, iconDelete = _a.iconDelete, iconEdit = _a.iconEdit, title = _a.title, onClick = _a.onClick, onClickDeleteIcon = _a.onClickDeleteIcon, onClickEditIcon = _a.onClickEditIcon, route = _a.route;
    var classes = "" + base_listItem;
    return (React.createElement("li", { className: classes },
        React.createElement(react_router_dom_1.Link, { to: route ? route + "/" + id : " ", onClick: onClick, className: route ? "cursor-pointer" : "cursor-auto" },
            React.createElement("div", { className: "px-4 flex justify-between" },
                React.createElement("h2", { className: "text-md font-normal font-poppins" }, title),
                iconDelete && (React.createElement(ti_1.TiDeleteOutline, { className: 'text-2xl text-neutral-400', onClick: onClickDeleteIcon })),
                iconEdit && React.createElement(md_1.MdEdit, { className: 'text-2xl text-neutral-400', onClick: onClickEditIcon })))));
};
