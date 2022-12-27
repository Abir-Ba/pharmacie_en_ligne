CREATE TABLE IF NOT EXISTS `Etudiant` (
  `IdEtudiant` INT NOT NULL,
  `Nom` VARCHAR(45) NOT NULL,
  `Prenom` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `comments` TEXT NOT NULL,
  `status` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idEtudiant`),

    )
ENGINE = InnoDB;