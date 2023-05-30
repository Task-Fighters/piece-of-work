"use strict";
exports.__esModule = true;
exports.Button = void 0;
var base_button = 'cursor-pointer rounded border-2 font-bold leading-none inline-block font-sans md:text-sm sm:text-lg px-4 py-2 w-full mb-4';
exports.Button = function (_a) {
    var label = _a.label, disabled = _a.disabled, _b = _a.buttonColor, buttonColor = _b === void 0 ? 'black' : _b, type = _a.type, onClick = _a.onClick, className = _a.className;
    var mode = 'text-white border-black bg-black';
    switch (buttonColor) {
        case 'pink':
            mode = 'text-pink-600 border-pink-600 bg-white';
            break;
        case 'white':
            mode = 'text-black border-black bg-white';
            break;
    }
    var classes = base_button + " " + mode;
    return (React.createElement("button", { type: type, className: className + " " + classes, disabled: disabled, onClick: onClick }, label));
};
