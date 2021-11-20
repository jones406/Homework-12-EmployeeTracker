// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
      }
    })
  }

begin();

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  const addDept = [
    {
    type: 'input',
    name: 'new_dept',
    message: 'Enter the name of your new department:'
    }
  ];
  inquirer.prompt(addDept)
  .then(ans => {
    db.query('insert into department (name) values (?)', [ans.new_dept], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        begin();
      }
    })
  })
}

function viewDepartments(){
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


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const addRole = [
  {
  type: 'input',
  name: 'role',
  message: 'Enter the name of the new role:'
  },
  {
  type: 'input',
  name: 'salary',
  message: 'Enter the salary for the new role:'
  },
  {
  type: 'input',
  name: 'dept_id',
  message: 'Which department will have this position?'
  },
];

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const addEmployee = [
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
      },
      
];

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
];