-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Dim 30 Novembre 2014 à 18:04
-- Version du serveur: 5.5.40-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `uniforms`
--

-- --------------------------------------------------------

--
-- Structure de la table `ans_input`
--

CREATE TABLE IF NOT EXISTS `ans_input` (
  `ans_id` int(11) NOT NULL AUTO_INCREMENT,
  `formans_id` int(11) NOT NULL,
  `ans_value` varchar(255) NOT NULL,
  PRIMARY KEY (`ans_id`),
  KEY `FK_FORMANS_ANSINPUT` (`formans_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ch_input`
--

CREATE TABLE IF NOT EXISTS `ch_input` (
  `input_id` int(11) NOT NULL AUTO_INCREMENT,
  `formlist_id` int(11) NOT NULL,
  PRIMARY KEY (`input_id`),
  KEY `FK_FORMLIST_INPUT` (`formlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `form`
--

CREATE TABLE IF NOT EXISTS `form` (
  `form_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `form_status` int(11) NOT NULL,
  `form_anonymous` tinyint(1) NOT NULL DEFAULT '0',
  `form_printable` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`form_id`),
  KEY `FK_USER_FORM` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

-- --------------------------------------------------------

--
-- Structure de la table `formans`
--

CREATE TABLE IF NOT EXISTS `formans` (
  `formans_id` int(11) NOT NULL AUTO_INCREMENT,
  `formdest_id` int(11) NOT NULL,
  `formlist_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`formans_id`),
  KEY `FK_FORMDEST_FORMANS` (`formdest_id`),
  KEY `FK_FORMLIST_FORMANS` (`formlist_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Structure de la table `formdest`
--

CREATE TABLE IF NOT EXISTS `formdest` (
  `formdest_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `formdest_status` int(11) NOT NULL,
  PRIMARY KEY (`formdest_id`),
  KEY `FK_FORM_FORMDEST` (`form_id`),
  KEY `FK_USER_FORMDEST` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

-- --------------------------------------------------------

--
-- Structure de la table `formlist`
--

CREATE TABLE IF NOT EXISTS `formlist` (
  `formlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_id` int(11) NOT NULL,
  `type_element` varchar(255) NOT NULL,
  PRIMARY KEY (`formlist_id`),
  KEY `FK_FORM_FORMLIST` (`form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`user_id`, `user_name`) VALUES
(0, 'Anonymous'),
(1, 'Ayoub'),
(2, 'Genevieve'),
(3, 'Luis'),
(4, 'Romain');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `ans_input`
--
ALTER TABLE `ans_input`
  ADD CONSTRAINT `FK_FORMANS_ANSINPUT` FOREIGN KEY (`formans_id`) REFERENCES `formans` (`formans_id`);

--
-- Contraintes pour la table `ch_input`
--
ALTER TABLE `ch_input`
  ADD CONSTRAINT `FK_FORMLIST_INPUT` FOREIGN KEY (`formlist_id`) REFERENCES `formlist` (`formlist_id`);

--
-- Contraintes pour la table `form`
--
ALTER TABLE `form`
  ADD CONSTRAINT `FK_USER_FORM` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `formans`
--
ALTER TABLE `formans`
  ADD CONSTRAINT `FK_FORMDEST_FORMANS` FOREIGN KEY (`formdest_id`) REFERENCES `formdest` (`formdest_id`),
  ADD CONSTRAINT `FK_FORMLIST_FORMANS` FOREIGN KEY (`formlist_id`) REFERENCES `formlist` (`formlist_id`);

--
-- Contraintes pour la table `formdest`
--
ALTER TABLE `formdest`
  ADD CONSTRAINT `FK_FORM_FORMDEST` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`),
  ADD CONSTRAINT `FK_USER_FORMDEST` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `formlist`
--
ALTER TABLE `formlist`
  ADD CONSTRAINT `FK_FORM_FORMLIST` FOREIGN KEY (`form_id`) REFERENCES `form` (`form_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;