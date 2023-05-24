"use strict";
exports.__esModule = true;
exports.Card = void 0;
var html_react_parser_1 = require("html-react-parser");
var md_1 = require("react-icons/md");
var react_router_dom_1 = require("react-router-dom");
var base_card = 'text-left border-b-2 leading-tight mb-4 w-full';
exports.Card = function (_a) {
    var id = _a.id, title = _a.title, subtitle = _a.subtitle, description = _a.description, group = _a.group, iconEdit = _a.iconEdit, _b = _a.cardType, cardType = _b === void 0 ? 'card' : _b, onClickEditIcon = _a.onClickEditIcon, onClick = _a.onClick;
    var navigate = react_router_dom_1.useNavigate();
    var mode = 'text-black border-black bg-gray-100';
    var featureText = description;
    switch (cardType) {
        case 'feature':
            mode = 'text-black border-pink-600 bg-gray-100';
            featureText =
                description.length > 300
                    ? description.slice(0, 300) + '...'
                    : description;
            break;
        case 'detailed':
            mode = 'text-black border-pink-600 bg-gray-100';
            featureText = description;
            break;
        case 'card':
            mode = 'text-black border-black bg-gray-100 md:w-129';
            featureText = '';
            break;
    }
    var dateObj = new Date(Date.parse(subtitle));
    var formattedDate = dateObj
        .toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
        .replace(',', '');
    subtitle = formattedDate;
    var classes = base_card + " " + mode + " py-2 cursor-pointer";
    var handleNavigate = function () { return navigate("/assignments/" + id); };
    return cardType !== 'detailed' ? (React.createElement("div", { className: classes, onClick: handleNavigate },
        React.createElement("div", { className: "px-4 pt-1" },
            React.createElement("h1", { className: "text-lg font-bold font-poppins" }, title),
            React.createElement("h4", { className: "text-xs font-bold text-pink-600 mb-1 font-poppins" }, group),
            React.createElement("h3", { className: "text-sm font-bold font-roboto" }, subtitle)),
        React.createElement("div", { className: "px-4 py-1" },
            React.createElement("div", { className: "text-md font-roboto" }, html_react_parser_1["default"]("" + featureText))))) : (React.createElement("div", { className: classes },
        React.createElement("div", { className: "px-4 pt-1" },
            React.createElement("div", { className: "flex flex-row w-full justify-between" },
                React.createElement("h2", { className: "text-lg font-bold font-poppins" }, title),
                iconEdit && (React.createElement(md_1.MdEdit, { className: 'text-2xl text-pink-600', onClick: onClickEditIcon }))),
            React.createElement("h4", { className: "text-xs font-bold text-pink-600 mb-1 font-poppins" }, group),
            React.createElement("h3", { className: "text-sm font-bold font-roboto" }, subtitle)),
        React.createElement("div", { className: "border-b-2 mt-2 mb-1 border-pink-600" }),
        React.createElement("div", { className: "px-4 py-1" },
            React.createElement("div", { className: "text-md font-roboto" }, html_react_parser_1["default"]("" + featureText)))));
};
