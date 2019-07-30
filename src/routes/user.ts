import * as express from 'express';

const router = express.Router();

import { db } from "../database/db.service";
import { QUERY_INFO } from "../query/query_user";
//
router.get('/', (req: any, res: any) => {
    db.getConnection((err: any, connection: any) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            const params = req.query;

            let selectStatement = "SELECT email, mark_status, first_name, last_name ";
            let qReportALL = selectStatement + `${QUERY_INFO}`;

            let filter_query = "";

            if(Object.keys(params).length > 0) {
                Object.keys(params).forEach((key, index) => {
                    if (key === "email") {
                        const email = params.email === "" ? "" : " AND email = " + `'${params.email}'`;
                        filter_query += email;
                        console.log("myemail", params.email);
                    }
                });
            }

            qReportALL +=  filter_query;
            console.log("qReportALL", qReportALL);

            connection.query(qReportALL, (err: any, results: any) => {
                connection.release();

                if (err) {
                    res.status(500).send({message: err});
                } else {
                    res.send(results);
                }
            });
        }
    });
});

export = router;