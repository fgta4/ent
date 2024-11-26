-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_cust`;
-- drop table if exists `mst_custaccess`;
-- drop table if exists `mst_custsession`;
-- drop table if exists `mst_custwalinkreq`;


CREATE TABLE IF NOT EXISTS `mst_cust` (
	`cust_id` varchar(14) NOT NULL , 
	`cust_name` varchar(60) NOT NULL , 
	`cust_phone` varchar(60)  , 
	`cust_email` varchar(60)  , 
	`cust_password` varchar(60)  , 
	`cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`gender_id` varchar(1)  , 
	`cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0, 
	`cust_birthdate` date  , 
	`cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1, 
	`cust_reasonrejectoffer` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `cust_phone` (`cust_phone`),
	UNIQUE KEY `cust_email` (`cust_email`),
	PRIMARY KEY (`cust_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Customer';


ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_name` varchar(60) NOT NULL  AFTER `cust_id`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_phone` varchar(60)   AFTER `cust_name`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_email` varchar(60)   AFTER `cust_phone`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_password` varchar(60)   AFTER `cust_email`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `cust_password`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(1)   AFTER `cust_isdisabled`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0 AFTER `gender_id`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_birthdate` date   AFTER `cust_ishasbirthinfo`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1 AFTER `cust_birthdate`;
ALTER TABLE `mst_cust` ADD COLUMN IF NOT EXISTS  `cust_reasonrejectoffer` varchar(255)   AFTER `cust_isrecvoffer`;


ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_name` varchar(60) NOT NULL   AFTER `cust_id`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_phone` varchar(60)    AFTER `cust_name`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_email` varchar(60)    AFTER `cust_phone`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_password` varchar(60)    AFTER `cust_email`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `cust_password`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `gender_id` varchar(1)    AFTER `cust_isdisabled`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_ishasbirthinfo` tinyint(1) NOT NULL DEFAULT 0  AFTER `gender_id`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_birthdate` date    AFTER `cust_ishasbirthinfo`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_isrecvoffer` tinyint(1) NOT NULL DEFAULT 1  AFTER `cust_birthdate`;
ALTER TABLE `mst_cust` MODIFY COLUMN IF EXISTS  `cust_reasonrejectoffer` varchar(255)    AFTER `cust_isrecvoffer`;


ALTER TABLE `mst_cust` ADD CONSTRAINT `cust_phone` UNIQUE IF NOT EXISTS  (`cust_phone`);
ALTER TABLE `mst_cust` ADD CONSTRAINT `cust_email` UNIQUE IF NOT EXISTS  (`cust_email`);

ALTER TABLE `mst_cust` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);

ALTER TABLE `mst_cust` ADD CONSTRAINT `fk_mst_cust_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);





