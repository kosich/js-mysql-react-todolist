
CREATE DATABASE IF NOT EXISTS todolist;

CREATE TABLE IF NOT EXISTS todolist.todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    done INT(1)
);


