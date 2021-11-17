// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');

let begin = () => {
    inquirer.prompt([
      {
        message: "What would you like to do?",
        name: "begin",
        type: "list",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "Quit"] //to do: add default or error
      }
    ])
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role