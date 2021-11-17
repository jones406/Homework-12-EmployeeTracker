DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30)
);

-- department_id ref employee role
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
  -- make dept id a foreign key to id in dept table
);

-- role_id ref employee role
-- manager_id ref to another employee, null if no manager
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  -- make role id a foreign key to id in role table
  manager_id INT
  -- make mgr id a foreign key to id in this table
);