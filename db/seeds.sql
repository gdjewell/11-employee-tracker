INSERT INTO departments (name) VALUES
("Sales"),
("Support"),
("Legal"),
("Engineering");


INSERT INTO role (title, salary, department_id) VALUES
("Sales Manager", 95000, 1),
("Sales Representative", 54000, 1),
("Technical Support Tech", 55000, 2),
("Tech Support Lead", 71000, 2),
("Tech Support Manager", 89000, 2),
("Lawyer", 125000, 3),
("Senior Developer", 142000, 4),
("Junior Developer", 78000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Adam", "Laplante", 1, null),
("Zach", "Ender", 2, 2),
("Jack", "Childs", 3, 3),
("Monica", "Debois", 4, null),
("Avery", "ODonell", 5, 3),
("Doug", "Lovely", 6, 2),
("Rachel", "Studevant", 7, null),
("Kacey", "Madison", 8, 1);