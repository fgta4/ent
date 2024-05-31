-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_room`;


CREATE TABLE IF NOT EXISTS `mst_room` (
	`room_id` varchar(30) NOT NULL , 
	`room_name` varchar(60) NOT NULL , 
	`room_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`site_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `room_name` (`site_id`, `room_name`),
	PRIMARY KEY (`room_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar City';


ALTER TABLE `mst_room` ADD COLUMN IF NOT EXISTS  `room_name` varchar(60) NOT NULL  AFTER `room_id`;
ALTER TABLE `mst_room` ADD COLUMN IF NOT EXISTS  `room_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `room_name`;
ALTER TABLE `mst_room` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30) NOT NULL  AFTER `room_isdisabled`;


ALTER TABLE `mst_room` MODIFY COLUMN IF EXISTS  `room_name` varchar(60) NOT NULL  AFTER `room_id`;
ALTER TABLE `mst_room` MODIFY COLUMN IF EXISTS  `room_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `room_name`;
ALTER TABLE `mst_room` MODIFY COLUMN IF EXISTS  `site_id` varchar(30) NOT NULL  AFTER `room_isdisabled`;


ALTER TABLE `mst_room` ADD CONSTRAINT `room_name` UNIQUE IF NOT EXISTS  (`site_id`, `room_name`);

ALTER TABLE `mst_room` ADD KEY IF NOT EXISTS `site_id` (`site_id`);

ALTER TABLE `mst_room` ADD CONSTRAINT `fk_mst_room_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);





