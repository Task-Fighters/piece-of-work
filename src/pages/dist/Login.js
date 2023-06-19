"use strict";
exports.__esModule = true;
var react_1 = require("react");
var google_1 = require("@react-oauth/google");
var axios_1 = require("axios");
var AppContext_1 = require("../AppContext");
var Title_1 = require("../components/Title");
var Button_1 = require("../components/Button");
var Saltblack_svg_1 = require("../assets/Saltblack.svg");
var react_router_dom_1 = require("react-router-dom");
var Login = function () {
    var _a = react_1.useContext(AppContext_1.AppContext), setProfile = _a.setProfile, userGoogleToken = _a.userGoogleToken, setUserGoogleToken = _a.setUserGoogleToken;
    var login = google_1.useGoogleLogin({
        onSuccess: function (codeResponse) {
            setUserGoogleToken(codeResponse);
        },
        onError: function (error) {
            console.log(error, 'Login Failed');
        }
    });
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        if (userGoogleToken) {
            axios_1["default"]
                .get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + userGoogleToken.access_token, {
                headers: {
                    Authorization: "Bearer " + userGoogleToken.access_token,
                    Accept: 'application/json'
                }
            })
                .then(function (res) {
                setProfile(res.data);
                console.log(res.data);
            })["catch"](function (error) {
                console.log(error);
            });
        }
        // eslint-disable-next-line
    }, [setProfile, userGoogleToken]);
    return (React.createElement("div", { className: "h-screen flex justify-center items-center mx-2" },
        React.createElement("div", { className: "max-w-md w-full" },
            React.createElement("img", { className: "mb-16 px-5", alt: "Light theme Salt logo", src: Saltblack_svg_1["default"] }),
            React.createElement(Title_1["default"], { underline: true, title: "Welcome" }),
            React.createElement("p", { className: "mb-10 text-sm" }, "Log in with your @appliedtechnology.se account"),
            React.createElement(Button_1.Button, { onClick: function () { return login(); }, label: "Login with Google", type: "button" }))));
};
exports["default"] = Login;
