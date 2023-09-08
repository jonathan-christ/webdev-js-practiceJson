-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2023 at 11:48 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE contactlist;

USE contactlist;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contactlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contNum` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `lastName`, `firstName`, `email`, `contNum`) VALUES
(14, 'Calaycay', 'Matthew Cedric', 'r@gm.com', '09988530481'),
(15, 'Capoy', 'Rey Laurence', 'afp@gma.com', '09988530481'),
(16, 'Sanchez', 'Bryan', 'roasid@gma.com', '09988530481'),
(17, 'Park', 'Linkin', 'lp@gmail.com', '09988530481'),
(18, 'Yap', 'Joselito Jr.', 'jyap@gma.com', '09988530481'),
(19, 'Pumar', 'Angelo', 'apumar@gmail.com', '09998853012'),
(20, 'Borces', 'Nathaniel', 'nborces@gmail.com', '09210239212'),
(21, 'Schulz', 'Jared', 'jschulz@afsmf.com', '09978853048'),
(26, 'Boundary', 'One', 'ru@gasdas.com', '0998812323'),
(31, 'Man', 'Person', 'mp@god.com', '09912327232');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
