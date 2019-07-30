"use strict";
// import { API_URL } from "../config/element";
// import { UserCredential } from "./credential";
// import { Auth } from "../config/auth";
//
// const request = require("request");
// const auth = new Auth();
//
// export const CredentialService = (() => {
//     const url_api = `${API_URL}/user`;
//
//     this.checkCredential = (params: any) => new Promise((resolve, reject) => {
//         const api_params = new UserCredential(
//             params["email"], params['password'], params["user_status"]
//         );
//
//         request({ url: url_api, qs: api_params }, (error: any, response: any, data: any) => {
//             let api_data = JSON.parse(data);
//             api_data.length !== 0 ? auth.setAuthName(api_data[0].user_email, api_data[0].user_name): api_data;
//
//             resolve(api_data);
//         });
//     });
//
//     return this;
//
// })();
Object.defineProperty(exports, "__esModule", { value: true });
const credential_1 = require("./credential");
const auth_1 = require("../config/auth");
const element_1 = require("../config/element");
const request = require("request");
class CredentialService {
    constructor() {
        this.auth = new auth_1.Auth();
    }
    auth_login(params) {
        const url_api = `${element_1.API_URL}/user`;
        const api_params = new credential_1.UserCredential(params["email"], params['password'], params["status"]);
        return new Promise((resolve, reject) => {
            request({ url: url_api, qs: api_params }, (error, response, data) => {
                let api_data = JSON.parse(data);
                api_data.length !== 0 ? this.auth.setAuthLogin(api_data[0].email, api_data[0].first_name + " " + api_data[0].last_name) : api_data;
                resolve(api_data);
            });
        });
    }
}
exports.CredentialService = CredentialService;
//# sourceMappingURL=credential.service.js.map