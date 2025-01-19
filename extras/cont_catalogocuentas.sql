-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 04-01-2025 a las 00:21:44
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fiver`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cont_catalogocuentas`
--

CREATE TABLE `cont_catalogocuentas` (
  `codigo` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL COMMENT 'numero de cuenta',
  `descripcion` varchar(200) DEFAULT NULL COMMENT 'nombre de la cuenta',
  `moneda` varchar(3) DEFAULT NULL COMMENT 'moneda de la cuenta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cont_catalogocuentas`
--

INSERT INTO `cont_catalogocuentas` (`codigo`, `descripcion`, `moneda`) VALUES
('730358741', 'BAC Cuenta Cheques', 'HNL'),
('742398331', 'BAC Cuenta Ahorro', 'HNL');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cont_catalogocuentas`
--
ALTER TABLE `cont_catalogocuentas`
  ADD PRIMARY KEY (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
