import mysql = require('mysql');

export const db = (() => {
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
        host: '103.6.198.188',
        user: 'kujagaco_bot',
        password: 'adminbot!@#',
        port: 3306,
        database: 'kujagaco_chatbot',
        charset: 'utf8'
    });

    this.getConnection = (cb: any) => {
        this.pool.getConnection(cb);
    };

    return this;
})();