CREATE TABLE IF NOT EXISTS `mst_custaccess` (
	`custaccess_id` varchar(14) NOT NULL , 
	`custaccesstype_id` varchar(10)  , 
	`custaccess_code` varchar(60)  , 
	`custaccess_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`cust_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `custaccess_code` (`custaccess_code`),
	PRIMARY KEY (`custaccess_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kontak Customer untuk keperluan access, login, atau kontak (no HP, email)';


ALTER TABLE `mst_custaccess` ADD COLUMN IF NOT EXISTS  `custaccesstype_id` varchar(10)   AFTER `custaccess_id`;
ALTER TABLE `mst_custaccess` ADD COLUMN IF NOT EXISTS  `custaccess_code` varchar(60)   AFTER `custaccesstype_id`;
ALTER TABLE `mst_custaccess` ADD COLUMN IF NOT EXISTS  `custaccess_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `custaccess_code`;
ALTER TABLE `mst_custaccess` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custaccess_isdisabled`;


ALTER TABLE `mst_custaccess` MODIFY COLUMN IF EXISTS  `custaccesstype_id` varchar(10)    AFTER `custaccess_id`;
ALTER TABLE `mst_custaccess` MODIFY COLUMN IF EXISTS  `custaccess_code` varchar(60)    AFTER `custaccesstype_id`;
ALTER TABLE `mst_custaccess` MODIFY COLUMN IF EXISTS  `custaccess_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `custaccess_code`;
ALTER TABLE `mst_custaccess` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14) NOT NULL   AFTER `custaccess_isdisabled`;


ALTER TABLE `mst_custaccess` ADD CONSTRAINT `custaccess_code` UNIQUE IF NOT EXISTS  (`custaccess_code`);

ALTER TABLE `mst_custaccess` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `mst_custaccess` ADD CONSTRAINT `fk_mst_custaccess_mst_cust` FOREIGN KEY IF NOT EXISTS (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





CREATE TABLE IF NOT EXISTS `mst_custsession` (
	`custsession_id` varchar(32) NOT NULL , 
	`custsession_expired` date  , 
	`cust_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`custsession_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar session login customer';


ALTER TABLE `mst_custsession` ADD COLUMN IF NOT EXISTS  `custsession_expired` date   AFTER `custsession_id`;
ALTER TABLE `mst_custsession` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custsession_expired`;


ALTER TABLE `mst_custsession` MODIFY COLUMN IF EXISTS  `custsession_expired` date    AFTER `custsession_id`;
ALTER TABLE `mst_custsession` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14) NOT NULL   AFTER `custsession_expired`;



ALTER TABLE `mst_custsession` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `mst_custsession` ADD CONSTRAINT `fk_mst_custsession_mst_cust` FOREIGN KEY IF NOT EXISTS (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





CREATE TABLE IF NOT EXISTS `mst_custwalinkreq` (
	`custwalinkreq_id` varchar(32) NOT NULL , 
	`ref` varchar(32)  , 
	`intent` varchar(128) NOT NULL , 
	`room_id` varchar(32) NOT NULL , 
	`message` varchar(1024) NOT NULL , 
	`voubatch_id` varchar(32)  , 
	`vou_id` varchar(32)  , 
	`crmevent_id` varchar(32)  , 
	`code` varchar(32)  , 
	`slpart` varchar(32)  , 
	`data` varchar(2048)  , 
	`result` varchar(2048)  , 
	`status` varchar(3)  , 
	`custwa_id` varchar(14) NOT NULL , 
	`cust_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`custwalinkreq_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Contact Customer';


ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `ref` varchar(32)   AFTER `custwalinkreq_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `intent` varchar(128) NOT NULL  AFTER `ref`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `room_id` varchar(32) NOT NULL  AFTER `intent`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `message` varchar(1024) NOT NULL  AFTER `room_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `voubatch_id` varchar(32)   AFTER `message`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `vou_id` varchar(32)   AFTER `voubatch_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `crmevent_id` varchar(32)   AFTER `vou_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `code` varchar(32)   AFTER `crmevent_id`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `slpart` varchar(32)   AFTER `code`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `data` varchar(2048)   AFTER `slpart`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `result` varchar(2048)   AFTER `data`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `status` varchar(3)   AFTER `result`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `custwa_id` varchar(14) NOT NULL  AFTER `status`;
ALTER TABLE `mst_custwalinkreq` ADD COLUMN IF NOT EXISTS  `cust_id` varchar(14) NOT NULL  AFTER `custwa_id`;


ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `ref` varchar(32)    AFTER `custwalinkreq_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `intent` varchar(128) NOT NULL   AFTER `ref`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `room_id` varchar(32) NOT NULL   AFTER `intent`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `message` varchar(1024) NOT NULL   AFTER `room_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `voubatch_id` varchar(32)    AFTER `message`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `vou_id` varchar(32)    AFTER `voubatch_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `crmevent_id` varchar(32)    AFTER `vou_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `code` varchar(32)    AFTER `crmevent_id`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `slpart` varchar(32)    AFTER `code`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `data` varchar(2048)    AFTER `slpart`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `result` varchar(2048)    AFTER `data`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `status` varchar(3)    AFTER `result`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `custwa_id` varchar(14) NOT NULL   AFTER `status`;
ALTER TABLE `mst_custwalinkreq` MODIFY COLUMN IF EXISTS  `cust_id` varchar(14) NOT NULL   AFTER `custwa_id`;



ALTER TABLE `mst_custwalinkreq` ADD KEY IF NOT EXISTS `cust_id` (`cust_id`);

ALTER TABLE `mst_custwalinkreq` ADD CONSTRAINT `fk_mst_custwalinkreq_mst_cust` FOREIGN KEY IF NOT EXISTS (`cust_id`) REFERENCES `mst_cust` (`cust_id`);





