-- -------------------------------------------------------------
-- TablePlus 3.7.1(332)
--
-- https://tableplus.com/
--
-- Database: db_youtube
-- Generation Time: 2024-08-20 13:44:02.1530
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `room_id` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `code` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `permission` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `list_permission` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `refresh_token` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `video_name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `description` text,
  `views` int DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`video_id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `video_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `content` text,
  `reply_list` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_comment_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_like` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `video_id` int DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  `dis_like` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `video_id` (`video_id`),
  CONSTRAINT `video_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `video_like_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `video` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `video_type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `code` (`id`, `code`, `expired`) VALUES
('1', '1708224798752', '2024-02-18 02:53:18'),
('2', '1708225615899', '2024-02-18 03:06:55'),
('3', '1708225688713', '2024-02-18 03:08:08'),
('4', '1708226530401', '2024-02-18 03:22:10'),
('12', '02565b3e53', '2024-07-23 14:46:47');

INSERT INTO `role` (`role_id`, `role_name`, `list_permission`) VALUES
('1', 'ADMIN', NULL),
('2', 'MOD', NULL),
('3', 'USER', NULL);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `avatar`, `pass_word`, `face_app_id`, `role_id`, `refresh_token`) VALUES
('1', 'John Doe', 'john@example.com', 'http://res.cloudinary.com/dghvdbogx/image/upload/v1708524200/node39/cgnoxdrfftlfdfe8qu1j.jpg', 'hashed_pass1', 'face123', '3', NULL),
('2', 'Jane Smith', 'jane@example.com', 'avatar2.jpg', 'hashed_pass2', 'face456', '3', NULL),
('3', 'Admin User', 'admin@example.com', 'admin_avatar.jpg', 'hashed_pass3', 'face789', '1', NULL),
('4', 'Alice Johnson', 'alice@example.com', 'avatar3.jpg', 'hashed_pass4', 'face987', '3', NULL),
('5', 'Bob Brown', 'bob@example.com', '123121512_thor.jpeg', 'hashed_pass5', 'face654', '3', NULL),
('6', 'MCK', 'mck@gmail.com', '123121512_thor.jpeg', '$2b$10$edTpAwt6OFnIeAnz8NcAs.6oTUP.YviYXhQ/5Xpt5uSkJoUvWdlom', '', '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Niwia2V5IjoxNzIzMTIyMjg5NjcxfSwiaWF0IjoxNzIzMTIyMjg5LCJleHAiOjE3MjM3MjcwODl9.rKWmlv6h8hn1exrwpivjGy16xvglZcWU8YoZKV3gmbI');

INSERT INTO `video` (`video_id`, `video_name`, `thumbnail`, `description`, `views`, `source`, `user_id`, `type_id`) VALUES
('1', 'Introduction to Coding', 'deadpool.jpg', 'Learn the basics of coding', '1500', 'youtube.com', '1', '2'),
('2', 'Music Concert Highlights', 'deadpool.jpg', 'Highlights from a live music concert', '800', 'vimeo.com', '2', '3'),
('3', 'Gaming Adventure Episode 1', 'deadpool.jpg', 'First episode of a gaming adventure', '2500', 'twitch.tv', '3', '5'),
('4', 'Fashion Trends for Spring', 'deadpool.jpg', 'Latest fashion trends for the spring season', '1200', 'instagram.com', '4', '7'),
('5', 'Introduction to Cryptocurrency', 'deadpool.jpg', 'Understanding the basics of cryptocurrency', '300', 'youtube.com', '5', '9'),
('6', 'Full Stack Web Development Tutorial', 'http://res.cloudinary.com/dghvdbogx/image/upload/v1722343917/node43/qos3uy7t4tbdp5vknys0.jpg', 'Complete guide to full stack web development', '1200', 'youtube.com', '1', '2'),
('7', 'Acoustic Guitar Performance', '', 'Soulful acoustic guitar performance', '650', 'vimeo.com', '2', '3'),
('8', 'Epic Gaming Moments Compilation', 'gaming_compilation.jpg', 'Compilation of epic gaming moments', '3500', 'twitch.tv', '3', '5'),
('9', 'Fitness Workout Routine', 'fitness_workout.jpg', 'Effective fitness workout routine', '900', 'instagram.com', '4', '8'),
('10', 'Understanding Blockchain', 'blockchain_technology.jpg', 'Exploring the concepts of blockchain', '500', 'https://www.youtube.com/watch?v=CzXWhBjtRnU', '5', '9');

INSERT INTO `video_type` (`type_id`, `type_name`, `icon`) VALUES
('1', 'New', 'fa-solid fa-house'),
('2', 'Coding', 'fa-solid fa-code'),
('3', 'Music', 'fa-solid fa-music'),
('4', 'Movie', 'fa-solid fa-video'),
('5', 'Gaming', 'fa-sharp fa-solid fa-gamepad'),
('6', 'Sport', 'fa-solid fa-baseball'),
('7', 'Fashion', 'fa-sharp fa-solid fa-shirt'),
('8', 'Gym', 'fa-solid fa-dumbbell'),
('9', 'Crypto', 'fa-solid fa-diamond');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;