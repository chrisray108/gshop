ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
CREATE SCHEMA
IF
	NOT EXISTS `gshop` DEFAULT CHARACTER 
	SET utf8;
USE gshop;
CREATE TABLE
IF
	NOT EXISTS `shopSPU` (
	`pid` INT ( 11 ) NOT NULL AUTO_INCREMENT,
	`title` text,
	`sub_title` text,
	`spu_desc` text,
	`imageUrls` text,
	`spu_type` INT ( 11 ) NOT NULL,
	PRIMARY KEY ( `pid` ),
	INDEX type_index ( `spu_type` ) 
	);
INSERT INTO shopSPU ( pid, title, sub_title, spu_desc, imageUrls, spu_type )
VALUES
	( '10000', '晨曦渐变天丝四件套', '气质简约渐变，清凉亲肤保湿', '', 'http://yanxuan.nosdn.127.net/453fcb08b3ffd0f0e4fcb7e076ad2160.jpg', 1 )