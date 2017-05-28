CREATE DATABASE IF NOT EXISTS `Node`;

USE `Node`;

CREATE TABLE `Node`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `author` VARCHAR(255) NULL,
  `text` VARCHAR(255) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`));
  
INSERT INTO `Node`.`messages` (`id`, `author`, `text`, `date`) VALUES ('1', 'Author 1', 'Text 1', CURDATE());
INSERT INTO `Node`.`messages` (`id`, `author`, `text`, `date`) VALUES ('2', 'Author 2', 'Text 2', CURDATE());
INSERT INTO `Node`.`messages` (`id`, `author`, `text`, `date`) VALUES ('3', 'Author 1', 'Text 3', CURDATE());
INSERT INTO `Node`.`messages` (`id`, `author`, `text`, `date`) VALUES ('4', 'Author 2', 'Text 4', CURDATE());