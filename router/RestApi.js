const express = require('express');

const fs = require('fs')
// const file = require('express-fileupload');

const router = express.Router()
const mySQL = require('mysql');


router.post('/allquery', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    let returnData = {};
    connect.getConnection((err) => {
        if (err) return err;
        connect.query(req.body.query, (err, result) => {
            if (err) return (err);
            console.log(result)
            returnData = result;
            console.log(result.length)
            if(result.length == 0){
                returnData = "Table is empty"
            }
            // console.log(result)
            return res.json(returnData)
        });
        // console.log( 'end');

    });
});

router.post('/retrieve', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    let returnData = {};
    connect.getConnection((err) => {
        if (err) return err;
        console.log(req)
        let table = `${"select * from"} ${req.body.query}`
        connect.query(table, (err, result) => {
            if (err) return (err);
            console.log(result)
            returnData = result;
            console.log(result.length)
            if(result.length == 0){
                returnData = "Table is empty"
            }
            // console.log(result)
            return res.json(returnData)
        });
        // console.log( 'end');

    });
});

router.post('/upload', (req, res, next) => {
    let message = null;
    const connect = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject",
        multipleStatements: true,
        connectTimeout: 300000
    });
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let time = null;
            let sql ='';
            let fileData = req.files.userfile.data.toString().split('\n');
            let tableName = req.body.table;
            let insetType = req.body.insetType;
            const start = Date.now();
            //console.log(insetType)
            switch (insetType) {
                case 'single':
                    let sequalQueay = [];
                    let rowCount = 0;
                    var pre_query = new Date().getTime();
                    var post_query
                    sql = `${'insert into'} ${tableName} ${'values ( '}`;
                    for (let index = 0; index < fileData.length; index++) {
                        if (fileData[index].substr(-1) == '\r') {
                            sequalQueay = sql + fileData[index].slice(0, -1) + ")";
                        }
                        else {
                            sequalQueay = sql + fileData[index] + ")";
                        }
                        //console.log(sequalQueay)
                        connect.query(sequalQueay, (err, result) => {
                            if (err) throw err;
                            if(result.affectedRows > 0){
                                rowCount = rowCount + result.affectedRows
                                if(rowCount == fileData.length){
                                    post_query = new Date().getTime();
                                    var duration = (post_query - pre_query) / 1000;
                                    message = duration;
                                    console.log(message)
                                    res.send({
                                        status: true,
                                        message: message
                                    });
                                }
                            }
                                                
                        });

                    }
                    break;
                case 'multiple':
                  
                    var pre_query = new Date().getTime();
                    let rowCount1 = 0;
                    let a = 0;
                    let b = 0;
                    while (a <= fileData.length - 1) {
                        let times = 0;
                        let totalVale = '';
                        while (times < 1000 && b <= fileData.length-1) {

                            if (fileData[b].substr(-1) == '\r' ) {
                                if(times === 999){
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + ")";
                            }
                            else{
                                totalVale = totalVale + "(" + fileData[b].slice(0, -1) + "),";
                            }
                        }
                            else {
                                totalVale = totalVale + "(" + fileData[b] + ")";
                            }
                            times++;
                            b++;
                        };
                        let tableColo=[];
                        connect.query(`${"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'"}${tableName}${"'"};`, (err, result) => {
                            for (let index = 0; index < result.length; index++) {
                                tableColo.push(result[index].COLUMN_NAME)

                            };
                            // console.log(tableColo);
                            connect.end
                        })

                        setTimeout(() => {
                            sql = `${'insert into'} ${tableName} ${'('}${tableColo}${')'} ${'values'} ${totalVale}; `;
                            //console.log('quary', sql)
                            connect.query(sql, function (err, result, feilds) {
                                if (err) throw err;
                                //console.log('result',JSON.stringify(result))
                                if(result.affectedRows > 0){
                                    rowCount1 = rowCount1 + result.affectedRows
                                    if(rowCount1 == fileData.length){
                                        post_query = new Date().getTime();
                                        var duration = (post_query - pre_query) / 1000;
                                        message = duration;
                                        console.log(message)
                                        res.send({
                                            status: true,
                                            message: message
                                        });
                                    }
                                }
                             })
                        }, 2000);
                        a = a + 1000;
                        // console.log('a', a)
                    };

                    break;
                case 'load':
                    var pre_query = new Date().getTime();
                    let path = `${"C:/Users/phane/OneDrive/Desktop/DBProject/dbproject-master/Datasets/"}${req.files.userfile.name}`
                    //sql2 = 'LOAD DATA INFILE ' + path + ' INTO TABLE ' + tableName + lastSyntax;
                     sql =   "LOAD DATA LOCAL INFILE "+ "\"" + path  + "\"" 
                    + " INTO TABLE players FIELDS TERMINATED BY ',' " + " OPTIONALLY ENCLOSED BY \"" + "'"  + "\""  ;
                    connect.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        /*  Object.keys(result).forEach(function(key) {
                    
                        }); */
                        //console.log(result)
                        if(result.affectedRows == 10000 || result.affectedRows == 100000 ||result.affectedRows == 1000000){
                            post_query = new Date().getTime();
                            var duration = (post_query - pre_query) / 1000;
                            message = duration;
                            console.log(message)
                            res.send({
                                status: true,
                                message: message
                            });
                        }
                        // connect.query((err,resu) =>{
                        //     //console.log(resu)
                            
                            
                        // })
                        
                    });
                    break
            }
            //send response
            //res.send({
            //    status: true,
            //    message: message
            //});
        }
    } catch (err) {
        res.status(500).send({ err });
    }
});
router.delete('/delete/:id', (req, res, next) => {
    let tableName
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createPool({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    switch (req.params.id) {
        case "1":
            tableName = 'players'
            break;
        case "2":
            tableName = 'play'
            break;
        case "3":
            tableName = 'games'
            break;
        case "4":
            tableName = 'teams'
            break;

    }
    // connect.getConnection((err) => {
    //     if (err) return err;
    connect.query(`${'Delete from '}${tableName}`, (err, result) => {
        if (err) return err;
        res.json('Successfully deleted')
    });

});


router.post('/max', (req, res, next) => {
    /// Im also trying to connect with ConnectionPool also
    const connect = mySQL.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: "phanifinalproject"
    });
    let returnData = {};
    let seletedTable = req.body.table;

    switch (seletedTable) {
        case "players":
            let PlayerID;
            let TeamID;
            let TouchDowns;
            let TotalYards;
            let Salary;
            connect.query('select Max(PlayerID) from players', (err, result) => {

                if (err) return err;
                return PlayerID = result[0];
            });
            connect.query('select Max(TeamID) from players', (err, result) => {
                if (err) return err;
                return TeamID = result[0];
            });
            connect.query('select Max(TouchDowns) from players', (err, result) => {
                if (err) return err;
                return TouchDowns = result[0];
            });
            connect.query('select Max(TotalYards) from players', (err, result) => {
                if (err) return err;
                return TotalYards = result[0];
            });
            connect.query('select Max(Salary) from players', (err, result) => {
                if (err) return err;
                return Salary = result[0];
            });
            setTimeout(() => {
                let finalResult = [PlayerID, TeamID, TouchDowns, TotalYards, Salary]
                res.json(finalResult)
            }, 1000);

            break;
        case "play":
            tableName = 'play'
            let playerID;
            let GameID;
            connect.query('select Max(PlayerID) from play', (err, result) => {

                if (err) return err;
                return playerID = result[0];
            });
            connect.query('select Max(GameID) from play', (err, result) => {
                if (err) return err;
                return GameID = result[0];
            });
            setTimeout(() => {
                let finalResult = [playerID, GameID]
                res.json(finalResult)
            }, 1000);
            break;
        case "games":
            tableName = 'games'
            let gameID;
            let Attendance;
            let TicketRevenue;
            connect.query('select Max(GameID) from games', (err, result) => {

                if (err) return err;
                return gameID = result[0];
            });
            connect.query('select Max(Attendance) from games', (err, result) => {
                if (err) return err;
                return Attendance = result[0];
            });
            connect.query('select Max(TicketRevenue) from games', (err, result) => {
                if (err) return err;
                return TicketRevenue = result[0];
            });
            setTimeout(() => {
                let finalResult = [gameID, Attendance, TicketRevenue]
                res.json(finalResult)
            }, 1000);
            break;
        case "teams":
            tableName = 'teams'
            let teamID;
            connect.query('select Max(TeamID) from teams', (err, result) => {
                if (err) return err;
                return teamID = result[0];
            });
            setTimeout(() => {
                let finalResult = [teamID]
                res.json(finalResult)
            }, 1000);
            break;

    }
});
const passTheData = async (passSql, connect) => {
    return connect.query(passSql, (err, result) => {

        if (err) throw err;

        //result =  result
        // alert("Bulk Data Inserted Successfully");
    });
}


module.exports = router;