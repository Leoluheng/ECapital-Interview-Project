const express = require('express');
const employeeInfo = require('./routes/EmployeeInfo');

// Constants
const PORT = 5000;

// App
const app = express();

// use of middleware to handle content-type header
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register Employee information CRUD APIs
app.use("/api", employeeInfo);

app.get("/healthCheck", (req, res) => {
    res.json("Hello World");
});

app.listen(PORT, () => {console.log("Server started on port 8080")});

