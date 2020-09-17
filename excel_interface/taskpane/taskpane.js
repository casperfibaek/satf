System.register(["./loginpage.js", "./welcomepage.js", "./registerpage.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var loginpage_js_1, welcomepage_js_1, registerpage_js_1, ReactDOM, React, FluentUIReact, Login;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (loginpage_js_1_1) {
                loginpage_js_1 = loginpage_js_1_1;
            },
            function (welcomepage_js_1_1) {
                welcomepage_js_1 = welcomepage_js_1_1;
            },
            function (registerpage_js_1_1) {
                registerpage_js_1 = registerpage_js_1_1;
            }
        ],
        execute: function () {
            ReactDOM = window.ReactDOM, React = window.React, FluentUIReact = window.FluentUIReact; // eslint-disable-line
            Login = /** @class */ (function (_super) {
                __extends(Login, _super);
                function Login(props) {
                    var _this = _super.call(this, props) || this;
                    _this.state = {
                        // page: { loggedIn: false, registerPage: false },
                        // inputs: { user: "", password: "" },
                        username: '',
                        password: '',
                        loggedIn: false,
                        registerPage: false,
                        registerUsername: '',
                        registerPassword: '',
                        registerConfirm: '',
                    };
                    _this.handleChange = _this.handleChange.bind(_this);
                    _this.handleLogin = _this.handleLogin.bind(_this);
                    _this.handleLogout = _this.handleLogout.bind(_this);
                    _this.handleRegister = _this.handleRegister.bind(_this);
                    _this.delete_user = _this.delete_user.bind(_this);
                    _this.attemptLogIn = _this.attemptLogIn.bind(_this);
                    _this.logOut = _this.logOut.bind(_this);
                    _this.toRegisterPage = _this.toRegisterPage.bind(_this);
                    _this.toWelcomePage = _this.toWelcomePage.bind(_this);
                    _this.register = _this.register.bind(_this);
                    _this.renderLogic = _this.renderLogic.bind(_this);
                    return _this;
                }
                // componentDidMount() {
                //   Office.initialize = () => {
                //     // Determine user's version of Office
                //     if (!Office.context.requirements.isSetSupported("ExcelApi", "1.7")) {
                //       console.log(
                //         "Sorry. The add-in uses Excel.js APIs that are not available in your version of Office."
                //       );
                //     }
                //   };
                // }
                Login.prototype.attemptLogIn = function (username, password) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, responseJSON, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(username, password);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, fetch('https://satf.azurewebsites.net/api/login_user', {
                                            method: 'post',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ username: username, password: password }),
                                        })];
                                case 2:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 3:
                                    responseJSON = _a.sent();
                                    console.log(responseJSON);
                                    localStorage.setItem('token', responseJSON.username + ":" + responseJSON.token);
                                    if (response.ok) {
                                        this.setState({
                                            loggedIn: true,
                                        });
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    console.log('there was an error');
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                Login.prototype.toRegisterPage = function () {
                    this.setState({
                        // page: { loggedIn: false, registerPage: false },
                        // inputs: { user: "", password: "" },
                        username: '',
                        password: '',
                        loggedIn: false,
                        registerPage: true,
                        registerUsername: '',
                        registerPassword: '',
                        registerConfirm: '',
                    });
                };
                Login.prototype.toWelcomePage = function () {
                    this.setState({
                        // username: this,
                        // username used for login welcome message
                        password: '',
                        loggedIn: true,
                        registerPage: false,
                        registerUsername: '',
                        registerPassword: '',
                        registerConfirm: '',
                    });
                };
                Login.prototype.handleRegister = function () {
                    var _a = this.state, registerUsername = _a.registerUsername, registerPassword = _a.registerPassword, registerConfirm = _a.registerConfirm;
                    this.register(registerUsername, registerPassword, registerConfirm);
                };
                Login.prototype.register = function (username, password, confirm) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, responseJSON, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, fetch('https://satf.azurewebsites.net/api/create_user', {
                                            method: 'post',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ username: username, password: password, confirm: confirm }),
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    responseJSON = _a.sent();
                                    this.toWelcomePage();
                                    return [2 /*return*/, responseJSON];
                                case 3:
                                    err_2 = _a.sent();
                                    throw Error(err_2);
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                Login.prototype.delete_user = function (token) {
                    return __awaiter(this, void 0, void 0, function () {
                        var response, responseJSON, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, fetch('https://satf.azurewebsites.net/api/delete_user', {
                                            method: 'post',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ token: token }),
                                        })];
                                case 1:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    responseJSON = _a.sent();
                                    return [2 /*return*/, responseJSON];
                                case 3:
                                    err_3 = _a.sent();
                                    throw Error(err_3);
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                Login.prototype.handleLogout = function () {
                    this.logOut();
                };
                Login.prototype.logOut = function () {
                    this.setState({
                        username: '',
                        password: '',
                        loggedIn: false,
                        registerPage: false,
                        registerUsername: '',
                        registerPassword: '',
                        registerConfirm: '',
                    });
                };
                Login.prototype.handleLogin = function (e) {
                    e.preventDefault();
                    var _a = this.state, username = _a.username, password = _a.password;
                    this.attemptLogIn(username, password);
                };
                Login.prototype.handleChange = function (e) {
                    var _a;
                    console.log("click");
                    var _b = e.target, name = _b.name, value = _b.value;
                    this.setState((_a = {},
                        _a[name] = value,
                        _a));
                };
                Login.prototype.renderLogic = function () {
                    var _a = this.state, registerUsername = _a.registerUsername, registerPassword = _a.registerPassword, registerConfirm = _a.registerConfirm, username = _a.username, password = _a.password, registerPage = _a.registerPage, loggedIn = _a.loggedIn;
                    if (registerPage) {
                        return (React.createElement(registerpage_js_1.default, { registerUsername: registerUsername, registerPassword: registerPassword, registerConfirm: registerConfirm, onInput: this.handleChange, onCreate: this.handleRegister, onBack: this.logOut }));
                    }
                    else if (loggedIn) {
                        return (React.createElement(welcomepage_js_1.default, { username: username, onLogout: this.handleLogout }));
                    }
                    else if (!loggedIn) {
                        return (React.createElement(loginpage_js_1.default, { username: username, password: password, onInput: this.handleChange, onLogin: this.handleLogin, onRegister: this.toRegisterPage }));
                    }
                };
                Login.prototype.render = function () {
                    return (React.createElement("div", null, this.renderLogic()));
                };
                return Login;
            }(React.Component));
            ReactDOM.render(React.createElement(React.StrictMode, null,
                React.createElement(Login, null)), document.getElementById('root'));
        }
    };
});
//# sourceMappingURL=taskpane.js.map