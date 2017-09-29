drop database if exists hf170502;
create database hf170502;
use hf170502;

#创建员工表
create table if not exists employee 
(
    employee_id int unsigned not null auto_increment primary key,
    employee_pwd char(32) not null,
    employee_name varchar(10) not null,
    employee_status enum ('使用', '锁定') not null,
    employee_img varchar(100) not null
)ENGINE=INNODB AUTO_INCREMENT=10001;

#员工表插入数据
insert into employee
values
(null, '25d55ad283aa400af464c76d713c07ad', '张伟', '使用', './application/views/images/default_head_img.jpg'),
(null, '25d55ad283aa400af464c76d713c07ad', '老大', '锁定', './application/views/images/default_head_img.jpg'),
(null, '25d55ad283aa400af464c76d713c07ad', '老二', '使用', './application/views/images/default_head_img.jpg'),
(null, '25d55ad283aa400af464c76d713c07ad', '老三', '锁定', './application/views/images/default_head_img.jpg'),
(null, '25d55ad283aa400af464c76d713c07ad', '老四', '使用', './application/views/images/default_head_img.jpg'),
(null, '25d55ad283aa400af464c76d713c07ad', '老五', '锁定', './application/views/images/default_head_img.jpg');

#创建角色表
create table if not exists role 
(
    role_id int unsigned not null auto_increment primary key,
    role_name varchar(10) not null,
    role_describe varchar(100) not null
)ENGINE=INNODB;

#角色表插入数据
insert into role
values
(null, '超级管理员', '这是超级管理员'),
(null, '经理', '这是经理'),
(null, '业务员', '这是业务员'),
(null, '客服', '这是客服');

#创建员工角色表
create table if not exists employee_role
(
    employee_id int unsigned not null,
    role_id int unsigned not null,
    primary key (employee_id, role_id),
    foreign key (employee_id) references employee (employee_id),
    foreign key (role_id) references role (role_id)
)ENGINE=INNODB;

#员工角色表
insert into employee_role
values
(10001, 1),
(10002, 2),
(10003, 3),
(10004, 4),
(10005, 4),
(10006, 3);

#创建菜单表
create table if not exists menu 
(
    menu_id int unsigned not null primary key,
    menu_name varchar(10) not null,
    menu_fid int unsigned not null,
    url varchar(80)
)ENGINE=INNODB;

#菜单表插入数据
insert into menu
values
(1, '系统管理', 0, '#'),
(2, '商品管理', 0, '#'),
(3, '订单管理', 0, '#'),
(4, '用户管理', 1, './index.php?c=Main&a=iframeHtml&n=userManagement'),
(5, '员工管理', 1, './index.php?c=Main&a=iframeHtml&n=employeeManagement'),
(6, '角色管理', 1, './index.php?c=Main&a=iframeHtml&n=roleManagement'),
(7, '商品录入', 2, './index.php?c=Main&a=iframeHtml&n=addGood'),
(8, '商品信息', 2, './index.php?c=Main&a=iframeHtml&n=goodInfo'),
(9, '未支付订单', 3, './index.php?c=Main&a=iframeHtml&n=unpayedOrder'),
(10, '已支付订单', 3, './index.php?c=Main&a=iframeHtml&n=payedOrder');

#角色菜单表
create table if not exists role_menu
(
    role_id int unsigned not null,
    menu_id int unsigned not null,
    primary key (role_id, menu_id),
    foreign key (role_id) references role (role_id),
    foreign key (menu_id) references menu (menu_id)
);

#角色菜单表插入数据
insert into role_menu
values
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(3, 2),
(3, 3),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(4, 2),
(4, 3),
(4, 7),
(4, 8),
(4, 9),
(4, 10);