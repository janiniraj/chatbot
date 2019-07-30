var localStorage = require('local-storage');

export class Auth {
    email: string;
    user_name: string;

    constructor (){}

    getAuthLogin() {
        this.user_name = localStorage.get("username");
        return !!this.user_name;
    }

    setAuthLogin(email: string, username: string) {
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