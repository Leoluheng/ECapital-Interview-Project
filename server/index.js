const express = require('express');
const employeeInfo = require('./routes/EmployeeInfo');

const app = express();

// use of middleware to handle content-type header
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register Employee information CRUD APIs
app.use("/api", employeeInfo);

app.get("/healthCheck", (req, res) => {
    res.json("Hello World");
});

app.listen(5000, () => {console.log("Server started on port 5000")});

