-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_doctype`;


CREATE TABLE IF NOT EXISTS `mst_doctype` (
	`doctype_id` varchar(10) NOT NULL , 
	`doctype_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `doctype_name` (`doctype_name`),
	PRIMARY KEY (`doctype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Document Type';


ALTER TABLE `mst_doctype` ADD COLUMN IF NOT EXISTS  `doctype_name` varchar(90) NOT NULL  AFTER `doctype_id`;


ALTER TABLE `mst_doctype` MODIFY COLUMN IF EXISTS  `doctype_name` varchar(90) NOT NULL  AFTER `doctype_id`;


ALTER TABLE `mst_doctype` ADD CONSTRAINT `doctype_name` UNIQUE IF NOT EXISTS  (`doctype_name`);




INSERT INTO mst_doctype (`doctype_id`, `doctype_name`, `_createby`, `_createdate`) VALUES ('QUOT', 'QUOTATION', 'root', NOW());
INSERT INTO mst_doctype (`doctype_id`, `doctype_name`, `_createby`, `_createdate`) VALUES ('PO', 'PURCHASE ORDER', 'root', NOW());



