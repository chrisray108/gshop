create schema
if
	not exists `mu_shop` default character
	set utf8;
use mu_shop;


drop table if exists `mu_media`;
drop table if exists `mu_spu_stat`;
drop table if exists `mu_prise`;
drop table if exists `mu_sku_spec_relation`;
drop table if exists `mu_sku_sepc_relation`;
drop table if exists `mu_sku_stat`;
drop table if exists `mu_managers_authority`;
drop table if exists `mu_managers`;
drop table if exists `mu_sku`;
drop table if exists `mu_spu`;
drop table if exists `mu_spec_option`;
drop table if exists `mu_spu_sub_category`;
drop table if exists `mu_spu_category`;
drop table if exists `mu_spu_brand`;
drop table if exists `mu_spu_detail`;


create table `mu_spu` (
`product_id` varchar(64) not null comment '产品id',
`brand_id` varchar(64) null,
`product_name` varchar(64) not null,
`product_ena` varchar(64) null comment '产品编码',
`product_desc` varchar(512) null,
`product_detail_id` varchar(64) null,
`product_main_pic`  varchar(512) not null,
`product_category_id` varchar(64) null,
`product_subcategory_id` varchar(64) null,
`product_status` varchar(40) not null default '1' comment '产品状态：不可用(0)->上架(1)->下架(2)->定时上架(3)',
`product_sale_type` varchar(40) not null default '3' comment '销售类型：按库存销售(1)、预售(2)、永远可售(3)',
`product_order` int not null auto_increment unique key,
`product_sell_count` varchar(40) not null default '0' comment '销售数量',
`product_creator_id` varchar(64) null,
`product_create_time` datetime null,
`product_updater_id` varchar(64) null,
`product_update_time` datetime null,
primary key (`product_id`),
index product_ena_index ( `product_ena` )
);

create table `mu_sku` (
`keep_id` varchar(64) not null,
`product_id` varchar(64) not null,
`keep_ena` varchar(64) null,
`keep_ena_type` varchar(40) null comment 'ena 生成方式   人工录入(1)  自动生成(2)',
`keep_size_width` decimal(14,2) zerofill null,
`keep_size_depth` decimal(14,2) zerofill null,
`keep_size_height` decimal(14,2) zerofill null,
`keep_weight` decimal(20,4) zerofill null,
`keep_buy_prise` decimal(14,2) zerofill null comment '货品进价',
`keep_market_prise` decimal(14,2) zerofill null comment '货品市场指导价',
`keep_status` varchar(40) null default '1' comment '库存状态  下架(0) 上架(1) ',
`keep_creator_id` varchar(64) null,
`keep_create_time` datetime null,
`keep_updater_id` varchar(64) null,
`keep_update_time` datetime null,
`keep_count` int null comment '库存数量',
`keep_unlimited_count` varchar(1) not null default '0' comment '是否无限库存 否(0), 是(1)',
`keep_spec_desc` varchar(64) not null,
primary key (`keep_id`) 
)

comment = '产品sku';

create table `mu_media` (
`media_id` varchar(64) not null,
`product_id` varchar(64) not null,
`keep_id` varchar(64) null,
`media_main_pic` varchar(1) not null,
`media_url` varchar(512) not null,
`media_ext` varchar(255) null,
primary key (`media_id`) 
);

create table `mu_spu_stat` (
`product_id` varchar(64) not null,
`stat_order_count` int zerofill not null comment '订单数量',
`stat_product_count` int zerofill not null comment '产品数量',
`stat_add_cart_count` int zerofill not null,
`stat_collect_count` int zerofill not null,
`stat_comment_count` int zerofill not null,
`stat_score` decimal(14,2) zerofill not null,
primary key (`product_id`) 
);

create table `mu_spu_brand` (
`brand_id` varchar(64) not null,
`brand_name` varchar(64) not null,
`brand_address` varchar(255) null,
`brand_ext` varchar(4000) null,
primary key (`brand_id`) 
);

create table `mu_spu_detail` (
`detail_id` varchar(64) not null,
`detail_content` longtext not null,
`detail_valid` varchar(1) not null default '1',
`detail_create_time` datetime null,
primary key (`detail_id`) 
);

create table `mu_spu_category` (
`category_id` varchar(64) not null,
`category_name` varchar(64) not null,
`category_order` int zerofill not null,
`category_valid` varchar(1) not null default '1',
`category_create_time` datetime null,
primary key (`category_id`) 
);

create table `mu_spu_sub_category` (
`category_id` varchar(64) not null,
`categroy_name` varchar(64) not null,
`categroy_order` int not null,
`category_valid` varchar(1) not null default '1',
`category_create_time` datetime null,
primary key (`category_id`) 
);


create table `mu_prise` (
`prise_id` int not null auto_increment unique key,
`product_id` varchar(64) not null,
`keep_id` varchar(64) not null,
`prise_value` decimal(14,2) not null,
`prise_origin_value` decimal(14,2) null,
`prise_valid_time` datetime not null comment '生效时间',
primary key (`prise_id`) 
);

create table `mu_sku_stat` (
`relation_id` varchar(64) not null,
`keep_id` varchar(64) not null,
`spec_option_id` varchar(64) not null,
primary key (`relation_id`) 
);


create table `mu_managers` (
`manager_id` varchar(64) not null,
`manager_pwd` varchar(255) not null,
`manager_createtime` datetime not null,
`manager_email` varchar(255) null,
`manager_nick` varchar(64) null,
`manager_avatar` varchar(512) null,
`manager_valid` varchar(1) not null default '1',
primary key (`manager_id`),
index managers_email_index ( `manager_email` )
);


create table `mu_managers_authority` (
`manager_id` varchar(64) not null,
`authority_read` varchar(1) null,
`authority_write` varchar(1) null,
`authority_delete` varchar(512) null,
`authority_from_id` varchar(64) null comment '上级领导',
primary key (`manager_id`) 
);


insert into mu_managers(manager_id, manager_createtime, manager_pwd, manager_nick, manager_avatar, manager_email) values ('fc256850-6bb6-11e8-81b4-29dba3be24a7', '2018-06-05 16:11:29', 'e10adc3949ba59abbe56e057f20f883e', 'admin','http://img2.touxiang.cn/file/20180608/24c3da179e9aee29728403163f18d3f1.jpg','admin@admin.com');
