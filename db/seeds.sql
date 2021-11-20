--  You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.


INSERT INTO department
VALUES ("Sales"),
("Content Development"),
("Design"),


INSERT INTO role (title, salary, department_id)
VALUES ("Editor", 85000, 1),
("Designer", 88000, 2),
("Salesperson", 90000, 3),
("Manager", 120000, 4)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brooke", "Jones", 1, )