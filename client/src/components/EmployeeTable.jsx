import { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import { Alert, AlertTitle } from '@material-ui/lab';

// component to display & provide CRUD operations
function EmployeeTable() {
    // table contents
    const [employees, setEmployees] = useState();
    // list of encountered errors
    const [errors, setErrors] = useState([]);
    // const [columns, setColumns] = useState();

    const url = "/api/employees"
    const header = {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded"
    }

    // helper function to GET at API
    const getEmployees = () => {
        let options = {
            method : "GET"
        };
        fetch(url, options).then(
            res => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            }
        ).then(
            data => {
                setEmployees(data);
                setErrors([]);
            }
        ).catch(e => {
            // setErrors([e]);
            console.log("Error fetching data: ", e.message);
        });
    }

    // dimension name & data key definition for Material-Table
    const columns = [
        {title: "ID", field: "id", editable: false},
        {title: "FirstName", field: "firstName"},
        {title: "LastName", field: "lastName"},
        {title: "Salary", field: "salary"},
    ]

    // callback function to process update action
    const handleUpdate = (newData, oldData, resolve) => {
        let errors = [];
        // front-end check data validity
        if (newData.firstName === "") errors.push("FirstName missing");
        if (newData.lastName === "") errors.push("LastName missing");
        if (newData.salary === "") errors.push("Salary missing");
        if (errors.length) {
            setErrors(errors);
            resolve();
        } else {
            let options = { 
                method : "PUT",
                headers: header, 
                body: JSON.stringify(newData)
            };
            fetch(url, options).then(
                res => {
                    if (res.ok) {
                        let modified = [...employees];
                        modified[oldData.tableData.id] = newData;
                        setEmployees([...modified]);
                        resolve();
                        setErrors([]);
                    } else {
                        throw res;
                    }
                }
            ).catch(e => {
                setErrors([e]);
                console.log("Error updating data: ", e.message);
            })
        }
    }

    // callback function to process add action
    const handleAdd = (newData, resolve) => {
        let errors = [];
        // // front-end check data validity
        if (newData.firstName === undefined) errors.push("FirstName missing");
        if (newData.lastName === undefined) errors.push("LastName missing");
        if (newData.salary === undefined) errors.push("Salary missing");
        if (errors.length > 0) {
            setErrors(errors);
            resolve();
        } else {
            let options = {
                method : "POST",
                headers: header,
                body: JSON.stringify(newData)
            };
            fetch(url, options).then(
                res => {
                    if (res.ok) {
                        resolve();
                        getEmployees();
                        setErrors([]);
                    } else {
                        throw res;
                    }
                }
            ).catch(e => {
                setErrors([e]);
                console.log("Error deleting data: ", e.message);
            })
        }
    }
    
    // callback function to process delete action
    const handleDelete = (oldData, resolve) => {
        let options = {
            method : "DELETE",
            headers: header,
            body: JSON.stringify({id : oldData.id})
        };
        fetch(url, options).then(
            res => {
                if (res.ok) {
                    let modified = [...employees];
                    modified.splice(oldData.tableData.id, 1);
                    setEmployees([...modified]);
                    resolve();
                    setErrors([]);
                } else {
                    throw res;
                }
            }
        ).catch(e => {
            setErrors([e]);
            console.log("Error deleting data: ", e.message);
        })
    }

    // fetch employee information
    useEffect(() => {
        getEmployees();
    }, []);

    return (
        <div>
            <MaterialTable
                title="Employee Data"
                data={employees}
                columns={columns}
                options={{
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    headerStyle: {borderBottomColor: 'green', borderBottomWidth: '4px'}
                }}
                editable={{
                    onRowUpdate: (newData, oldData) => {
                        return new Promise((resolve) => {
                            handleUpdate(newData, oldData, resolve);
                        });
                    },
                    onRowAdd: (newData) => {
                        return new Promise((resolve) => {
                            handleAdd(newData, resolve);
                        });
                    },
                    onRowDelete: (oldData) => {
                        return new Promise((resolve) => {
                            handleDelete(oldData, resolve);
                        });
                    }
                }}
            />
            {/* error display */}
            <div>
                {errors.length != 0 &&
                <Alert severity="error">
                    <AlertTitle>ERROR</AlertTitle>
                        {errors.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                </Alert>
                }
            </div>
        </div>
    );
};

export default EmployeeTable