ALTER USER 'root' @'localhost' IDENTIFIED WITH mysql_native_password BY 'rootroot';
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

INSERT INTO shopSPU ( title, sub_title, spu_desc, imageUrls, spu_type )
VALUES
	( '唤自然·仲夏椰香四件套', '100%全棉，椰林自然设计', '', 'https://yanxuan.nosdn.127.net/be88893e0b86d926f30b2dc2a03073f3.png', 1 )

INSERT INTO shopSPU ( title, sub_title, spu_desc, imageUrls, spu_type )
VALUES
	( '简约知性全棉四件套 胭脂粉', '治愈少女粉，柔软浪漫', '', 'https://yanxuan.nosdn.127.net/213fc036e72ca561269ea6b5cbc34296.jpg', 1 )

INSERT INTO shopSPU ( title, sub_title, spu_desc, imageUrls, spu_type )
VALUES
	( '全棉针织纯色四件套', '100%针织棉，裸睡0束缚', '', 'http://yanxuan.nosdn.127.net/453fcb08b3ffd0f0e4fcb7e076ad2160.jpg', 1 )

INSERT INTO shopSPU ( title, sub_title, spu_desc, imageUrls, spu_type )
VALUES
	( '300根水洗棉缎纹床笠', '缎纹水洗棉，光滑柔软', '', 'https://yanxuan.nosdn.127.net/dd192cb3cc17292ebfed62c5b6a975e7.png', 1 )
