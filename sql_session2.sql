CREATE DATABASE node47;

USE node47;


CREATE TABLE users(
	full_name VARCHAR(100),
	email VARCHAR(255),
	age INT,
	pass_word VARCHAR(255)
	
)


INSERT INTO users (full_name, email, age, pass_word) VALUES 
('Nguyen Van A', 'nguyenvana@example.com', 25, 'password123'),
('Le Thi B', 'lethib@example.com', 30, 'passw0rd!'),
('Tran Van C', 'tranvanc@example.com', 22, 'mypassword456'),
('Pham Thi D', 'phamthid@example.com', 27, 'abc123xyz'),
('Do Quang Khai', 'khaidq@example.com', 23, 'KhaiPassword!'),
('Nguyen Thi E', 'nguyenthie@example.com', 26, 'securepass789'),
('Le Van F', 'levanf@example.com', 21, 'strongpass111'),
('Tran Thi G', 'tranthig@example.com', 29, 'passkey2021'),
('Nguyen Van H', 'nguyenvanh@example.com', 24, 'password789'),
('Le Thi I', 'lethii@example.com', 31, 'passme2022'),
('Tran Van J', 'tranvanj@example.com', 28, 'jpasspassword!'),
('Pham Van K', 'phamvank@example.com', 22, 'vank_pass432'),
('Do Thi L', 'dothil@example.com', 27, 'secretpass100'),
('Nguyen Van M', 'nguyenvanm@example.com', 24, 'mypassword999'),
('Le Thi N', 'lethin@example.com', 25, 'newpassword123'),
('Tran Van O', 'tranvano@example.com', 26, 'opassword567'),
('Pham Thi P', 'phamthip@example.com', 30, 'strongpassp@ss'),
('Do Van Q', 'dovanq@example.com', 28, 'quypasspass!'),
('Nguyen Thi R', 'nguyenthir@example.com', 23, 'securepassR@123'),
('Le Van S', 'levans@example.com', 21, 'Spasswordstrong!')


SELECT
	full_name AS 'Họ tên' , email
FROM
	users
	
	
	
SELECT * FROM users WHERE 25 <= age and age <= 30

SELECT * FROM users WHERE age BETWEEN 25 and 30 ORDER by age ASC LIMIT 5



ALTER TABLE users ADD COLUMN address VARCHAR(255),ADD COLUMN phone VARCHAR(255)


ALTER TABLE users MODIFY address VARCHAR(100)

#Thêm ràng buộc
ALTER TABLE users MODIFY COLUMN full_name VARCHAR(100) NOT NULL

# cách 1
SELECT * FROM users WHERE age = (SELECT age FROM users ORDER BY age DESC limit 1)
# cách 2

SELECT * FROM users WHERE age = (SELECT MAX(age) FROM users)

SELECT * FROM users WHERE full_name LIKE '%le%'


SELECT COUNT(*) FROM users

#Khoá chính

#thêm khoá chính cho users

ALTER TABLE users ADD COLUMN user_id INT PRIMARY KEY AUTO_INCREMENT

