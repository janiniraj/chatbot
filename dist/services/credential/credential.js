"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Credential {
    constructor(email, password, status, user_name) {
        this.email = email;
        this.password = password;
        this.status = status;
        this.user_name = user_name;
    }
}
exports.Credential = Credential;
class UserCredential {
    constructor(email, password, status) {
        this.email = email;
        this.password = password;
        this.status = status;
    }
}
exports.UserCredential = UserCredential;
//# sourceMappingURL=credential.js.map