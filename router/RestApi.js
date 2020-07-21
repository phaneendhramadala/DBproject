const express = require('express');

const fs =  require('fs')
// const file = require('express-fileupload');

const router = express.Router()
const mySQL = require('mysql');


router.post('/allquery',(req, res,next) =>{
    const connect  =  mySQL.createConnection({
        host:"localhost",
        user:'root',
        password:'',
        database: "phanifinalproject"
    });
    let returnData = {};
    connect.connect((err) => {
        if (err) return err;
        // connect.query("CREATE DATABASE phaniFinalProject",(err, res) =>{
        //     if (err) return err;
        //     console.log("Database Created")
        // });
        // connect.query("USE phaniFinalProject",(err, res) =>{
        //     if (err) return err;
        // });
        // console.log( 'start');
        connect.query(req.body.query,(err,result) =>{
            if (err) console.log( err);
              returnData =  result;
              res.json({ returnData})
        });
        // console.log( 'end');
       
    });    
});
router.post('/upload',(req, res, next) =>{
    let message = null;
    const connect  =  mySQL.createConnection({
        host:"localhost",
        user:'root',
        password:'',
        database: "phanifinalproject"
    });
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
                let time = null;
                
                let sql = null;
                let fileData = req.files.userfile.data.toString().split('\n')
                let tableName = req.body.table;
                let insetType =  req.body.insetType;
                const start = Date.now();
               
                switch (insetType) {
                    case 'single':
                        let sequalQueay =[]
                        sql = `${'insert into'} ${tableName} ${'values ( '}`;
                        for (let index = 0; index < fileData.length; index++) {
                            if(fileData[index].substr(-1) == '\r'){
                            sequalQueay =  sql+ fileData[index].slice(0, -1) +")" ;
                            }
                            else{
                                sequalQueay =  sql+ fileData[index] +")" ;
                            }
                            //sequalQueay.push(`${sql} ${fileData[index]+")"}`);
                            connect.query(sequalQueay, (err, result)=> {
                                if (err) throw err;
                               //result =  result
                                // alert("Bulk Data Inserted Successfully");
                            });
                           
                        }
                        time = Date.now() - start;
                        message = time;
                        break;
                    case 'multiple':
                        sqlQueary =[]
                        sql = `${'insert into'} ${tableName} ${'values'}`;
                       let i =0;
                       let x= true;
                       while (x) {
                        if(fileData[i].substr(-1) == '\r'){
                            sql = sql + "(" + fileData[i].slice(0, -1) + "),";
                        }
                        else{
                            sql =  sql+ "(" + fileData[i] +")" ;
                            x = false;
                        }
                        i++;   
                       }
                        
                        // for (let i = 0; i < fileData.length; i++) {
                        //     if(fileData[i].substr(-1) == '\r'){
                        //         sql = sql + "(" + fileData[i].slice(0, -1) + "),";
                        //     }
                        //     else{
                        //         sql =  sql+ "(" + fileData[i] +")" ;
                        //     }
                        //     //console.log('fileData',fileData[i].substr(-1) == '\r')
                        //    }
                        console.log(sql)
                        // fileData.forEach(element => {
                        //     sql = sql + "(" + element + "),";
                
                        // });
                        //console.log('fileData',fileData[-1])
                        //sql = sql.slice(0, -1);
                        // connect.query(sqlQueary, (err, result)=> {
                            
                        //     if (err) throw err;
                           
                        //    //result =  result
                        //     // alert("Bulk Data Inserted Successfully");
                        // });
                        time = Date.now() - start;
                                message = time;
                        break;
                    case 'load':
                        
//                         LOAD DATA LOCAL INFILE 'C:\\temp\\\OSS001'
// INTO TABLE REJECTS FIELDS TERMINATED BY ','
// OPTIONALLY ENCLOSED BY '"'
// LINES TERMINATED BY '\n'
// IGNORE 1                                
                        sql = "LOAD DATA LOCAL INFILE " + "\"" + req.files.userfile.name +
                        "\"" + " INTO TABLE " + tableName+ "FIELDS TERMINATED BY ','" + " LINES TERMINATED BY \'" +
                        "\\r\\n" + "\' IGNORE 0 LINES (PlayerID ,FirstName,LastName ,TeamID,Position,TouchDowns,TotalYards,Salary);"
                        // IGNORE 1 LINES'
                            connect.query(sql, function(err, result, fields) {
                                if (err) throw err;
                                /*  Object.keys(result).forEach(function(key) {
                                }); */
                                time = Date.now() - start;
                                message = time;

                            });
                            
                        break
                }
            //send response
            res.send({
                status: true, 
                message: message
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;