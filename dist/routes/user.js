"use strict";
const express = require("express");
const router = express.Router();
const db_service_1 = require("../database/db.service");
const query_user_1 = require("../query/query_user");
//
router.get('/', (req, res) => {
    db_service_1.db.getConnection((err, connection) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            const params = req.query;
            let selectStatement = "SELECT email, mark_status, first_name, last_name ";
            let qReportALL = selectStatement + `${query_user_1.QUERY_INFO}`;
            let filter_query = "";
            if (Object.keys(params).length > 0) {
                Object.keys(params).forEach((key, index) => {
                    if (key === "email") {
                        const email = params.email === "" ? "" : " AND email = " + `'${params.email}'`;
                        filter_query += email;
                        console.log("myemail", params.email);
                    }
                });
            }
            qReportALL += filter_query;
            console.log("qReportALL", qReportALL);
            connection.query(qReportALL, (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send({ message: err });
                }
                else {
                    res.send(results);
                }
            });
        }
    });
});
module.exports = router;
//# sourceMappingURL=user.js.map