﻿-- MySQL Script generated by MySQL Workbench
-- Mon May 14 14:37:54 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema allugardb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema allugardb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `allugardb` DEFAULT CHARACTER SET utf8 ;
USE `allugardb` ;

-- -----------------------------------------------------
-- Table `allugardb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allugardb`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `nome` VARCHAR(45) NULL,
  `endereco` VARCHAR(90) NULL,
  `place_id` VARCHAR(60) NULL,
  `telefone` VARCHAR(45) NULL,
  `avaliacao` FLOAT NULL,
  `imagemMenor` LONGTEXT NULL,
  `imagemCompleta` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allugardb`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allugardb`.`item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `locatario` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `avaliacao` FLOAT NULL,
  `preço` FLOAT NOT NULL,
  `descrição` VARCHAR(85) NULL,
  `data_publicacao` BIGINT NOT NULL,
  `imagemMenor` LONGTEXT NULL,
  `imagemCompleta` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_item_usuarios1_idx` (`locatario` ASC),
  CONSTRAINT `fk_item_usuarios1`
    FOREIGN KEY (`locatario`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `allugardb`.`conversas`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `allugardb`.`conversas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item_id` INT NOT NULL,
  `locatario_id` INT NOT NULL,
  `locador_id` INT NOT NULL,
   PRIMARY KEY (`id`),
    FOREIGN KEY (`item_id`)
    REFERENCES `allugardb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`locatario_id`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`locador_id`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `allugardb`.`mensagens`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `allugardb`.`mensagens` (
  `id` INT NOT NULL,
  `conversa_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `datahora` BIGINT NOT NULL,
  `mensagem` VARCHAR(100),
   PRIMARY KEY (`id`),
    FOREIGN KEY (`conversa_id`)
    REFERENCES `allugardb`.`conversas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (`usuario_id`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `allugardb`.`lista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allugardb`.`lista` (
  `usuarios_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  PRIMARY KEY (`usuarios_id`, `item_id`),
  INDEX `fk_usuarios_has_item_item2_idx` (`item_id` ASC),
  INDEX `fk_usuarios_has_item_usuarios1_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_usuarios_has_item_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_has_item_item2`
    FOREIGN KEY (`item_id`)
    REFERENCES `allugardb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allugardb`.`itens-alugados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allugardb`.`itens-alugados` (
  `usuarios_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `check-in` DATE NULL,
  `check-out` DATE NULL,
  PRIMARY KEY (`usuarios_id`, `item_id`),
  INDEX `fk_usuarios_has_alugando_usuarios1_idx` (`usuarios_id` ASC),
  INDEX `fk_itens-alugados_item1_idx` (`item_id` ASC),
  CONSTRAINT `fk_usuarios_has_alugando_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `allugardb`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_itens-alugados_item1`
    FOREIGN KEY (`item_id`)
    REFERENCES `allugardb`.`item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
