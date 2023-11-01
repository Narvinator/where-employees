INSERT INTO department
  (name)
VALUES
  ('Legal'),
  ('Sales'),
  ('Cooking'),
  ('Entertainment');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Lawyer', 250000, 1),
  ('Restaurant Owner', 175000, 2),
  ('Chef', 80000000, 3),
  ('Basketball Player', 47610000, 4);


INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Saul', 'Goodman', 1, 3),
  ('Gustavo', 'Fring', 2, 4),
  ('Walter', 'White', 3, 1),
  ('LeBron', 'James', 4, 2);