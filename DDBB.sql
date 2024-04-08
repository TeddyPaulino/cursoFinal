-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2024 a las 17:06:20
-- Versión del servidor: 10.1.16-MariaDB
-- Versión de PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cambio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `Id_Cliente` int(11) NOT NULL,
  `Nombres` varchar(60) NOT NULL,
  `Apellidos` varchar(60) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Tipo_Doc` varchar(10) NOT NULL,
  `Documento` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Id_Estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Clientes';

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`Id_Cliente`, `Nombres`, `Apellidos`, `Direccion`, `Telefono`, `Tipo_Doc`, `Documento`, `Email`, `Id_Estado`) VALUES
(1, 'Juan Pablo', 'Caballero Segura', 'avenida el paramo 5656', '3154857878', 'Cedula', 1086000600, 'nt@nt.com', 1),
(2, 'Armando ', 'puchana rosero', 'avenida rumichaca1', '3157878787', 'DNI', 4578899, 'notiene@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comision`
--

CREATE TABLE `comision` (
  `Id_Comision` int(10) NOT NULL,
  `Id_Tipo_Transaccion` tinyint(1) NOT NULL COMMENT '1Ciompra-2Venta',
  `Id_Moneda` varchar(3) NOT NULL,
  `Comision` double NOT NULL,
  `Comision_Min` double NOT NULL,
  `Comision_Max` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla comision';

--
-- Volcado de datos para la tabla `comision`
--

INSERT INTO `comision` (`Id_Comision`, `Id_Tipo_Transaccion`, `Id_Moneda`, `Comision`, `Comision_Min`, `Comision_Max`) VALUES
(1, 1, 'DOP', 1.74, 1.5, 1.8),
(2, 1, 'USD', 1.71, 1.6, 1.72),
(3, 1, 'CAD', 1.29, 1.25, 1.3),
(4, 1, 'EUR', 1.91, 1.85, 1.92),
(5, 1, 'HTG', 0.01, 0.01, 0.32),
(6, 1, 'MXN', 0.1, 0.08, 0.12),
(7, 2, 'COP', 1.74, 1.5, 1.9),
(8, 2, 'USD', 1.71, 1.6, 1.75),
(9, 2, 'CAD', 1.29, 1.25, 1.29),
(10, 2, 'EUR', 1.91, 1.85, 1.93),
(11, 2, 'HTG', 0.01, 0.01, 0.05),
(18, 2, 'MXN', 1.5, 1.82, 2.25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `Id_Compra` int(11) NOT NULL,
  `Id_Cliente` int(10) NOT NULL,
  `Id_Tipo_Moneda` varchar(3) NOT NULL,
  `Cantidad_Recibida` int(10) NOT NULL,
  `Tasa` double NOT NULL,
  `Cantidad_Entregar` double NOT NULL,
  `Comision` double NOT NULL,
  `Fecha_Transaccion` date NOT NULL DEFAULT '0000-00-00',
  `Factura` int(10) NOT NULL COMMENT 'numero de factura transaccion'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla Compras';

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`Id_Compra`, `Id_Cliente`, `Id_Tipo_Moneda`, `Cantidad_Recibida`, `Tasa`, `Cantidad_Entregar`, `Comision`, `Fecha_Transaccion`, `Factura`) VALUES
(27, 27486400, 'USD', 45, 56.02, 2519.3, 1.6, '2024-03-28', 1),
(28, 27486400, 'USD', 56, 56.02, 3135.5200000000004, 1.6, '2024-03-28', 2),
(29, 27486400, 'USD', 100, 56.02, 5600.4, 1.6, '2024-03-28', 3),
(30, 27486400, 'USD', 25, 56.02, 1398.9, 1.6, '2024-03-28', 2),
(31, 27486400, 'USD', 56, 56.02, 3135.5200000000004, 1.6, '2024-03-28', 5),
(32, 27486400, 'USD', 15, 56.02, 838.7, 1.6, '2024-03-28', 4),
(33, 27486400, 'USD', 52, 56.02, 2911.44, 1.6, '2024-03-28', 2),
(34, 4578899, 'MXN', 50, 5.4, 268.18, 1.82, '2024-03-29', 6),
(35, 4578899, 'EUR', 60, 62.85, 3769.15, 1.85, '2024-03-29', 7),
(36, 4578899, 'DOP', 1000, 56.02, 56018.5, 1.5, '2024-03-29', 8),
(37, 1086000600, 'USD', 100, 66.02, 6600.4, 1.6, '2024-03-29', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `Id_Fac` int(9) NOT NULL,
  `Num_Fac` int(9) NOT NULL COMMENT 'Numero de factura',
  `Id_Cliente` int(10) NOT NULL COMMENT 'cedula del cliente',
  `Valor` double NOT NULL COMMENT 'valor de la factura'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`Id_Fac`, `Num_Fac`, `Id_Cliente`, `Valor`) VALUES
(105, 1, 27486400, 5799998.1),
(106, 2, 27486400, 2847.85),
(107, 3, 1086242222, 21598.71),
(108, 4, 1086000600, 39933.25),
(109, 5, 4578899, 5075.7),
(110, 6, 4578899, 268.18),
(111, 7, 4578899, 3769.15),
(112, 8, 4578899, 56018.5),
(113, 9, 1086000600, 6600.4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasa_cambio`
--

CREATE TABLE `tasa_cambio` (
  `Id_Tasa` int(10) NOT NULL,
  `Id_Tipo_Moneda` varchar(3) NOT NULL,
  `Tasa_Venta` double NOT NULL,
  `Tasa_Compra` double NOT NULL,
  `Fecha_Actualizacion` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla tasa de cambio';

--
-- Volcado de datos para la tabla `tasa_cambio`
--

INSERT INTO `tasa_cambio` (`Id_Tasa`, `Id_Tipo_Moneda`, `Tasa_Venta`, `Tasa_Compra`, `Fecha_Actualizacion`) VALUES
(1, 'COP', 58, 56.02, '2024-03-28 00:00:00'),
(2, 'USD', 67.05, 66.02, '2024-03-29 00:00:00'),
(3, 'CAD', 43.2, 42.1, '2024-03-28 00:00:00'),
(4, 'EUR', 63.8, 62.85, '2024-03-28 00:00:00'),
(5, 'HTG', 0.44, 0.34, '2024-03-28 00:00:00'),
(6, 'MXN', 6.56, 5.4, '2024-03-29 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_moneda`
--

CREATE TABLE `tipo_moneda` (
  `Id_Moneda` int(10) NOT NULL,
  `Nombre_Moneda` varchar(100) CHARACTER SET latin1 NOT NULL,
  `Codigo_Moneda` varchar(3) CHARACTER SET latin1 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla tipo moneda';

--
-- Volcado de datos para la tabla `tipo_moneda`
--

INSERT INTO `tipo_moneda` (`Id_Moneda`, `Nombre_Moneda`, `Codigo_Moneda`) VALUES
(1, 'Peso dominicano (Dominicana)', 'DOP'),
(3, 'Dolar canadiense (Canada)', 'CAD'),
(4, 'Euro (Europa e islas)', 'EUR'),
(5, 'Gourde (haiti)', 'HTG'),
(6, 'Peso mexicano (Mexico)', 'MXN'),
(13, 'Peso Argentino (argentina)', 'ARS'),
(14, 'Dolar Estados Unidos (Estados Unidos)', 'USD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id_Usuario` int(11) NOT NULL,
  `Nombres` varchar(60) NOT NULL,
  `Apellidos` varchar(60) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Tipo_Doc` varchar(11) NOT NULL,
  `Documento` int(11) NOT NULL,
  `Id_Estado` tinyint(1) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Contrasena` varchar(10) NOT NULL,
  `Comentarios` varchar(200) NOT NULL,
  `Rol` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla Usuarios';

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id_Usuario`, `Nombres`, `Apellidos`, `Direccion`, `Telefono`, `Tipo_Doc`, `Documento`, `Id_Estado`, `Email`, `Contrasena`, `Comentarios`, `Rol`) VALUES
(1, 'Maria petroninla', 'Ortega Mipaz', 'Cra 4 b los andes bogota', '3158405259', 'DNI', 27486400, 1, 'j@notiene.com', '1234555555', 'modificada', 'Usuario'),
(3, 'rocio', 'durcal', 'avenida los chilocs', '3154782323', 'Cedula', 1086782525, 1, 'notitne@yahoo.com', '1234567897', 'usuario desde el form', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `Id_Venta` int(11) NOT NULL,
  `Id_Cliente` int(10) NOT NULL,
  `Id_Tipo_Moneda` varchar(3) NOT NULL,
  `Cantidad_Vendida` int(10) NOT NULL,
  `Tasa` double NOT NULL,
  `Cantidad_Recibida` double NOT NULL,
  `Comision` double NOT NULL,
  `Fecha_Transaccion` date NOT NULL DEFAULT '0000-00-00',
  `Factura` int(10) NOT NULL COMMENT 'numero de factura transaccion'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla Compras Cantida recibida es el valor en DOP que se recibe x la venta';

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`Id_Venta`, `Id_Cliente`, `Id_Tipo_Moneda`, `Cantidad_Vendida`, `Tasa`, `Cantidad_Recibida`, `Comision`, `Fecha_Transaccion`, `Factura`) VALUES
(63, 27486400, 'DOP', 100000, 58, 5799998.1, 1.9, '2024-03-28', 1),
(64, 27486400, 'MXN', 800, 3.56, 2847.85, 0.15, '2024-03-28', 2),
(65, 1086242222, 'CAD', 500, 43.2, 21598.71, 1.29, '2024-03-28', 3),
(66, 1086000600, 'USD', 700, 57.05, 39933.25, 1.75, '2024-03-28', 4),
(67, 4578899, 'USD', 89, 57.05, 5075.7, 1.75, '2024-03-28', 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`Id_Cliente`);

--
-- Indices de la tabla `comision`
--
ALTER TABLE `comision`
  ADD PRIMARY KEY (`Id_Comision`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`Id_Compra`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`Id_Fac`),
  ADD UNIQUE KEY `Num_Fac` (`Num_Fac`);

--
-- Indices de la tabla `tasa_cambio`
--
ALTER TABLE `tasa_cambio`
  ADD PRIMARY KEY (`Id_Tasa`);

--
-- Indices de la tabla `tipo_moneda`
--
ALTER TABLE `tipo_moneda`
  ADD PRIMARY KEY (`Id_Moneda`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id_Usuario`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`Id_Venta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `Id_Cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `comision`
--
ALTER TABLE `comision`
  MODIFY `Id_Comision` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `Id_Compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `Id_Fac` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
--
-- AUTO_INCREMENT de la tabla `tasa_cambio`
--
ALTER TABLE `tasa_cambio`
  MODIFY `Id_Tasa` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `tipo_moneda`
--
ALTER TABLE `tipo_moneda`
  MODIFY `Id_Moneda` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id_Usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `Id_Venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
