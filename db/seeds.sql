--  You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.


INSERT INTO department
VALUES ("department_one"),
("department_two"),
("department_three"),


INSERT INTO role (title, salary, department_id)
VALUES ("jefe", true, 1),

INSERT INTO employee (first_name, last_name, role_id, manager_id)