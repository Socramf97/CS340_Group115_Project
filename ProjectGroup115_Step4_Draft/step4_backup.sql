-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_fabiancm
-- ------------------------------------------------------
-- Server version	10.6.19-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(64) NOT NULL,
  `customerType` varchar(16) NOT NULL,
  `customerRace` varchar(16) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `customerID` (`customerID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Joseph Carlson','Adventurer','Human',1),(2,'Emma Rose','Merchant','Elf',NULL),(3,'Grumly Rockstone','Miner','Dwarf',2),(4,'Grog Skullcrusher','Mercenary','Orc',3);
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employees` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `employeeName` varchar(64) NOT NULL,
  `employeeRace` varchar(16) NOT NULL,
  PRIMARY KEY (`employeeID`),
  UNIQUE KEY `employeeID` (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'Bob','Human'),(2,'Carlenia','Elf'),(3,'Bort Rockstone','Dwarf');
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProducts`
--

DROP TABLE IF EXISTS `OrderProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderProducts` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `transactionID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`orderID`),
  UNIQUE KEY `orderID` (`orderID`),
  KEY `transactionID` (`transactionID`),
  KEY `productID` (`productID`),
  CONSTRAINT `OrderProducts_ibfk_1` FOREIGN KEY (`transactionID`) REFERENCES `SalesOrders` (`transactionID`) ON DELETE CASCADE,
  CONSTRAINT `OrderProducts_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `Products` (`productID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProducts`
--

LOCK TABLES `OrderProducts` WRITE;
/*!40000 ALTER TABLE `OrderProducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Products` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(64) NOT NULL,
  `itemType` varchar(64) NOT NULL,
  `itemRarity` varchar(16) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantityStocked` int(11) NOT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `productID` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (23,'test','test','test',4.00,4),(24,'t','e','s',3.00,3);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesOrders`
--

DROP TABLE IF EXISTS `SalesOrders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SalesOrders` (
  `transactionID` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` int(11) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `orderDate` date NOT NULL,
  `totalPrice` decimal(19,2) NOT NULL,
  PRIMARY KEY (`transactionID`),
  UNIQUE KEY `transactionID` (`transactionID`),
  KEY `customerID` (`customerID`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `SalesOrders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE,
  CONSTRAINT `SalesOrders_ibfk_2` FOREIGN KEY (`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesOrders`
--

LOCK TABLES `SalesOrders` WRITE;
/*!40000 ALTER TABLE `SalesOrders` DISABLE KEYS */;
INSERT INTO `SalesOrders` VALUES (1,3,1,'2024-11-01',60.00),(2,1,2,'2024-11-02',100.00),(3,3,1,'2024-11-01',60.00),(4,1,2,'2024-11-02',100.00);
/*!40000 ALTER TABLE `SalesOrders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working for fabiancm!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 20:40:02
