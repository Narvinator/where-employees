const inquirer = require('inquirer');
const db = require('./db/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to Database');
    employee_tracker();
});

let employee_tracker = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'prompt',
        message: 'Select from the following.',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Log Out']
    }]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'Select department name',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Department input required');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add a role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                
                if (err) throw err; 

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'Which role is it?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Role input required');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Salary input required');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`)
                        employee_tracker();
                    });
                })
            });
        }
    })}