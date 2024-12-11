CREATE TABLE scoreboard (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(50) NOT NULL,
    checkpoint_1 INTEGER DEFAULT 0,
    checkpoint_2 INTEGER DEFAULT 0,
    checkpoint_3 INTEGER DEFAULT 0,
    checkpoint_4 INTEGER DEFAULT 0,
    checkpoint_5 INTEGER DEFAULT 0
);

INSERT INTO scoreboard (group_name) 
VALUES 
('Group 1'), ('Group 2'), ('Group 3'), 
('Group 4'), ('Group 5'), ('Group 6'), 
('Group 7'), ('Group 8'), ('Group 9'), 
('Group 10');
