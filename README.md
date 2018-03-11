# Udemy Javascript-Node.js - Aplicação para salvar geolocalização

Este repositório contém a aplicação RESTful desenvolvida com Node.js que permite salvar a geolocalização de um usuário em um banco de dados MySQL.
Você encontra a explicação passo a passo do desenvolvimento da aplicação neste link:

https://www.udemy.com/aplicacoes-web-na-pratica-javascript-nodejs/?couponCode=FB_DEC_JANFEB

## SQL do banco gerado

```sql
CREATE DATABASE IF NOT EXISTS `db`;
USE `db` ;

CREATE TABLE IF NOT EXISTS `db`.`places` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `place_id` VARCHAR(30) NULL DEFAULT NULL,
  `address` TEXT NULL DEFAULT NULL,
  `image` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
```

Lembre-se de instalar os módulos antes de executar o projeto

```
npm install
```
