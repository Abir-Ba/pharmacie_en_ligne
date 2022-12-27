const mysql = require('mysql');
 
let Pool = mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
   database: process.env.DB_NAME
   });
// view users
exports.view = (req,res)=>{

    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);

        connection.query('SELECT * FROM Medicament',(err,rows) => {
            connection.release();
            if(!err){
                res.render('home', {rows} )
            }
            else{
                console.log(err);
            }
            console.log('the data from Medicament table: \n',rows);
        })
    });
}
exports.find = (req,res)=>{

    
    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);
        let searchTerm= req.body.search;

        connection.query('SELECT * FROM Medicament WHERE Nom LIKE ? OR Dosage LIKE ? ',['%' + searchTerm + '%','%' + searchTerm + '%'],(err,rows) => {
            connection.release();
            if(!err){
                res.render('home', {rows} )
            }
            else{
                console.log(err);
            }
            console.log('the data from Medicament table: \n',rows);
        })
    });
}
//add new user
exports.form = (req,res)=>{
res.render('add-medicament')
}
exports.create = (req,res)=>{
    const {nom,dosage,prix,de,df,description} = req.body;
    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);
        let searchTerm= req.body.search;

        connection.query('INSERT INTO Medicament SET Nom = ? , Prix = ?, Dosage = ? , DE = ?, DF = ?, Description = ?  ',[nom,prix,dosage,de,df,description],(err,rows) => {
            connection.release();
            if(!err){
                res.render('add-medicament',{alert: 'Medicament Added Successefully'})
            }
            else{
                console.log(err);
            }
            console.log('the data from medicament table: \n',rows);
        })
    });
}
//edit user 
exports.edit = (req,res)=>{
    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);

        connection.query('SELECT * FROM Medicament WHERE idMedicament = ?',[req.params.id],(err,rows) => {
            connection.release();
            if(!err){
                res.render('edit-medicament', {rows} )
            }
            else{
                console.log(err);
            }
            console.log('the data from medicament table: \n',rows);
        })
    });
}
exports.update = (req,res)=>{
    const {nom,dosage,prix,de,df,description} = req.body;
    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);

        connection.query('UPDATE Medicament SET Nom = ? , Prix = ?, Dosage = ? , DE = ?, DF = ?, Description = ? WHERE idMedicament = ?',[nom,prix,dosage,de,df,description,req.params.id],(err,rows) => {
            connection.release();
            if(!err){
                Pool.getConnection((err,connection)=>{
                    if(err) throw err;
                    console.log('connected as id '+ connection.threadId);
            
                    connection.query('SELECT * FROM Medicament WHERE idMedicament = ?',[req.params.id],(err,rows) => {
                        connection.release();
                        if(!err){
                            res.render('edit-medicament', {rows, alert: `${nom} has been updated`} )
                        }
                        else{
                            console.log(err);
                        }
                        console.log('the data from medicament table: \n',rows);
                    })
                });
            }
            else{
                console.log(err);
            }
            console.log('the data from Medicament table: \n',rows);
        })
    });
}

//delete user
exports.delete = (req,res)=>{
    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);

        connection.query('DELETE FROM Medicament WHERE idMedicament = ?',[req.params.id],(err,rows) => {// or set status = deleted
            connection.release();
            if(!err){
                res.redirect('/');
            }
            else{
                console.log(err);
            }
            console.log('the data from medicament table: \n',rows);
        })
    });
}
exports.viewall = (req,res)=>{

    Pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('connected as id '+ connection.threadId);

        connection.query('SELECT * FROM Medicament WHERE idMedicament = ?',[req.params.id],(err,rows) => {
            connection.release();
            if(!err){
                res.render('view-medicament', {rows} )
            }
            else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows);
        })
    });
}
