"use strict";

var mysql = require('mysql');

var Pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); // view users

exports.view = function (req, res) {
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * FROM Medicament', function (err, rows) {
      connection.release();

      if (!err) {
        res.render('home', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from Medicament table: \n', rows);
    });
  });
};

exports.find = function (req, res) {
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    var searchTerm = req.body.search;
    connection.query('SELECT * FROM Medicament WHERE idMedicament LIKE ?', ['%' + searchTerm + '%'], function (err, rows) {
      connection.release();

      if (!err) {
        res.render('home', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from Medicament table: \n', rows);
    });
  });
}; //add new user


exports.form = function (req, res) {
  res.render('add-user');
};

exports.create = function (req, res) {
  var _req$body = req.body,
      nom = _req$body.nom,
      dosage = _req$body.dosage,
      prix = _req$body.prix,
      de = _req$body.de,
      df = _req$body.df,
      description = _req$body.description;
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    var searchTerm = req.body.search;
    connection.query('INSERT INTO Medicament SET Nom = ? , Prix = ?, Dosage = ? , DE = ?, DF = ?, Description = ?  ', [nom, dosage, prix, de, df, description], function (err, rows) {
      connection.release();

      if (!err) {
        res.render('add-medicament', {
          alert: 'Medicament Added Successefully'
        });
      } else {
        console.log(err);
      }

      console.log('the data from medicament table: \n', rows);
    });
  });
}; //edit user 


exports.edit = function (req, res) {
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * FROM Medicament WHERE idMedicament = ?', [req.params.id], function (err, rows) {
      connection.release();

      if (!err) {
        res.render('edit-medicament', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from medicament table: \n', rows);
    });
  });
};

exports.update = function (req, res) {
  var _req$body2 = req.body,
      nom = _req$body2.nom,
      dosage = _req$body2.dosage,
      prix = _req$body2.prix,
      de = _req$body2.de,
      df = _req$body2.df,
      description = _req$body2.description;
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('UPDATE Compte SET Nom = ? , Prix = ?, Dosage = ? , DE = ?, DF = ?, Description = ? WHERE idMedicament = ?', [nom, dosage, prix, de, df, description, req.params.id], function (err, rows) {
      connection.release();

      if (!err) {
        Pool.getConnection(function (err, connection) {
          if (err) throw err;
          console.log('connected as id ' + connection.threadId);
          connection.query('SELECT * FROM Medicament WHERE idMedicament = ?', [req.params.id], function (err, rows) {
            connection.release();

            if (!err) {
              res.render('edit-medicament', {
                rows: rows,
                alert: "".concat(nom, " has been updated")
              });
            } else {
              console.log(err);
            }

            console.log('the data from medicament table: \n', rows);
          });
        });
      } else {
        console.log(err);
      }

      console.log('the data from Medicament table: \n', rows);
    });
  });
}; //delete user


exports["delete"] = function (req, res) {
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('DELETE FROM Medicament WHERE idMedicament = ?', [req.params.id], function (err, rows) {
      // or set status = deleted
      connection.release();

      if (!err) {
        res.redirect('/');
      } else {
        console.log(err);
      }

      console.log('the data from medicament table: \n', rows);
    });
  });
};

exports.viewall = function (req, res) {
  Pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * FROM Medicament WHERE idMedicament = ?', [req.params.id], function (err, rows) {
      connection.release();

      if (!err) {
        res.render('view-medicament', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('the data from user table: \n', rows);
    });
  });
};