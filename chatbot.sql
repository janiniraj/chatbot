CREATE TABLE chatbot_db.`app_user` (
  `email` varchar(100) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `mark_status` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO chatbot_db.app_user (email, first_name, last_name) VALUES ('abc@yahoo.com', 'Abc', 'Def');
INSERT INTO chatbot_db.app_user (email, first_name, last_name) VALUES ('fulan@gmail.com', 'Fulan', 'Bot');