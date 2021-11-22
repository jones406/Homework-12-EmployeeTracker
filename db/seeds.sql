USE employees_db;

INSERT INTO department
VALUES (1, "Sales"),
    (2, "Content Development"),
    (3, "Management");

SELECT * FROM employees_db.department;

INSERT INTO roles (title, salary, department_id)
VALUES ("Editor", 85000, 2),
    ("Designer", 88000, 2),
    ("Salesperson", 90000, 1),
    ("Manager", 120000, 3);

SELECT * FROM employees_db.roles;

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Brooke", "Jones", 1, null),
    ("Cy", "Jones", 4, 1),
    ("Sue", "Jones", 2, null),
    ("Scott", "Jones", 3, 3);

SELECT * FROM employees_db.employee;
