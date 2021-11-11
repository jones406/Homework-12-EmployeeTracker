DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30)
);


-- department_id ref employee role
CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30)
  salary DECIMAL
  department_id: INT
);

-- role_id ref employee role
-- manager_id ref to another employee, null if no manager
CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30)
  last_name VARCHAR(30)
  role_id INT
  manager_id: INT
);

