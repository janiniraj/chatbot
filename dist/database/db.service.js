"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
exports.db = (() => {
    // this.pool = mysql.createPool({
    //     connectionLimit: 12,
    //     host: 'localhost',
    //     user: 'adminbot',
    //     password: 'adminbot!@#',
    //     port: 3312,
    //     database: 'chatbot_db',
    //     charset: 'utf8'
    // });
    this.pool = mysql.createPool({
        connectionLimit: 12,
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'chatbot_db',
        charset: 'utf8'
    });
    this.getConnection = (cb) => {
        this.pool.getConnection(cb);
    };
    return this;
})();
//# sourceMappingURL=db.service.js.map