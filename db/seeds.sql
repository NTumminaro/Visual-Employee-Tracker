INSERT INTO department (dept_name)
VALUES ("Bakery"),
       ("Customer Service"),
       ("Stocking"),
       ("Produce");

INSERT INTO roles (title, salary, department_id)
VALUES ("Cake Decorator", 20000.00, 1),
       ("Bakery Manager", 30000.00, 1),
       ("Baker", 20000.00, 1),
       ("Bakery Assistant", 10000.00, 1),
       ("Cashier", 5000.00, 2),
       ("Overnight Stocker", 8000.00, 3),
       ("CS Manager", 30000.00, 2),
       ("Overnight Manager", 30000.00, 3),
       ("Produce Manager", 30000.00, 4),
       ("Fruit Cutter", 6000.00, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES  ("Nicky", "Tee", 1, 2),
        ("Reginald", "Powers", 2, NULL),
        ("Mario", "Pizza", 3, 2),
        ("Pasta", "Lasagna", 4, 2),
        ("Tony", "Pizza", 5, 6),
        ("Dragon", "Monkey D.", 7, NULL),
        ("Luffy", "Monkey D.", 5, 6),
        ("Tony Tony", "Chopper", 5, 6),
        ("Fire Fist", "Ace", 6, 10),
        ("White", "Beard", 8, NULL),
        ("Sabo", "From One Piece", 6, 8),
        ("Sanji", "Vinsmoke", 9, NULL),
        ("Zoro", "Roronoa", 10, 9);
