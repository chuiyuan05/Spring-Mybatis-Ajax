DROP DATABASE IF EXISTS mybatisdb;
CREATE DATABASE mybatisdb DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS t_user ;

USE mybatisdb;

CREATE TABLE t_user(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR (30),
  password VARCHAR (30),
  sex VARCHAR (30),
  birthday datetime,
  address VARCHAR (30)
)ENGINE=InnoDB;


INSERT INTO t_user (username, sex, password)
  VALUES ('admin','male', '123456');

INSERT INTO t_user (username, sex, password)
VALUES ('admin1','female', '123456');

COMMIT ;