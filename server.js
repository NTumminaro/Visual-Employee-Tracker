const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')

// Connect to Database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db'
  },
  console.log("Connection Successful")
);

// Function to view all employee information, including information from foreign keys
function viewEmployees() {
    db.query('SELECT e.id, e.first_name, e.last_name, r.title, r.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager FROM employee AS e INNER JOIN roles as r ON e.roles_id = r.id INNER JOIN employee AS e2 ON e.manager_id = e2.id', function (err, results) {
        console.table(results);
        start();
    })
};

// Function to view all departments
function viewDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        start();
    })
};

// Function to view all roles, and their associated departments from the foreign key
function viewRoles() {
    db.query('SELECT r.id, r.title, d.dept_name FROM roles AS r INNER JOIN department AS d ON r.department_id = d.id', function (err, results) {
        console.table(results);
        start();
    })
};

// function to add departments based on responses to inquirer prompts
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the new department's name?",
            name: "department_name"
        }
    ]).then((response) => {
            db.query('INSERT INTO department SET ?', {dept_name: response.department_name}, function (err, results) {
            console.log("Department successfully added!")
        start();
        })
    })
};

// function to add roles based on responses to inquirer prompts
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the new role's name?",
            name: "role_name"
        },
        {
            type: "input",
            message: "What's the new role's Salary?",
            name: "role_salary"
        },
        {
            type: "input",
            message: "What is the department id for this new roll?",
            name: "role_dept"
        },
        // This can probably be done if I change all the functions to async await, may change in future
        // {
        //     type: "list",
        //     message: "What is the department for this new roll?",
        //     name: "role_dept",
        //     choices: db.query('SELECT dept_name FROM department'), function (err, results) {console.log(results)}
        // }
    ]).then((response) => {
            db.query('INSERT INTO roles SET ?', {title: response.role_name, department_id: response.role_dept, salary: response.role_salary}, function (err, results) {
            console.log("Role successfully added!")
        start();
        })
    })
};

// function to add employees based on responses to inquirer prompts
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What's the employee's first name?",
            name: "first"
        },
        {
            type: "input",
            message: "What's the employee's last name?",
            name: "last"
        },
        {
            type: "input",
            message: "What is the new employee's role id?",
            name: "role"
        },
        {
            type: "input",
            message: "What is the id of the new employee's manager? (can be left blank)",
            name: "manager"
        }
    ]).then((response) => {
            db.query('INSERT INTO employee SET ?', {first_name: response.first, last_name: response.last, manager_id: response.manager, roles_id: response.role}, function (err, results) {
            console.log("Employee successfully added!")
        start();
        })
    })
};

function updateEmployee() {
    inquirer.prompt([
        // There's something to this, but the inquirer syntax is really difficult to fight
        // {
        //     type: "list",
        //     message: "Which employee would you like to modify?",
        //     name: "employee",
        //     choices: [function fetchNames() {
        //         db.query('SELECT id, CONCAT(first_name, " ", last_name) FROM employee', function (err, results) {
        //             console.log(results);
        //             })}]
        // }
        {
            type: "input",
            message: "Enter the employee id of the employee you would like to modify:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the role id to change the employee's role to:",
            name: "role"
        }
    ]).then((response) => {
            db.query('UPDATE employee SET roles_id = ? WHERE id = ?', [response.role, response.id], function (err, results) {
            console.log("Employee Updated Succesfully!")})
        start();
    })
}

function title() {

    // Title Card
    console.log(`
---------------------------------------------------------------------------------
  _______ __   __ _______ ___     _______ __   __ _______ _______  
 |       |  |_|  |       |   |   |       |  | |  |       |       |
 |    ___|       |    _  |   |   |   _   |  |_|  |    ___|    ___|
 |   |___|       |   |_| |   |   |  | |  |       |   |___|   |___ 
 |    ___|       |    ___|   |___|  |_|  |_     _|    ___|    ___|
 |   |___| ||_|| |   |   |       |       | |   | |   |___|   |___ 
 |_______|_|   |_|___|   |_______|_______| |___| |_______|_______|
  __   __ _______ __    _ _______ _______ _______ ______   
 |  |_|  |       |  |  | |       |       |       |    _ |  
 |       |   _   |   |_| |   _   |    ___|    ___|   | ||  
 |       |  |_|  |       |  |_|  |   | __|   |___|   |_||_ 
 |       |       |  _    |       |   ||  |    ___|    __  |
 | ||_|| |   _   | | |   |   _   |   |_| |   |___|   |  | |
 |_|   |_|__| |__|_|  |__|__| |__|_______|_______|___|  |_|

---------------------------------------------------------------------------------
`)};

function start() {

    // Inquirer initial prompt
    inquirer
        .prompt([
            {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: [ 
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'quit'
            ]
            }
        ])
        .then((response) => {
            // Switch case for which menu item is selected
            switch(response.menu) {

                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'Add Employee': 
                    addEmployee();
                    break;

                case 'Update Employee Role': 
                    updateEmployee()
                    break;

                case 'View All Roles': 
                    viewRoles();
                    break;
                    
                case 'Add Role': 
                    addRole();
                    break;

                case 'View All Departments': 
                    viewDepartments();
                    break;

                case 'Add Department': 
                    addDepartment();
                    break;

                default:
                    process.exit(0);
            };
        });
    };

// calls the title function, and the initial start function    
title();
start();
