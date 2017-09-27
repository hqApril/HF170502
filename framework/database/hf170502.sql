drop database if exists hf170502;
create database hf170502;
use hf170502;

#创建员工表
create table if not exists employee 
(
    employee_id int unsigned not null auto_increment primary key,
    employee_pwd char(32) not null,
    employee_name varchar(10) not null,
    employee_img varchar(100) not null
)ENGINE=INNODB AUTO_INCREMENT=10001;

#员工表插入数据
insert into employee
values
(null, '25d55ad283aa400af464c76d713c07ad', '张伟', '123.img');