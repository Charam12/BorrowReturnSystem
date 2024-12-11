-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.0 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for BorrowReturnSystem
CREATE DATABASE IF NOT EXISTS `BorrowReturnSystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `BorrowReturnSystem`;

-- Dumping structure for table BorrowReturnSystem.BorrowRecord
CREATE TABLE IF NOT EXISTS `BorrowRecord` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `equipmentId` int NOT NULL,
  `borrowAt` datetime(3) NOT NULL,
  `dueAt` datetime(3) NOT NULL,
  `returnedAt` datetime(3) DEFAULT NULL,
  `status` enum('PENDING_APPROVAL','PENDING_PICKUP','BORROWED','RETURNED','LATE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `BorrowRecord_userId_fkey` (`userId`),
  KEY `BorrowRecord_equipmentId_fkey` (`equipmentId`),
  CONSTRAINT `BorrowRecord_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `BorrowRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table BorrowReturnSystem.BorrowRecord: ~0 rows (approximately)

-- Dumping structure for table BorrowReturnSystem.Category
CREATE TABLE IF NOT EXISTS `Category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table BorrowReturnSystem.Category: ~2 rows (approximately)
INSERT INTO `Category` (`id`, `name`) VALUES
	(1, 'test1'),
	(2, 'Test');

-- Dumping structure for table BorrowReturnSystem.Equipment
CREATE TABLE IF NOT EXISTS `Equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `serial` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int NOT NULL,
  `status` enum('AVAILABLE','BORROWED','MAINTENANCE','DAMAGED') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Equipment_serial_key` (`serial`),
  KEY `Equipment_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Equipment_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table BorrowReturnSystem.Equipment: ~0 rows (approximately)

-- Dumping structure for table BorrowReturnSystem.User
CREATE TABLE IF NOT EXISTS `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileImg` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '/img/calm-student-with-downtown-background.jpg',
  `role` enum('ADMIN','USER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table BorrowReturnSystem.User: ~1 rows (approximately)
INSERT INTO `User` (`id`, `username`, `password`, `firstName`, `lastName`, `profileImg`, `role`, `createdAt`) VALUES
	(1, 'admin', '$2b$10$og3I26bXwMRM.yv01Ox6POT3Ub2PEB5Eb3Mz.zNvga5R/O2QtQScW', 'test', 'test', '/img/calm-student-with-downtown-background.jpg', 'ADMIN', '2024-12-11 11:32:38.526');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
