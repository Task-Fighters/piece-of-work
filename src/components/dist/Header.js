"use strict";
exports.__esModule = true;
exports.Header = void 0;
var react_router_dom_1 = require("react-router-dom");
var White_logo_svg_1 = require("../assets/White_logo.svg");
var Black_logo_svg_1 = require("../assets/Black_logo.svg");
var baseHeader = 'text-white mb-4 flex md:bg-neutral-700 justify-center';
exports.Header = function (_a) {
    var role = _a.role, location = _a.location;
    var navigate = react_router_dom_1.useNavigate();
    var adminMenu = [
        { label: 'Home', href: '/home' },
        { label: 'Groups', href: '/groups' },
        { label: 'Users', href: '/users' },
        { label: 'Add assignment', href: '/assignments/new' },
        { label: 'Profile', href: '/profile' }
    ];
    var pgpMenu = [
        { label: 'Home', href: '/home' },
        { label: 'Users', href: '/users' },
        { label: 'Profile', href: '/profile' }
    ];
    var items = role === 'admin' ? adminMenu : pgpMenu;
    var ulClass = 'flex my-2';
    var liClass = 'font-poppins mx-2 bottom-0 text-base';
    var liClassSelected = 'font-poppins mx-2 bottom-0 text-base border-b-[2px] border-pink-600';
    return (React.createElement("header", { className: baseHeader },
        React.createElement("div", { className: "flex flex-wrap justify-between w-full max-w-6xl items-end mx-2 h-36" },
            React.createElement("div", { className: "w-52 m-5 hidden md:flex" },
                React.createElement("img", { className: "cursor-pointer", src: White_logo_svg_1["default"], alt: "Salt logo", onClick: function () {
                        navigate('/home');
                    } })),
            React.createElement("div", null,
                React.createElement("div", { className: "w-72 m-5 flex md:hidden" },
                    React.createElement("img", { src: Black_logo_svg_1["default"], alt: "Salt logo" })),
                React.createElement("nav", { className: "hidden md:flex" },
                    React.createElement("ul", { className: ulClass }, items === null || items === void 0 ? void 0 : items.map(function (item) { return (React.createElement("li", { className: location.includes(item.href) ? liClassSelected : liClass, key: item.href },
                        React.createElement("a", { href: item.href }, item.label))); })))))));
};
