const express = require('express');
const employeeInfo = require('./routes/EmployeeInfo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", employeeInfo);

app.get("/healthCheck", (req, res) => {
    res.json("Hello World");
});

app.listen(5000, () => {console.log("Server started on port 5000")});

