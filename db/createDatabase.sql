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
   primary key(`PRODUCTO_ID`)
) engine=InnoDB default charset=utf8 collate=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `FORMULA_DETALLE` (
  `FORMULA_DETALLE_ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCTO_ID` int NOT NULL,
  `INSUMO_ID` int DEFAULT NULL,
  `SUBPRODUCTO_ID` int DEFAULT NULL,
  `CANTIDAD` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`FORMULA_DETALLE_ID`),
  FOREIGN KEY (`PRODUCTO_ID`) REFERENCES PRODUCTO(`PRODUCTO_ID`),
  FOREIGN KEY (`INSUMO_ID`) REFERENCES INSUMO(`INSUMO_ID`),
  FOREIGN KEY (`SUBPRODUCTO_ID`) REFERENCES PRODUCTO(`PRODUCTO_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `FORMULA_DETALLE`
  ADD KEY `PRODUCTO_ID` (`PRODUCTO_ID`),
  ADD KEY `SUBPRODUCTO_ID` (`SUBPRODUCTO_ID`),
  ADD KEY `INSUMO_ID` (`INSUMO_ID`);

ALTER TABLE `formula_detalle`
  ADD CONSTRAINT `formula_detalle_ibfk_2` FOREIGN KEY (`PRODUCTO_ID`) REFERENCES `PRODUCTO` (`PRODUCTO_ID`),
  ADD CONSTRAINT `formula_detalle_ibfk_3` FOREIGN KEY (`SUBPRODUCTO_ID`) REFERENCES `PRODUCTO` (`PRODUCTO_ID`),
  ADD CONSTRAINT `formula_detalle_ibfk_4` FOREIGN KEY (`INSUMO_ID`) REFERENCES `INSUMO` (`INSUMO_ID`);
