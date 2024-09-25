create database insumos_productos if not exists;

use insumos_productos;

create table if not exists `INSUMO`  (
  `INSUMO_ID` int not null auto_increment,
  `NOMBRE` varchar(45) default NULL,
  `IMAGEN` mediumblob default NULL,
  `COSTO_UNITARIO` decimal(18,2) default NULL,
  `LINK` varchar(500) default NULL,
  primary key(`INSUMO_ID`)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

create table if not exists `PRODUCTO` (
  `PRODUCTO_ID` int not null auto_increment,
  `NOMBRE` varchar(45) default NULL,
  `COSTO_UNITARIO` decimal(18,2) default NULL,
  `LINK` varchar(500) default NULL,
  `IMAGEN` mediumblob default NULL,
  `GANANCIA` decimal(9,4) default NULL,
  `TIPO_PRECIO` enum('fijo', 'dinamico') default 'fijo',
   primary key(`PRODUCTO_ID`)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `FORMULA_DETALLE` (
  `FORMULA_DETALLE_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCTO_ID` int NOT NULL,
  `INGREDIENTE_ID` int NOT NULL,
  `TIPO_INGREDIENTE` varchar(20) NOT NULL,
  `CANTIDAD` decimal(18,2) DEFAULT 1,
  PRIMARY KEY (`FORMULA_DETALLE_ID`),
  FOREIGN KEY (`PRODUCTO_ID`) REFERENCES PRODUCTO(`PRODUCTO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `FORMULA_DETALLE`
  ADD UNIQUE KEY `avoid_duplicates` (`PRODUCTO_ID`,`INGREDIENTE_ID`,`TIPO_INGREDIENTE`);