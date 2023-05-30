"use strict";
exports.__esModule = true;
var baseTitleClass = 'font-bold font-sans mb-4 text-xl';
var Title = function (_a) {
    var title = _a.title, underline = _a.underline, className = _a.className;
    var underlineClass = 'border-b-2 border-pink-600';
    var getStyling = function (isUnderlined) {
        return isUnderlined ? baseTitleClass + " " + underlineClass : "" + baseTitleClass;
    };
    var classes = getStyling(underline);
    return (React.createElement("h1", { className: className + " " + classes },
        title,
        underline));
};
exports["default"] = Title;
