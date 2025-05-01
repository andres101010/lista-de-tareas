CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`)
);


CREATE TABLE `tarea` (
  `idtarea` int NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `content` varchar(45) NOT NULL,
  `id_user` int NOT NULL,
  `status` enum('pendiente','en_progreso','completada') NOT NULL DEFAULT 'pendiente',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idtarea`),
  UNIQUE KEY `idtarea_UNIQUE` (`idtarea`),
  KEY `fk_task_user_idx` (`id_user`),
  CONSTRAINT `fk_task_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
);