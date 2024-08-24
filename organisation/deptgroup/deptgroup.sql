-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_deptgroup`;


CREATE TABLE IF NOT EXISTS `mst_deptgroup` (
	`deptgroup_id` varchar(10) NOT NULL , 
	`deptgroup_name` varchar(60) NOT NULL , 
	`deptgroup_descr` varchar(90)  , 
	`deptgroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`deptgroup_parent` varchar(10)  , 
	`deptgroup_pathid` varchar(13) NOT NULL , 
	`deptgroup_path` varchar(390) NOT NULL , 
	`deptgroup_level` int(2) NOT NULL DEFAULT 0, 
	`deptgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`depttype_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptgroup_name` (`deptgroup_name`),
	UNIQUE KEY `deptgroup_path` (`deptgroup_path`, `deptgroup_pathid`),
	PRIMARY KEY (`deptgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Departement';


ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_name` varchar(60) NOT NULL  AFTER `deptgroup_id`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_descr` varchar(90)   AFTER `deptgroup_name`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_isparent` tinyint(1) NOT NULL DEFAULT 0 AFTER `deptgroup_descr`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_parent` varchar(10)   AFTER `deptgroup_isparent`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_pathid` varchar(13) NOT NULL  AFTER `deptgroup_parent`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_path` varchar(390) NOT NULL  AFTER `deptgroup_pathid`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_level` int(2) NOT NULL DEFAULT 0 AFTER `deptgroup_path`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `deptgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0 AFTER `deptgroup_level`;
ALTER TABLE `mst_deptgroup` ADD COLUMN IF NOT EXISTS  `depttype_id` varchar(10) NOT NULL  AFTER `deptgroup_isexselect`;


ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_name` varchar(60) NOT NULL   AFTER `deptgroup_id`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_descr` varchar(90)    AFTER `deptgroup_name`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_isparent` tinyint(1) NOT NULL DEFAULT 0  AFTER `deptgroup_descr`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_parent` varchar(10)    AFTER `deptgroup_isparent`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_pathid` varchar(13) NOT NULL   AFTER `deptgroup_parent`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_path` varchar(390) NOT NULL   AFTER `deptgroup_pathid`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_level` int(2) NOT NULL DEFAULT 0  AFTER `deptgroup_path`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `deptgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0  AFTER `deptgroup_level`;
ALTER TABLE `mst_deptgroup` MODIFY COLUMN IF EXISTS  `depttype_id` varchar(10) NOT NULL   AFTER `deptgroup_isexselect`;


ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `deptgroup_name` UNIQUE IF NOT EXISTS  (`deptgroup_name`);
ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `deptgroup_path` UNIQUE IF NOT EXISTS  (`deptgroup_path`, `deptgroup_pathid`);

ALTER TABLE `mst_deptgroup` ADD KEY IF NOT EXISTS `deptgroup_parent` (`deptgroup_parent`);
ALTER TABLE `mst_deptgroup` ADD KEY IF NOT EXISTS `depttype_id` (`depttype_id`);

ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `fk_mst_deptgroup_mst_deptgroup` FOREIGN KEY IF NOT EXISTS  (`deptgroup_parent`) REFERENCES `mst_deptgroup` (`deptgroup_id`);
ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `fk_mst_deptgroup_mst_depttype` FOREIGN KEY IF NOT EXISTS  (`depttype_id`) REFERENCES `mst_depttype` (`depttype_id`);





