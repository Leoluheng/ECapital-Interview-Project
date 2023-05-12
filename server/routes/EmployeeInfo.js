const express = require('express');
const dbConnection = require("../data/mysqlConnection");
const router = express.Router();

// Retrieve all employees
router.get("/employees", (req, res) => {
    let sqlQuery = "SELECT * FROM employees";
    let query = dbConnection.execute(sqlQuery).then(([result, fields]) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

// Create a new employee
router.post("/employees", (req, res) => {
    let load = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        salary: req.body.salary
    }
    let sqlQuery = "INSERT INTO employees SET ?";
    let query = dbConnection.query(sqlQuery, load).then(([result, fields]) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

// Update an existing employee
router.put("/employees", (req, res) => {
    let sqlQuery = "UPDATE employees SET firstName = ?, lastName = ?, salary = ? WHERE id = ?";
    let load = [req.body.firstName, req.body.lastName, req.body.salary, req.body.id];
    let query = dbConnection.query(sqlQuery, load).then(([result, fields]) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});

// Remove an existing employee
router.delete("/employees", (req, res) => {
    let sqlQuery = "DELETE FROM employees WHERE id= ?";
    let query = dbConnection.query(sqlQuery, req.body.id).then(([result, fields]) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
});


module.exports = router;