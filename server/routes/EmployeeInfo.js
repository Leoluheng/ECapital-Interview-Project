const express = require('express');
const dbConnection = require("../data/mysqlConnection");
const router = express.Router();

// Retrieve all employees
router.get("/employees", (req, res) => {
    let sqlQuery = "SELECT * FROM employees";
    let query = dbConnection.query(sqlQuery, (err, result) => {
        res.json(result);
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
    let query = dbConnection.query(sqlQuery, load, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Update an existing employee
router.put("/employees", (req, res) => {
    let sqlQuery = "UPDATE employees SET firstName = ?, lastName = ?, salary = ? WHERE id = ?";
    let load = [req.body.firstName, req.body.lastName, req.body.salary, req.query.id];
    let query = dbConnection.query(sqlQuery, load, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

// Remove an existing employee
router.delete("/employees", (req, res) => {
    let sqlQuery = "DELETE FROM employees WHERE id= ?";

    let query = dbConnection.query(sqlQuery, req.query.id, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


module.exports = router;