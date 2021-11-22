const mysql = require('mysql2');
const inquirer = require('inquirer');
//const { response } = require('express');
//const cTable = require("console.table");

// connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'mypassword',
    database: 'employees_db'
  }
);

let begin = () => {
  inquirer.prompt([
    {
      message: "What would you like to do?",
      name: "start",
      type: "rawlist",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Quit"]
    }
  ])
    .then(ans => {
      if (ans.start === 'Add a department') {
        addDepartment();
      } else if
        (ans.start === 'Add a role') {
        addRole();
      } else if
        (ans.start === 'Add an employee') {
        addEmployee();
      } else if
        (ans.start === 'View all departments') {
        viewDepartments();
      } else if
        (ans.start === 'View all roles') {
        viewRoles();
      } else if
        (ans.start === 'View all employees') {
        viewEmployees();
      } else if
        (ans.start === 'Update an employee') {
        updateEmployee();
      }
    })
}

begin();

function addDepartment() {
  const addDeptQs = [
    {
      type: 'input',
      name: 'new_dept',
      message: 'Enter the name of your new department:'
    }
  ];
  inquirer.prompt(addDeptQs)
    .then(ans => {
      db.query('insert into department (department_name) values (?)', [ans.new_dept], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Your new department has been added.');
          begin();
        }
      })
    })
}

function addRole() {
  const depts = [];
  db.query('select id from employees_db.department', (err, results) => {
    if (err) {
      console.log(err);
    } else {
      for(i = 0; i < results.length; i++) {
        depts.push(results[i].id);
      }
    }
  }) 
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'Enter the name of the new role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this new role: $'
    },
    {
      type: 'rawlist',
      name: 'department',
      message: 'Which department number is the new role?',
      choices: depts
    }
  ])
    .then(response => {
      db.query('INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)', [response.role, response.salary, response.department], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Your new role has been added.");
          begin();
        }
      })
    })
}

// function addEmployee() {
//   const emps = [];
//   const mgrs = [];
//   db.query('select title from employees_db.roles', (err, results) => {
//     if (err) {
//       console.log(err);
//     } else {
//       for(i = 0; i < results.length; i++) {
//         emps.push(results[i].title);
//       }
//     }
//   }) 
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'first_name',
//       message: "What is the new employee's first name?"
//     },
//     {
//       type: 'input',
//       name: 'last_name',
//       message: "What is the new employee's last name?"
//     },
//     {
//       type: 'rawlist',
//       name: 'role_title',
//       message: 'What role are you adding?',
//       choices: emps
//     },
//     {
//       type: 'rawlist',
//       name: 'manager_id',
//       message: '',
//       choices: mgrs
//     }
//   ]
//   .then(response => {
//       db.query('INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)', [response.role, response.salary, deptid], (err, results) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.table(results);
//           begin();
//         }
//       })
//     })
// }

function viewRoles() {
  db.query('select * from roles',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        begin();
      }
    })
}

function viewEmployees() {
  db.query('SELECT employee.id AS "ID", concat(employee.first_name,"  ",employee.last_name ) AS "Name", roles.title AS "Title", roles.salary AS "Salary", department.department_name AS "Dept" ,concat(manager.first_name," ",manager.last_name) AS "Manager" FROM employees_db.employee AS employee LEFT JOIN employees_db.employee AS manager ON manager.id = employee.manager_id LEFT JOIN employees_db.roles AS roles ON employee.role_id = roles.id LEFT JOIN employees_db.department AS department ON department.id = roles.department_id',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results),
        begin();
      }
    }
  )
}

function viewDepartments() {
  db.query('select * from department',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        begin();
      }
    })
}

// Update employee: new role
// const updateEmployee = [
//   {
//     type: 'input',
//     name: 'id',
//     message: "What is the employee's ID?"
//   },
//   {
//     type: 'input',
//     name: 'role_id',
//     message: "What is the role ID for the new position?"
//   },
// ]