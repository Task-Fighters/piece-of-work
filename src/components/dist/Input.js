"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Input = void 0;
var bi_1 = require("react-icons/bi");
var tw_elements_1 = require("tw-elements");
var react_1 = require("react");
var BASE = 'w-full rounded border px-4 py-2 focus:outline-none focus:ring-1 focus:ring-pink-600 mb-4';
exports.Input = function (_a) {
    var label = _a.label, icon = _a.icon, select = _a.select, date = _a.date, placeholder = _a.placeholder, disabled = _a.disabled, multiple = _a.multiple, onChange = _a.onChange, defaultValue = _a.defaultValue, value = _a.value, options = _a.options, props = __rest(_a, ["label", "icon", "select", "date", "placeholder", "disabled", "multiple", "onChange", "defaultValue", "value", "options"]);
    react_1.useEffect(function () {
        tw_elements_1.initTE({ Select: tw_elements_1.Select });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("label", { className: "text-pink-600 text-lg font-bold font-sans" }, label),
        disabled ? (
        // <div className="inline-block relative w-full focus-within:outline-none focus-within:ring-1 focus-within:ring-pink-600 mb-4">
        //   {multiple ? (
        //     <select 
        //       data-te-select-init
        //       data-te-select-placeholder="Select option"
        //       multiple
        //       data-te-select-size="lg"
        //       onChange={onChange}
        //     >
        //       {options?.map((option) => {
        //         return (
        //           <option key={option.id} value={option.name}>
        //             {option.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //   ) : (
        //     <select
        //       data-te-select-init
        //       data-te-select-placeholder="Select option"
        //       data-te-select-size="lg"
        //       onChange={onChange}     
        //       >
        //       {options?.map((option) => {
        //         return (
        //           <option
        //             key={`${option.name} ${option.id}`}
        //             value={label !== 'group' ? option.name : option.id}
        //           >
        //             {option.name}
        //           </option>
        //         );
        //       })}
        //     </select>
        //   )}
        // </div>
        React.createElement("div", { className: "inline-block relative w-full" },
            React.createElement("input", { type: date ? 'date' : 'text', className: BASE, placeholder: placeholder, onChange: onChange, value: value, 
                // required
                disabled: true, defaultValue: defaultValue }),
            icon && (React.createElement(bi_1.BiSearch, { className: "absolute inset-y-2.5 right-2 text-gray-500 text-2xl" })))) : (React.createElement("div", { className: "inline-block relative w-full" },
            React.createElement("input", { type: date ? 'date' : 'text', className: BASE, placeholder: placeholder, onChange: onChange, value: value }),
            icon && (React.createElement(bi_1.BiSearch, { className: "absolute inset-y-2.5 right-2 text-gray-500 text-2xl" }))))));
};
