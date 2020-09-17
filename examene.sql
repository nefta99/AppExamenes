/*
SQLyog Professional v12.09 (64 bit)
MySQL - 10.1.30-MariaDB : Database - examene
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`examene` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `examene`;

/*Table structure for table `calificaciones` */

DROP TABLE IF EXISTS `calificaciones`;

CREATE TABLE `calificaciones` (
  `IdCalificacion` int(11) NOT NULL AUTO_INCREMENT,
  `Matricula` varchar(12) DEFAULT NULL,
  `Calificacion` float DEFAULT NULL,
  `IdCapitulo` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdCalificacion`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `calificaciones` */

/*Table structure for table `catcapitulos` */

DROP TABLE IF EXISTS `catcapitulos`;

CREATE TABLE `catcapitulos` (
  `IdCapitulo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(300) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `CreadoPor` varchar(12) DEFAULT NULL,
  `IdMateria` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdCapitulo`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `catcapitulos` */

insert  into `catcapitulos`(`IdCapitulo`,`Nombre`,`FechaCreacion`,`CreadoPor`,`IdMateria`) values (1,'Logica','2018-05-21 08:05:26','nef',5),(7,'Variables','2018-06-18 06:30:57','nef',4),(5,'Programacion visual','2018-05-21 09:50:57','nef',4),(6,'variables','2018-05-21 12:59:33','nef',2),(8,'Definiciones','2018-07-20 10:13:15','nef',6),(9,'Chaprpe',NULL,'Nef',NULL);

/*Table structure for table `catcomponentes` */

DROP TABLE IF EXISTS `catcomponentes`;

CREATE TABLE `catcomponentes` (
  `IdComponente` int(11) NOT NULL AUTO_INCREMENT,
  `TipoComponente` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`IdComponente`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `catcomponentes` */

insert  into `catcomponentes`(`IdComponente`,`TipoComponente`) values (1,'Select'),(2,'Radio'),(3,'Checkbox');

/*Table structure for table `catmaterias` */

DROP TABLE IF EXISTS `catmaterias`;

CREATE TABLE `catmaterias` (
  `IdMateria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(300) DEFAULT NULL,
  `FechaCreacion` datetime DEFAULT NULL,
  `CreadoPor` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`IdMateria`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `catmaterias` */

insert  into `catmaterias`(`IdMateria`,`Nombre`,`FechaCreacion`,`CreadoPor`) values (5,'Matematicas','2018-05-18 17:36:09','nef'),(2,'Fundamentos Programacion','2018-05-18 13:51:24','nef'),(4,'Visual Basic for Aplication','2018-05-18 15:28:08','nef'),(6,'FacturaciÃ³n','2018-07-20 10:05:42','nef');

/*Table structure for table `cattipousuario` */

DROP TABLE IF EXISTS `cattipousuario`;

CREATE TABLE `cattipousuario` (
  `IdTipoUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `TipoUsuario` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`IdTipoUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `cattipousuario` */

insert  into `cattipousuario`(`IdTipoUsuario`,`TipoUsuario`) values (1,'Administrador'),(2,'Alumno');

/*Table structure for table `histarialpreguntas` */

DROP TABLE IF EXISTS `histarialpreguntas`;

CREATE TABLE `histarialpreguntas` (
  `IdHistorialPregunta` int(11) NOT NULL AUTO_INCREMENT,
  `Matricula` varchar(12) DEFAULT NULL,
  `IdCapitulo` int(11) DEFAULT NULL,
  `IdPregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdHistorialPregunta`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;

/*Data for the table `histarialpreguntas` */

insert  into `histarialpreguntas`(`IdHistorialPregunta`,`Matricula`,`IdCapitulo`,`IdPregunta`) values (103,'mar',5,39),(104,'mar',5,40);

/*Table structure for table `historialrespuestas` */

DROP TABLE IF EXISTS `historialrespuestas`;

CREATE TABLE `historialrespuestas` (
  `IdHistorialRespueta` int(11) NOT NULL AUTO_INCREMENT,
  `IdRespuesta` int(11) DEFAULT NULL,
  `IdHistorialPregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdHistorialRespueta`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

/*Data for the table `historialrespuestas` */

insert  into `historialrespuestas`(`IdHistorialRespueta`,`IdRespuesta`,`IdHistorialPregunta`) values (73,66,103),(74,71,104);

/*Table structure for table `preguntas` */

DROP TABLE IF EXISTS `preguntas`;

CREATE TABLE `preguntas` (
  `IdPregunta` int(11) NOT NULL AUTO_INCREMENT,
  `Pregunta` varchar(300) DEFAULT NULL,
  `IdComponente` int(11) DEFAULT NULL,
  `IdCapitulo` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdPregunta`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

/*Data for the table `preguntas` */

insert  into `preguntas`(`IdPregunta`,`Pregunta`,`IdComponente`,`IdCapitulo`) values (1,'Â¿Define que es un PPD?',3,6),(2,'Ques una variable float',2,6),(3,'Que es un valor de tipo entero',1,6),(16,'Â¿Define que es un PPD?',3,8),(15,'Â¿Que es un PUE?',3,8),(13,'Ques un arreglo',3,6),(14,'Â¿Que viene siendo una definicion A?',3,8),(17,'Â¿Que es un CP?',2,8),(18,'Â¿A que corresponde un EG?',1,8),(29,'Que es mate',1,1),(28,'Que es la logica',2,1),(30,'x',1,8),(31,'x',1,8),(32,'x',1,8),(33,'x',1,8),(34,'x',1,8),(35,'cc',1,8),(36,'cc',1,8),(37,'cc',1,8),(38,'x',1,8),(39,'Que es la programacion visual',2,5),(40,'que es grid',3,5);

/*Table structure for table `respuestas` */

DROP TABLE IF EXISTS `respuestas`;

CREATE TABLE `respuestas` (
  `IdRespuesta` int(11) NOT NULL AUTO_INCREMENT,
  `Respuesta` varchar(300) DEFAULT NULL,
  `Valor` float DEFAULT NULL,
  `IdPregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdRespuesta`)
) ENGINE=MyISAM AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

/*Data for the table `respuestas` */

insert  into `respuestas`(`IdRespuesta`,`Respuesta`,`Valor`,`IdPregunta`) values (1,'Es algo valor que cambia',0.8,1),(2,'Es algo parecido al dinamismo',0.2,1),(3,'No cambia en el tiempo',0,1),(4,'Se mantiene',0,1),(5,'Forma una estructura',0,1),(6,'Es un entero',0,2),(7,'es una cadena de diguitos',0,2),(8,'en un numero con punto',1,2),(9,'es una fecha',0,2),(10,'es cuando es verdadero',0,2),(11,'Es un numero entero',1,3),(12,'Tiene valores como letras',0,3),(13,'Tiene un punto',0,3),(14,'Es una fecha concreta',0,3),(15,'es un solo caracter',0,3),(16,'Es una coleccion de datos de un mismo tipo',1,13),(17,'es una coleccion de datos de diferentes tipos',0,13),(18,'es una variable con muchas cosas',0,13),(19,'es algo logico',0,13),(20,'no tiene sentido',0,13),(21,'Anticipo',1,14),(22,'Egreso por Anticipo',0,14),(23,'Complemento',0,14),(24,'Egreso',0,14),(25,'Pagos',0,14),(26,'Anticipo',0,15),(27,'Egreso por Anticipo',0,15),(28,'Pago en una sola exhibisiÃ³n',1,15),(29,'Pago en parcialidades o diferido',0,15),(30,'Nota de debito',0,15),(31,'Nota de debito',0,16),(32,'Pago en parcialidades o diferido',1,16),(33,'Complemento de pago',0,16),(34,'Egreso',0,16),(35,'Egreso por anticipo',0,16),(36,'Anticipo',0,17),(37,'Complemento de pago',1,17),(38,'Egreso ',0,17),(39,'Pago en una sola exhivisiÃ³n',0,17),(40,'Egreso por anticipo',0,17),(41,'Pago en parcialidades o diferido',0,18),(42,'Pago en una sola exhibisiÃ³n',0,18),(43,'Complemento de pago',0,18),(44,'Egreso',1,18),(45,'Anticipo',0,18),(46,'Complemento de pago',0,20),(47,'Egreso por anticipo',0,20),(48,'Anticipo',0,20),(49,'Pago en una sola exihisiÃ³n',0,20),(50,'Nota de debito',1,20),(51,'a',0,28),(52,'b',1,28),(53,'c',0,28),(54,'d',0,28),(55,'e',0,28),(56,'algo',1,29),(57,'x',0,29),(58,'sal',0,29),(59,'hs',0,29),(60,'zacda',0,29),(61,'a',0,38),(62,'b',0,38),(63,'c',0,38),(64,'d',0,38),(65,'f',1,38),(66,'Es algo visual',1,39),(67,'es en consola',0,39),(68,'clases',0,39),(69,'valor',0,39),(70,'no se ',0,39),(71,'es una tabla',1,40),(72,'un componente',0,40),(73,'x',0,40),(74,'43e',0,40),(75,'erd',0,40);

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Matricula` varchar(12) NOT NULL,
  `Nombre` varchar(300) DEFAULT NULL,
  `ApellidoPaterno` varchar(300) DEFAULT NULL,
  `ApellidoMaterno` varchar(300) DEFAULT NULL,
  `Contrasenia` varchar(300) DEFAULT NULL,
  `IdTipoUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`Matricula`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Matricula`,`Nombre`,`ApellidoPaterno`,`ApellidoMaterno`,`Contrasenia`,`IdTipoUsuario`) values ('nef','Israel Neftali','Torres','Hernandez','123',1),('mar','Maribel','Cardenas','Guzman','123',2),('abi','Abinadabs','Torres','Hernandez','123',2),('aylin','Aylin Scarlett','Torres','Cardenas','123',1);

/* Procedure structure for procedure `sp_borrarCapitulo` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_borrarCapitulo` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_borrarCapitulo`(IN p_idcapitulo int)
BEGIN
	delete from catcapitulos where IdCapitulo = p_idcapitulo;
	select 'Ok' as Resultado;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_buscarPregunta` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_buscarPregunta` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscarPregunta`(in p_idmateria int, p_idcapitulo int)
BEGIN
	
	SELECT p.IdPregunta,p.Pregunta,co.TipoComponente
	FROM catmaterias  m    INNER JOIN catcapitulos c 
	ON m.IdMateria=c.IdMateria
	INNER JOIN preguntas p  ON p.idCapitulo =c.IdCapitulo
	INNER JOIN catcomponentes co ON co.IdComponente=p.IdComponente
	WHERE m.IdMateria=p_idmateria AND c.IdCapitulo=p_idcapitulo;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_buscarRespuestas` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_buscarRespuestas` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscarRespuestas`(in p_idpregunta int)
BEGIN
	
	SELECT r.IdRespuesta,r.Respuesta,p.IdComponente FROM respuestas r INNER JOIN preguntas p ON p.IdPregunta=r.IdPregunta
	WHERE p.IdPregunta = p_idpregunta;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_buscarRespuestaValores` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_buscarRespuestaValores` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscarRespuestaValores`(in p_idpregunta int )
BEGIN
	SELECT IdRespuesta,Respuesta,Valor FROM respuestas WHERE IdPregunta = p_idpregunta;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_busquedaUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_busquedaUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_busquedaUsuario`(in p_matricula varchar(100))
BEGIN
		SELECT Nombre,ApellidoPaterno,ApellidoMaterno, 'Existe' AS Resultado FROM usuarios WHERE Matricula =p_matricula;
	
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_cargarCapitulos` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_cargarCapitulos` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cargarCapitulos`()
BEGIN	
	SELECT c.IdCapitulo,c.Nombre AS Capitulo,m.Nombre AS Materia
	,c.CreadoPor,c.FechaCreacion FROM catcapitulos c INNER JOIN catmaterias m ON c.IdMateria=m.idMateria;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_cargarPreguntas` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_cargarPreguntas` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cargarPreguntas`()
BEGIN
	SELECT p.IdPregunta,p.Pregunta,com.TipoComponente 
	,c.Nombre AS Capitulo,m.Nombre AS Materia
	FROM preguntas p 
	INNER JOIN catcomponentes com ON p.IdComponente=com.IdComponente
	INNER JOIN catcapitulos c ON p.IdCapitulo = c.IdCapitulo
	INNER join catmaterias m ON c.IdMateria=m.IdMateria;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_catalogoCapitulo` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_catalogoCapitulo` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_catalogoCapitulo`(in p_idmateria int)
BEGIN
	SELECT IdCapitulo,Nombre AS Capitulo FROM catcapitulos where IdMateria=p_idmateria;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_catalogoCapituloSinM` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_catalogoCapituloSinM` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_catalogoCapituloSinM`(in p_materias varchar(300))
BEGIN
	
	SELECT c.IdCapitulo,c.nombre AS Capitulo FROM catcapitulos c INNER JOIN catmaterias m ON c.IdMateria=m.IdMateria
	WHERE m.nombre =p_materias;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_catalogoComponentes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_catalogoComponentes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_catalogoComponentes`()
BEGIN
	SELECT * FROM catcomponentes;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_CatTipoUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_CatTipoUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_CatTipoUsuario`()
BEGIN
	SELECT IdTipoUsuario,TipoUsuario FROM cattipousuario;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_editarPreguntas` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_editarPreguntas` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_editarPreguntas`(in p_idpregunta int , in p_idmateria int, in p_idcapitulo int, p_pregunta varchar(500), in p_idcomponente int)
BEGIN
	
		update preguntas  set IdComponente =p_idcomponente, IdCapitulo= p_idcapitulo, Pregunta=  p_pregunta WHERE Idpregunta=p_idpregunta;
		select 'Ok' as Salida;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_editarRespuestag` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_editarRespuestag` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_editarRespuestag`(
    IN p_r1 VARCHAR (500),
    IN p_r2 VARCHAR (500),
    IN p_r3 VARCHAR (500),
    IN p_r4 VARCHAR (500),
    IN p_r5 VARCHAR (500),
    IN p_v1 FLOAT,
    IN p_v2 FLOAT,
    IN p_v3 FLOAT,
    IN p_v4 FLOAT,
    IN p_v5 FLOAT,
    in p_id1 int ,
    IN p_id2 INT ,
    IN p_id3 INT ,
    IN p_id4 INT ,
    IN p_id5 INT ,
    IN p_idpregunta INT
    )
BEGIN
	update  respuestas set Respuesta=p_r1, Valor=p_v1 where idRespuesta =p_id1 and IdPregunta=p_idpregunta;
	UPDATE  respuestas SET Respuesta=p_r2, Valor=p_v2 WHERE idRespuesta =p_id2 AND IdPregunta=p_idpregunta;
	UPDATE  respuestas SET Respuesta=p_r3, Valor=p_v3 WHERE idRespuesta =p_id3 AND IdPregunta=p_idpregunta;
	UPDATE  respuestas SET Respuesta=p_r4, Valor=p_v4 WHERE idRespuesta =p_id4 AND IdPregunta=p_idpregunta;
	UPDATE  respuestas SET Respuesta=p_r5, Valor=p_v5 WHERE idRespuesta =p_id5 AND IdPregunta=p_idpregunta;
	select 'Ok' as Respuesta;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_eliminarMaterias` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_eliminarMaterias` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminarMaterias`(in p_idMateria int)
BEGIN
	delete from catmaterias where IdMateria=p_idMateria;
	select 'Ok' as Resultado;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_guardarHistorialPregunta` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_guardarHistorialPregunta` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardarHistorialPregunta`(in p_idcapitulo int, in p_matricula varchar(300), in p_idpregunta int)
BEGIN
	declare v_valor int;	
	INSERT INTO histarialpreguntas(Matricula,IdCapitulo,IdPregunta)
	VALUE(p_matricula,p_idcapitulo,p_idpregunta);
	
	set v_valor =  (select IdHistorialPregunta from histarialpreguntas  where Matricula = p_matricula and IdCapitulo= p_idcapitulo and IdPregunta = p_idpregunta);
	
	select 'Guardado' as Resultado, v_valor as 'IdhisPregunta' ;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_guardarHistorialRespuestass` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_guardarHistorialRespuestass` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardarHistorialRespuestass`(in p_idhistoriapregunta int, in p_idrespuesta int)
BEGIN
	insert into historialrespuestas(IdRespuesta,IdHistorialPregunta) values(p_idrespuesta,p_idhistoriapregunta);
	select 'Guardado' as Resultado;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_GuardarMaterias` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_GuardarMaterias` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GuardarMaterias`(in p_materia varchar(1000), in p_usuario varchar(1000))
BEGIN
	
	IF NOT EXISTS(SELECT * FROM catmaterias WHERE nombre=p_materia) THEN
		INSERT INTO catmaterias(Nombre,FechaCreacion,CreadoPor)VALUES(p_materia,now(),p_usuario);
		SELECT 'Ok' AS Salida;
	ELSE
		SELECT 'Ya existe' AS Salida;
	END IF;
	
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_guardarPregunta` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_guardarPregunta` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardarPregunta`(in p_idmateria int,in p_idcapitulo int, in p_pregunta varchar(500),in p_idcomponente int )
BEGIN
	declare v_idpregunta int;
	insert into preguntas(Pregunta,IdComponente,IdCapitulo)
	values(p_pregunta,p_idcomponente,p_idcapitulo);
	set v_idpregunta =( select  max(IdPregunta) from preguntas where Pregunta =p_pregunta and IdComponente = p_idcomponente and IdCapitulo=p_idcapitulo);
	select 'Ok' as Resultado, v_idpregunta as IdPregunta ;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_guardarUsuariosVevos` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_guardarUsuariosVevos` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardarUsuariosVevos`(in p_nombre varchar(300),in p_apellidoP varchar(100),IN p_apellidoM VARCHAR(100)
    ,in p_tipoUsuario int, in p_matricula varchar(300),in p_password varchar(300))
BEGIN
	INSERT INTO usuarios(Matricula,Nombre,ApellidoPaterno,ApellidoMaterno,Contrasenia,IdTipoUsuario)
	VALUES(p_matricula,p_nombre,p_apellidoP,p_apellidoM,p_password,p_tipoUsuario);
	
	select 'Guardado' as Resultado;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_guardarvaloresRespuesta` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_guardarvaloresRespuesta` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardarvaloresRespuesta`(
    IN p_r1 varchar (500),
    IN p_r2 VARCHAR (500),
    IN p_r3 VARCHAR (500),
    IN p_r4 VARCHAR (500),
    IN p_r5 VARCHAR (500),
    in p_v1 float,
    IN p_v2 FLOAT,
    IN p_v3 FLOAT,
    IN p_v4 FLOAT,
    IN p_v5 FLOAT,
    in p_idpregunta int
    )
BEGIN
		insert into respuestas(Respuesta,Valor,IdPregunta) values(p_r1,p_v1,p_idpregunta);
		INSERT INTO respuestas(Respuesta,Valor,IdPregunta) VALUES(p_r2,p_v2,p_idpregunta);
		INSERT INTO respuestas(Respuesta,Valor,IdPregunta) VALUES(p_r3,p_v3,p_idpregunta);
		INSERT INTO respuestas(Respuesta,Valor,IdPregunta) VALUES(p_r4,p_v4,p_idpregunta);
		INSERT INTO respuestas(Respuesta,Valor,IdPregunta) VALUES(p_r5,p_v5,p_idpregunta);
		select 'Ok' as Respuesta;
		
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_hayExamen` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_hayExamen` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hayExamen`(in p_capitulo int , in p_matricula varchar(300))
BEGIN
	declare v_mensaje varchar(300);
	set v_mensaje ='No Existe';
	
	if(Not exists(SELECT IdHistorialPregunta FROM histarialpreguntas WHERE Matricula =p_matricula AND IdCapitulo=p_capitulo)) then
		SET v_mensaje ='No Existe';
	else
		SET v_mensaje ='Existe';
	end if;
	select v_mensaje as Resultado;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_hayExamenCapitulos` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_hayExamenCapitulos` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_hayExamenCapitulos`(in p_idcapitulo int , in p_idmateria int)
BEGIN
	declare v_mensaje varchar(30);
	set v_mensaje ='No';
	if(exists(SELECT m.IdMateria FROM catmaterias  m    INNER JOIN catcapitulos c 
			ON m.IdMateria=c.IdMateria
		   WHERE m.IdMateria=p_idmateria AND c.IdCapitulo=p_idcapitulo)
	) then
		if(exists (SELECT * FROM preguntas WHERE IdCapitulo =p_idcapitulo )) then
			SET v_mensaje ='Existe';
		else
			SET v_mensaje ='No';
		end if;
	end if;
	
	select v_mensaje as Resultado;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_mostrarMaterias` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_mostrarMaterias` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mostrarMaterias`()
BEGIN
    /*Muestra las materias en el grid*/
	SELECT IdMateria,Nombre,FechaCreacion,CreadoPor FROM catmaterias;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_resAdminSistema` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_resAdminSistema` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_resAdminSistema`(in p_idpregunta int)
BEGIN
	SELECT p.IdPregunta,p.IdComponente,r.IdRespuesta,r.Valor 
	FROM preguntas p INNER JOIN respuestas r ON p.IdPregunta = r.IdPregunta
	WHERE p.IdPregunta = p_idpregunta;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_resUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_resUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_resUsuario`(in p_matricula varchar(100),in p_idpregunta int)
BEGIN
	SELECT p.Matricula,
	       p.IdPregunta,
	       e.IdRespuesta,
	       e.Valor,
	       g.IdComponente
	FROM histarialpreguntas p 
	INNER JOIN preguntas g ON g.IdPregunta = p.IdPregunta
	INNER JOIN historialrespuestas r ON p. IdHistorialPregunta = r.IdHistorialPregunta
	INNER JOIN respuestas e ON e.IdRespuesta=r.IdRespuesta
	WHERE p.Matricula =p_matricula
	AND p.IdPregunta=p_idpregunta;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_sacarvaloresEjemplo` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_sacarvaloresEjemplo` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sacarvaloresEjemplo`(in p_matricula varchar(100), in p_idcapitulo int)
BEGIN
	SELECT IdCapitulo,IdPregunta FROM histarialpreguntas WHERE Matricula=p_matricula AND IdCapitulo=p_idcapitulo;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_tablaUsuarios` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_tablaUsuarios` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tablaUsuarios`()
BEGIN
		
	SELECT Matricula,Nombre,ApellidoPaterno,ApellidoMaterno,TipoUsuario,Contrasenia 
	FROM usuarios u INNER JOIN cattipousuario  t ON u.IdTipoUsuario=t.IdTipoUsuario;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_tipoUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_tipoUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_tipoUsuario`(in p_usuario varchar(300))
BEGIN
	select c.TipoUsuario from cattipousuario c inner join usuarios u on c.IdTipoUsuario = u.IdTipoUsuario 
	where matricula = p_usuario;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_ValidaUsario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_ValidaUsario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ValidaUsario`(
	in p_usuario varchar(300),
	in p_pass varchar(300)
    )
BEGIN
	DECLARE v_msj  VARCHAR(300);
	if exists(SELECT * FROM usuarios WHERE matricula=p_usuario)then
		if exists(SELECT * FROM usuarios WHERE contrasenia=p_pass and matricula=p_usuario ) then
			set v_msj ='Valido';
		else
			SET v_msj ='No valido';
		end if;
	else
			set v_msj = 'No existe usuario';
	end if;
	select v_msj as Resultado;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
