-- MySQL Script generated by MySQL Workbench
-- Wed Mar 14 21:53:58 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `nome` VARCHAR(45) NULL,
  `endereco` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  `avaliacao` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  `preço` VARCHAR(45) NULL,
  `descrição` VARCHAR(45) NULL,
  `imagem` LONGTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`itens-hospedados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`itens-hospedados` (
  `usuarios_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`, `item_id`),
  INDEX `fk_usuarios_has_item_item1_idx` (`item_id` ASC),
  INDEX `fk_usuarios_has_item_usuarios_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_usuarios_has_item_usuarios`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_item_item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `mydb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`lista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`lista` (
  `usuarios_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`, `item_id`),
  INDEX `fk_usuarios_has_item_item2_idx` (`item_id` ASC),
  INDEX `fk_usuarios_has_item_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_usuarios_has_item_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_item_item2`
    FOREIGN KEY (`item_id`)
    REFERENCES `mydb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`itens-alugados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`itens-alugados` (
  `usuarios_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `check-in` DATE NULL,
  `check-out` DATE NULL,
  PRIMARY KEY (`usuarios_id`, `item_id`),
  INDEX `fk_usuarios_has_alugando_usuarios1_idx` (`usuarios_id` ASC),
  INDEX `fk_itens-alugados_item1_idx` (`item_id` ASC),
  CONSTRAINT `fk_usuarios_has_alugando_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `mydb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens-alugados_item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `mydb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;