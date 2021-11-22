// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');
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
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee", "Quit"]
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
      db.query('insert into department (name) values (?)', [ans.new_dept], (err, results) => {
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
  const addRoleQs = [
    {
      type: 'input',
      name: 'new_role',
      message: 'Enter the name of the new role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this new role: $'
    },
    {
      type: 'input',
      name: 'department',
      message: 'In which department is the new role?'
    }
  ];
  inquirer.prompt(addRoleQs)
    .then(ans => {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)', [response.role, response.salary, deptid], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
          begin();
        }
      })
    })
}

function addEmployee() {
  const addEmployeeQs = [
    {
      type: 'input',
      name: 'first_name',
      message: "What is the new employee's first name?"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the new employee's last name?"
    },
    {
      type: 'rawlist',
      name: 'role_id',
      message: ''
    },
    {
      type: 'rawlist',
      name: 'manager_id',
      message: ''
    }
  ];
  inquirer.prompt(addEmployeeQs)
    .then(ans => {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)', [response.role, response.salary, deptid], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.table(results);
          begin();
        }
      })
    })
}

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
  db.query('select * from employees',
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        begin();
      }
    })
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

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const updateEmployee = [
  {
    type: 'input',
    name: 'id',
    message: "What is the employee's ID?"
  },
  {
    type: 'input',
    name: 'role_id',
    message: "What is the role ID for the new position?"
  },
]