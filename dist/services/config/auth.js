"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localStorage = require('local-storage');
class Auth {
    constructor() { }
    getAuthLogin() {
        this.user_name = localStorage.get("username");
        return !!this.user_name;
    }
    setAuthLogin(email, username) {
        localStorage.set("email", email);
        localStorage.set("username", username);
    }
    removeAuthLogin() {
        localStorage.remove("username");
    }
    getUsername() {
        return this.user_name;
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map