drop database if exists hf170502;
create database hf170502;
use hf170502;

#创建员工表
create table if not exists employee 
(
    employee_id varchar(10) not null primary key,
    employee_pwd char(32) not null,
    employee_name varchar(10) not null,
    employee_status enum ('使用', '锁定') not null,
    employee_img varchar(100) not null
)ENGINE=INNODB;

#员工表插入数据
insert into employee
values
(10001, '25d55ad283aa400af464c76d713c07ad', '张伟', '使用', './application/views/images/default_head_img.jpg'),
(10002, '25d55ad283aa400af464c76d713c07ad', '老大', '锁定', './application/views/images/default_head_img.jpg'),
(10003, '25d55ad283aa400af464c76d713c07ad', '老二', '使用', './application/views/images/default_head_img.jpg'),
(10004, '25d55ad283aa400af464c76d713c07ad', '老三', '锁定', './application/views/images/default_head_img.jpg'),
(10005, '25d55ad283aa400af464c76d713c07ad', '老四', '使用', './application/views/images/default_head_img.jpg'),
(10006, '25d55ad283aa400af464c76d713c07ad', '老五', '锁定', './application/views/images/default_head_img.jpg');

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
    employee_id varchar(10) not null,
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
    url varchar(90)
)ENGINE=INNODB;

#菜单表插入数据
insert into menu
values
(1, '系统管理', 0, '#'),
(2, '商品管理', 0, '#'),
(3, '订单管理', 0, '#'),
(4, '报表统计', 0, '#'),
(5, '用户管理', 1, './index.php?c=Main&a=iframeHtml&n=userManagement'),
(6, '员工管理', 1, './index.php?c=Main&a=iframeHtml&n=employeeManagement'),
(7, '角色管理', 1, './index.php?c=Main&a=iframeHtml&n=roleManagement'),
(8, '商品录入', 2, './index.php?c=Main&a=iframeHtml&n=addGood'),
(9, '商品信息', 2, './index.php?c=Main&a=iframeHtml&n=goodInfo'),
(10, '未支付订单', 3, './index.php?c=Main&a=iframeHtml&n=unpayedOrder'),
(11, '已支付订单', 3, './index.php?c=Main&a=iframeHtml&n=payedOrder'),
(12, '用户统计', 4, './index.php?c=Main&a=iframeHtml&n=userStatistics'),
(13, '营销统计', 4, './index.php?c=Main&a=iframeHtml&n=marketingStatistics');

#角色菜单表
create table if not exists role_menu
(
    role_id int unsigned not null,
    menu_id int unsigned not null,
    primary key (role_id, menu_id),
    foreign key (role_id) references role (role_id),
    foreign key (menu_id) references menu (menu_id)
)ENGINE=INNODB;

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
(1, 11),
(1, 12),
(1, 13),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(3, 2),
(3, 3),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(4, 2),
(4, 3),
(4, 8),
(4, 9),
(4, 10),
(4, 11);

#########################################################################################
#创建banner图片表
create table if not exists banner_img
(
    banner_img_id int unsigned primary key,
    banner_img_path varchar(50) not null
)ENGINE=INNODB;

#banner图片表插入数据
insert into banner_img
values
(1, './application/views/images/banner_slider1.jpg'),
(2, './application/views/images/banner_slider2.jpg'),
(3, './application/views/images/banner_slider3.jpg'),
(4, './application/views/images/banner_slider4.jpg'),
(5, './application/views/images/banner_slider5.jpg');


#创建商品分类表
create table if not exists classify
(
    classify_id int unsigned not null primary key,
    classify_name varchar(10) not null
)ENGINE=INNODB;

#商品分类表插入数据
insert into classify
values
(1, '手表配饰'),
(2, '运动户外'),
(3, '食品'),
(4, '女装'),
(5, '家纺'),
(6, '男装'),
(7, '电子'),
(8, '男鞋');

#创建时间段表
create table if not exists time_interval
(
    time_interval_id int unsigned not null primary key,
    time_start int unsigned not null,
    time_end int unsigned not null
)ENGINE=INNODB;

#时间段表插入数据
insert into time_interval
values
(1, 6, 8),
(2, 8, 10),
(3, 10, 12),
(4, 12, 14),
(5, 14, 16),
(6, 16, 18),
(7, 18, 20),
(8, 20, 22),
(9, 22, 24);

#创建商品表
create table if not exists good
(
    good_id int unsigned not null auto_increment primary key,
    good_name varchar(100) not null,
    good_rest int unsigned not null,
    good_limit int unsigned not null,
    good_summary varchar(300) not null,
    discount_price float not null,
    original_price float not null,
    classify_id int unsigned not null,
    time_interval_id int unsigned,
    post_type enum ('秒杀', '普通'),
    good_status enum ('上架', '下架'),
    post_time timestamp not null,
    foreign key (classify_id) references classify(classify_id),
    foreign key (time_interval_id) references time_interval (time_interval_id)
)ENGINE=INNODB;

#商品表插入数据
insert into good
values
(null, '冠琴手表男士全自动机械表男表夜光精钢带防水时尚商务手表', 30, 1, '采用25颗红宝石作为轴承，相比普通金属轴承可大幅度降低磨损，提升润滑，确保机芯运作稳定。手动自动双模上链结构，双向转动单向上弦自动陀，正向旋转补偿储能，反向旋转不损坏机芯，储能达24小时。', 199, 299, 1, 1, '普通', '上架', '2017-9-29 12:00:00'),
(null, 'DanielWellington女表丹尼尔惠灵顿DW手表女生表正品女士石英手表', 300, 1, '经典，是时间的宠儿，历久弥新，惊艳而生，因时光而美。独到的两针设计，简而不凡，配合精致表盘，展现气质女神范。', 999, 1120, 1, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '新款韩版正品情侣时尚简约学生防水钢带手表男女士皮带潮流石英表', 56, 1, '玫瑰金表壳搭配时尚表带，帅气风、时尚风，男神佩戴利器。', 78, 98, 1, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'Garmin佳明 vivoactive HR 光电心率腕表GPS运动游泳跑步骑行手表', 98, 1, '搭载garmin自主研发的elavate光学心率传感器，能够7x24小时不间断的测量并记录你的心率，并且可以查看每天的心率起伏变化以及运动时心率情形，摆脱心率带的束缚，有助于改善健康。', 1088, 1680, 1, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '欧美潮牌网带多功能防水大表盘手表男士军事风学生潮流时尚石英表', 89, 1, '【潮流中性手表 男女都是可以佩戴的】【进口机芯 终身 15天无理由退货 30天包换】【精钢网带 德国进口玻璃 精钢表壳 不会掉漆哦，现在拍下就送 精美表盒 备用电池 神秘小礼物 真皮表带 送人超级体面】', 128, 598, 1, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '个性潮黄圣池同款创意学生简约韩版概念女男手表触觉磁力盲人钢珠', 54, 1, '原创触觉磁力钢珠手表 钢珠停留的位置就是时间的位置！ 赠送一条帆布带（颜色任选，留言备注）！搭配更随性！', 448, 796, 1, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '韩式新娘永生花干花头饰保鲜花森女花朵发饰婚礼盘发饰品结婚配饰', 15, 1, '夏季天气炎热，干花比较脆，可向花盒里干花部分喷点水汽，盖上盖，放置在阴凉的地方，第二天要使用再打开，花枝会变软一些 哦', 24.5, 29.8, 1, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '青雀记手工发簪簪子复古典步摇流苏钗子岫玉珍珠汉服配饰古风头饰', 68, 1, '粉色贝壳花，天然材料，颜色各不相同，有深有浅，天然材质这些问题无法避免，介意者请勿拍。', 34.7, 56.8, 1, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '民族风水晶小号竖夹马尾夹大号香蕉夹孔雀banana发夹水钻发卡饰品', 38, 1, '饰品的合金部，选用新型电镀技术，不是通过化学配方所配置出来的普通金色。超厚电镀的黄色更逼真，工艺采用最新德国镜面抛光技术，更是保证产品的持久亮泽，不易褪色。', 25, 58, 1, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '新娘头饰巴洛克结婚皇冠新款蝴蝶敬酒服晚会酒会礼服配饰结婚饰品', 87, 1, '欧式高贵的风格，高端的材料、精心的制作，配上华美的闪钻，更添奢华；不仅提升你的气质，高贵优雅的品味呈现出来。', 29.9, 39, 1, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '锆石羽毛胸针别针扣男女外套西装韩版简约高档胸花开衫时尚配饰品', 43, 1, '经典百搭，不挑衣服不挑人，飘逸的设计，简单大方，男女都可以佩戴哦，在优雅的气质中点缀着天真，驾驭任何着装场合的高贵从容。', 50, 100, 1, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '复古发簪民族风古代步摇流苏簪子古装盘发神器发钗头饰女个性配饰', 65, 1, '经过20道生产工序，9道检测工序，曲面抛光，几乎没有死角，确保产品品质优良。', 19, 28, 1, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '天天特价新款多功能男士腰包男包帆布大容量斜挎包户外运动包腰包', 7, 1, '7层拉链袋设计、包身拉链袋可装7.9寸iPad、前置袋可装6寸手机、可调腰围4尺2、腰带总长120厘米、洗水纯棉帆布用料、生意收银包、实用多功能帆布腰包！', 32.8, 138, 2, 4, '普通', '上架', '2017-9-29 12:00:00'),
(null, '男女可折叠双肩包超轻皮肤包情侣户外背包防水便携旅行登山包旅游', 52, 1, '本品为皮肤包 ，关于近期个别买家感觉面料薄、影响性价比的误区见详情页描述】 厂家直销！ 限时优惠先享！拍下仅39元！机会稍纵即逝！ 超轻便捷折叠包，抗撕裂尼龙面料可受力15公斤，赠送运费险,零风险购物！', 26.3, 32.9, 2, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '户外速干t恤短袖女速干衣大码运动跑步长袖修身透气夏季男情侣款', 68, 1, '户外徒步，攀岩登山，休闲运动，日常休闲，出差旅行，夏日戏水，多功能，多场合，多用途，采用快干面料，舒适不粘身，凸显完善身材，防臭无异味，户外运动的伴侣。优质纤维面料，亲和肌肤，柔软弹性，薄且清爽，舒适透气，抗静电。', 59, 308, 2, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '冲锋裤男户外速干裤男女夏季薄款弹力透气徒步旅游登山裤运动长裤', 16, 1, '冲锋裤男户外速干裤男女 夏季弹力透气快干裤运动登山长裤薄款 特价活动期间偏远地区（新疆 西藏）不包邮，拍下请联系客服补运费差价16元。谢谢！', 68, 698, 2, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '战斧国际美式大兵多功能时尚腰包 战术包挎包户外包 男包', 72, 1, '炫酷的造型，搭载超轻铝板，炫酷抗撞击；适合放IPAD，手机钱包等小件物品', 24, 90, 2, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '夏季户外速干衣女士短袖速干T恤登山徒步运动吸汗透', 84, 1, '收藏+关注就送百变头巾一条（注：收藏+关注后记得联系客服哦！）', 25, 78, 2, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '双肩包男女轻便大容量防水书包户外休闲登山旅行运动折叠旅游背包', 74, 1, '可折叠，轻便、防水、大容量，结实，好手工，轻松出行，享受生活！适合多场合使用，旅游、健身、运动、户外休闲、上学书包一身轻松！', 45, 67, 2, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'coolcore冷感百变魔术头巾骑行面罩男女户外运动降温脖套防紫外线', 78, 1, '一款能降温的多功能魔术巾，进口冷感面料，无化学成分添加，防晒防紫外线，舒适透气，做工精致，新潮花色，是户外、运动吸睛神器哦！', 54, 89, 2, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '小腰包迷你男帆布运动小包防水户外贴身跑步旅行挎包休闲包胸包女', 74, 1, '新品腰包迷你系列，潮流+漂亮+时尚，采用进口防水牛津面料+精湛工艺制作，高品质的潮流腰包是我们追求时尚潮流生活的一种需求，也是物质和精神生活的个性化追求。', 158, 338, 2, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '法国PELLIOTpolo衫 男女短袖t恤夏季透气运动速干衣户外速干T恤', 15, 1, '吸湿排汗速干 3M速干科技 柔软舒适透气', 99, 328, 2, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '运动手机臂包男女跑步手机包华为6plus户外防水透气反光腕包臂带', 19, 1, 'Wellhose，三代升级臂包，面料采用菱形格子耐磨防水材质，同时更透气舒服，特别设置了耳机孔，让运动和音乐随享，此外夜间反光条的设计，夜间更安全，分M码和L码。', 36, 39, 2, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '莱夫胸包女百搭韩版潮女包腰包斜挎包单肩包户外运动2017新款小包', 63, 1, '包身仅400g，比一瓶矿泉水还轻。面料具有良好的耐磨性和防刮性能。', 97.9, 125, 2, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '王小二 红心猕猴桃', 531, 1, '新鲜直达 酸甜如初恋', 49, 79, 3, 7, '普通', '上架', '2017-9-29 12:00:00'),
(null, '抢【三只松鼠_猪肉猪肉脯210g】', 3437, 1, '人间有味食清欢 至味爆款0.01元起', 16, 40, 3, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '卤味礼包500g', 1021, 1, '①明细：鸭脖约4包、鸭翅约4包、鸭掌约3包、鸭锁骨约4包、海带约3包、藕片约3包、花生约3包，约21~26小包，产品数量根据产品大小来定的，以克重为准，合计约500g； ②独立颗粒装，卫生便携两不误； ③礼盒包装，送人有面子。', 35, 59, 3, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '正宗德州产扒鸡', 3121, 1, '德州脱骨扒鸡,好吃又放心', 21, 33, 3, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '桂花酸梅汤', 6211, 1, '夏日消暑必备，老北京口味 正宗地道', 47, 55, 3, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '香港特产美心幻彩粒粒冰', 23, 1, '送礼必备，好看又好吃', 238, 348, 3, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '好想你大红枣', 423, 1, '锁水保鲜 个大饱满,好吃补血', 40, 112, 3, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '乐虎维生素功能饮料整箱装', 652, 1, '喝乐虎提神抗疲劳，激发正能量', 69, 86, 3, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '海福盛私房牛肉面', 4763, 1, '菜面皆FD冻干 非油炸 健康营养 新品,夜宵好伙伴', 34, 65, 3, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '狮峰西湖龙井品味礼盒', 4, 1, '天下名茶数龙井，龙井上品在狮峰', 3800, 4588, 3, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '水井坊典藏大师版双瓶装', 12, 1, '精选酿造，提高你的生活品质', 1878, 2199, 3, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '意大利进口Baci芭喜榛仁夹心巧克力', 134, 1, '我从未了解命运的奥秘，心情好的日子，我会在口袋里放几颗Baci巧克力，跟朋友见面的时候，让他们随意抽一颗，看看今天自己有什么好事降临。所有的占卜，也徐不过是梦境，幻觉和自欺。然而，这些不正是人生所需要的东西吗？', 168, 388, 3, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '复古棉麻连衣裙', 647, 1, 'A字型的袍子。小圆领，做了开口，加了立体手工盘扣。 复古文艺更加分哦。 用的是棉麻印花面料，定位花型，下摆做了很宽的贴边，小开叉，垂感更好更美观。 做旧洗水了，不会轻易缩水和变形，手感会更柔软舒服', 88, 246, 4, 1, '普通', '上架', '2017-9-29 12:00:00'),
(null, '显瘦大摆百褶裙', 261, 1, '精选高品质莫代尔面料，3D立体剪裁，修身不紧绷，显身材上档次，黑色百搭彰显你的高贵气质，厂家直接销售，为您省钱，喜欢的请赶快下单，随时涨价哦', 59, 256, 4, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '显瘦针织羊毛连衣裙', 198, 1, '本款春秋冬皆宜，春秋外穿冬天可打底！', 68, 600, 4, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'v领宽松针织打底衫', 347, 1, '秋冬皆穿 面料太好 人见人爱 花见花开', 28, 158, 4, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '潮相机印花圆领宽松短袖', 746, 1, '相机印花圆领宽松大码T相机印花圆领宽松大码T恤时尚潮恤，你值得拥有', 12, 26, 4, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '新款女装长袖衬衣', 542, 1, '秋装新款女装长袖衬衣宽松衬衣白色雪纺衫上衣，塑造完美自我', 59, 199, 4, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '新款格子衬衫女长袖', 79, 1, '品质的做工工艺、面料水洗处理过柔软舒适、内搭外穿均可搭配、一份价格一分货、品质亲不会后悔', 68, 231, 4, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '印花格子衬衫', 130, 1, '新款印花格子衬衫女长袖学生装上衣韩范修身衬衣,穿出不一样的文艺范', 56, 128, 4, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '时尚韩版立领系带衫', 240, 1, '星弥2017秋季新款女装时尚韩版立领系带抽褶花边不对称轻熟雪纺衫,彰显你的高贵气质', 148, 300, 4, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '海宁水貂皮草整貂皮大衣', 6, 1, '2016新进口母貂海宁水貂皮草整貂皮大衣女中长款韩版带帽显瘦外套,彰显你的高贵气质', 6800, 18000, 4, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '宽松亚麻短袖t恤', 56, 1, '棉麻套装，透气性好...当季新品,棉麻二件，吸汗性好，工作，旅游是很不错的选择', 88, 210, 4, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '水星家纺 双人枕头一对爱情锁情侣对枕 高弹耐压绣花枕芯', 5175, 1, '情侣绣花工艺 高弹耐压 舒适轻便', 79, 299, 5, 3, '普通', '上架', '2017-9-29 12:00:00'),
(null, '富安娜家纺床上四件套全棉纯棉1.8m床 双人床单被罩床上用品被套', 1241, 1, '原创花型 纯棉斜纹 热销花魁', 399, 1880, 5, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '杰元家纺 水洗棉四件套荷叶花边公主被套1.5m1.8 2.0米双人床单', 3431, 1, '全棉磨毛面料 活性印染', 349, 539, 5, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '炫耀水星家纺四件套全棉斜纹纯棉被套1.8m2.0米双人床上用品4件套', 439, 1, '前500名送枕芯一对或精美童毯一条', 299, 899, 5, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '水星家纺全棉印花空调被芯夏沫之晨夏被子透气被可水洗夏凉被', 6151, 1, '全棉柔软细腻 甜美清新印花 可水洗机洗', 189, 719, 5, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '炫耀水星家纺可机洗全棉夏被单人纯棉学生夏凉被空调被双人薄被子', 1124, 1, '百分百纯棉夏凉被 全棉空调被 亲肤贴身 超值特促 只有夏被 不带枕套哦！', 105, 525, 5, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '简约床上四件套 全棉纯棉床单被套被子男学生宿舍1.8m三件套单人', 8712, 1, '学生宿舍拍1.2m 全棉不起球不缩水', 188, 899, 5, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '【天猫超市】长相知家纺　太空记忆枕头单人枕芯慢回弹枕芯', 42, 1, '顺滑外套 拆洗方便 较好弹性', 49, 59, 5, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '荞麦枕头成人荞麦壳枕芯纯荞麦皮枕头正品保健枕全荞麦枕颈椎枕头', 495, 1, '柔软亲肤 舒适透气 送全棉枕套', 79, 249, 5, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '【天猫超市】天魅家纺酒店枕头枕芯羽丝绒枕芯可水洗贵妃枕单只装', 681, 1, '舒适面料 透气柔软', 19.8, 39, 5, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '海宁真皮皮衣男机车夹克薄款西装领中年修身绵羊皮风衣中长款外套', 29, 1, '保证真皮 假一罚十 支持质检', 499, 3080, 6, 4, '普通', '上架', '2017-9-29 12:00:00'),
(null, '花花公子休闲裤男夏季新款2017商务直筒裤男薄款弹力修身裤男西裤', 999, 1, '赠送运费险保障售后无忧', 99, 498, 6, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '5件装】帅咖夏装2017新款短袖男士青年修身圆领T恤半袖衣服男体恤', 314, 1, '买一送四 5件69元', 69, 298, 6, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'AY短裤男夏天2017韩版潮流运动宽松夏季沙滩裤五分裤 休闲裤子', 188, 1, '纯棉 运动 短裤', 39, 129, 6, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '诺雷敦男士风衣外套春秋季薄款男装风衣立领商务休闲风衣男中长款', 278, 1, '厚薄可选 三季可穿 加料不加价', 258, 1198, 6, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '冬季男士中长款羽绒服男装加厚修身中青年学生韩版外套反季清仓潮', 951, 1, '库存不多，随时涨价！每人限购一件，看上的抓紧付款', 97, 899, 6, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '秋季新品男裤男士休闲裤修身韩版卡其裤商务休闲西裤直筒长裤子潮', 357, 1, '亲肤纯棉 限时抢购 2件69元', 69, 398, 6, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '莫代尔丝光棉男短袖T恤纯色圆领打底衫夏装男士半袖体恤上衣服潮', 54, 1, '下单赠运费险 收藏先发货', 59, 499, 6, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '男裤子夏季亚麻哈伦裤2017新款潮韩版9分棉麻修身男士休闲九分裤', 2302, 1, '2件75元 棉麻 收藏先发货加购送礼品', 58, 75, 6, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '牛津纺衬衫男士长袖扣领白纯色修身韩版商务休闲男装青年衬衣', 428, 1, '男士衬衫 不褪色不缩水 已热销7万件', 59, 298, 6, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '夏季薄款NIAN JEEP牛仔短裤 男士高腰直筒宽松中裤休闲大码七分裤', 232, 1, '淘抢购活动件68，买2件送皮带', 68, 588, 6, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '夏装男士运动潮沙滩裤男大码短裤彩棉宽松系带五分裤子胖子休闲裤', 7521, 1, '一款设计特别用心的运动短裤。面料透气但是不轻薄！彩棉染色突显个性和张扬！基本款式设计百搭不挑！纯棉材质，做工精湛！一款可以让你穿个三五年的短裤，也就卖这个价钱！欢迎大家货比三家。', 58, 109, 6, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'HE潮牌立领夹克秋冬男士休闲棒球外套日系潮流夹克上衣男', 5059, 1, '海量新品 潮流穿搭 玩趣互动', 128, 128, 6, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '短袖男装NIAN JEEP吉普盾半截袖宽松大码背心户外纯棉圆领t恤衫', 3171, 1, '印花的设计看上去没有那么沉重，时尚好看。', 48, 158, 6, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '国内单 2016秋冬新款男装 男士百搭圆领印花套头针织衫毛衣外套', 15, 1, '舒适又简洁的圆领，套头穿着十分方便，', 22.9, 99, 6, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'Q版新款夏装李宇春同款T恤 野蛮生长 短袖男女装周边衣服 打底衫', 29, 1, '衣服不起球、不掉色、无胶感更透气', 17, 69, 6, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '出口外单夏季羊奶丝男士T恤自降温圆领冰丝短袖一片式无痕打底衫', 3393, 1, '日本研发羊奶丝自带降温功能，迅速扩散体热，降低体温，触感冰凉，丝滑畅爽、无穿着的释放感受。', 58, 89, 6, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '日系复古原宿潮牌 青春流行男女款恶搞卡通跳舞开衫T恤棒球服短袖', 229, 1, '厂家直销，亏本跑量，请勿议价。送老公，送朋友！限时限量特卖，手慢就没了，亏本冲量，不定时涨价！ ', 68, 98, 6, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '男士牛仔裤夏季小腿哈伦裤松紧裤子束脚裤男缩口秋夏小脚九分裤潮', 5123, 1, '当季潮流，款式任选', 29.9, 220, 6, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '潮牌简约余文乐上衣字母刺绣休闲宽松圆领大码纯棉短袖T恤学生男', 134, 1, 'MIXPLAY系列简约而不简单，处处时尚大气，无论纯色还是花纹，都轻松打造一种自由随心的穿着体验！', 39, 58, 6, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '夏季男士短袖纯棉T恤中国风文字意中人中性款情侣装简约女打底衫', 1491, 1, '一万年黑 一万年白 意中人黑 意中人白 始于初见黑 始于初见白 至于终老黑 至于终老白 星星星黑 星星星白 五号黑 五号白 胡子黑 胡子白 JH黑 JH白 一生所爱白 一生所爱黑 圆领白 圆领黑', 29, 99, 6, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'I5 6500升7500 GTX1050组装机四核电脑主机独显游戏兼容台式机', 60, 1, '固态+机器，速度与容量的结合，建议游戏玩家加装1T硬盘，提升10倍容量可以装170个英雄联盟，大约2100个高清电影，让您保证速度的同时，不再担心硬盘的困扰', 3288, 3299, 7, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'AMD八核FX8300 1050Ti独显diy台式机组装机电脑主机游戏全套整机', 40, 1, '不懂电脑不要紧，看分数说明性能，决战实力派，八核高端游戏主机，华硕，供电更稳定，接口更多，扩展性大，更有利于散热', 2238, 2588, 7, 8, '普通', '上架', '2017-9-29 12:00:00'),
(null, '小米5X变焦双摄4G智能手机新品', 97, 1, '小米5X，变焦双摄，拍人更美，大屏轻薄全金属，骁龙八核处理器，4GB大内存，你还在等什么', 1599, 1599, 7, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'Apple/苹果 iPad air3 平板', 1, 1, '9.7英寸Retina显示屏，2048x1536分辨率，细节表现力，尺寸，让你无论欣赏照片，购物都更加生动逼真的光感', 2278, 2288, 7, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '小天才儿童平板电脑K1早教机', 72, 1, '哪里不会点哪里，妈妈再也不用担心我的学习了，距离眼，对进距离说NO，反转识别，对躺着看说NO，食品级原材料，可以“吃”的平板电脑！', 1198, 2298, 7, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '现货分期购Meitu/美图 美图M8', 84, 1, '繁华忙碌的都市生活，不停奔波在梦想和现实中，希望我们小小的努力能给您带去欣慰，您能满意，是对我们最大的支持和鼓励，相信我们会做的更好哦,感谢您的支持，祝您生活愉快~ ', 2999, 2999, 7, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '四核台式电脑 I5主机 GTX1050独显DIY组装机LOL游戏办公整机 全套', 74, 1, 'CPU主频: 2.4GHz(含)-2.8GHz(不含)CPU型号: 750CPU核心数: 四核心CPU类型: Intel/英特尔酷睿i5主板品牌: Asus/华硕主板结构: M-ATX内存品牌: tigo/金泰克内存类型: DDR3内存频率: 1600MHz！', 2388, 2488, 7, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '新品◆vivo X9s Plus手机', 90, 1, '新品首发2000万柔光双摄，照亮你的美，双期免息享豪礼，火爆抢购中', 2998, 2999, 7, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'TP-LINK双频无线路由器', 64, 1, '非常好，网速飕飕的，比原来四个头的快多了。现在用机顶盒看电视不卡，转台流畅性很好。手机打开网页，玩游戏，很流畅，超赞，', 218, 229, 7, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '惠普轻薄便携笔记本电脑固态', 15, 1, '下单送六件套豪礼，时尚电脑包，游戏鼠标垫，14寸内胆包，游戏鼠标，笔记本键盘膜，液晶屏清洁套装，有颜值，拼实力！', 2199, 2990, 7, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, 'OPPO R11前后2000万拍照手机', 19, 1, 'OPPO R11热力红，12期免息，当天发货，前后2000万，让拍照更清晰，广大客户一致好评！', 3999, 4000, 7, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '乔丹篮球鞋男夏季新款高帮男鞋', 632, 1, '有减震 防滑 耐磨 防水 透气 吸汗等功能，运动系列: 篮球专业比赛鞋，适合场地: 室外水泥地 室内地板，', 199, 399, 8, 9, '普通', '上架', '2017-9-29 12:00:00'),
(null, '苹果男鞋2017新款', 334, 1, '鞋头款式: 圆头闭合方式: 系带鞋底材质: 复合底鞋面材质: 多种材质拼接真皮材质工艺: 擦色皮鞋面内里材质: 网纱鞋制作工艺: 胶粘鞋跟底款式: 平跟图案: 拼色流行元素: 编制风格: 运动场合: 运动休闲季节: 春秋颜色分类: 彩色 黑色 蓝色 浅灰色 款式: 运动休闲鞋功能: 透气', 89, 120, 8, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '[领券再减]特步男鞋网面跑鞋', 110, 1, '款号: 91625512品牌: ANTA/安踏上市时间: 2016年夏季吊牌价: 269性别: 男子帮面材质: 人造革+织物外底材料: 橡胶+EVA适合路面: 小道 公路 跑道运动鞋科技: 易弯折功能 强化避震缓冲功能: 减震 防滑 耐磨 透气 吸汗 包裹性 支撑 平衡 抗冲击闭合方式: 系带流行元素: 车缝线运动系列: 运动生活系列', 139, 239, 8, 1, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '特步男鞋夏季新品飞线跑步鞋', 433, 1, '产品名称：XTEP/特步 983219119283是否商场同款: 是颜色分类: 黑/红 灰 桔/黄款号: 983219119283品牌: XTEP/特步上市时间: 2017年春季吊牌价: 319性别: 男子帮面材质: 织物外底材料: 橡胶+EVA适合路面: 小道 公路 跑道运动鞋科技: 缓震胶 飞线技术 强化避震缓冲 透气技术功能: 减震 防滑 耐磨 透气 包裹性 支撑 轻便鞋码: 39 40 41 42 43 44 45闭合方式: 系带运动系列: 生活系列', 168, 319, 8, 2, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '品质国货 央视报道 情侣运动鞋', 89, 1, '【产品名称: onemix 1118颜色分类: 粉红/月 紫桃红-女 玫瑰红款号: 1118品牌: onemix上市时间: 2015年秋季吊牌价: 793性别: 男女通用帮面材质: 网布外底材料: EVA支撑 平衡 抗冲击 轻便 增高鞋码: 35 36 37 38 39 40 41 42 43 44 45 46闭合方式: 系带流行元素: 镂空运动系列: 运动生活系列是否瑕疵: 否', 219, 660, 8, 3, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '[热销款]乔丹男鞋气垫跑步鞋', 54, 1, '产品名称：乔丹 xm2570336是否商场同款: 是颜色分类: 黑　帮面材质: 网布外底材料: 防滑橡胶适合路面: 小道 公路 跑道运动鞋科技: 气垫 缓震胶 扭转系统 飞线技术 易弯折功能 强化避震缓冲 透气技术功能: 减震 防滑 耐磨 透气 吸汗 包裹性 速干 支撑 平衡 抗冲击 闭合方式: 系带流行元素: 车缝线运动系列: 轻跑鞋', 178, 330, 8, 4, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '魔术贴小白鞋女2017夏新款', 125, 1, '销售渠道类型: 纯电商(只在线上销售)鞋垫材质: 二层猪皮品牌: 英妮丝货号: Yns280上市年份季节: 2017年夏季风格: 韩版帮面材质: 牛二层皮覆膜内里材质: 无内里皮质特征: 覆膜鞋底材质: TPR(牛筋）开口深度: 浅口鞋头款式: 圆头', 54, 108, 8, 5, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '回力童鞋儿童帆布鞋低帮潮板鞋', 268, 1, '小孩穿的是真的舒服，又好看又耐穿，真的棒。', 39, 500, 8, 6, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '2017秋款百搭板鞋', 300, 1, '优质的头层牛皮网格鞋面，透气性强，休闲健康，舒服自然的上脚感，让双脚尽情被呵护的关怀感觉', 188, 459, 8, 7, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '特步2017夏季新款男休闲运动鞋', 66, 1, '打造时尚运动品牌，成就受人尊重的品牌运营商', 135, 259, 8, 8, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '[意大利品牌]单鞋与镂空可选', 188, 1, '经典百搭，品质追求，尊贵雅致格调，诠释轻然奢享，演绎时尚经典，舒适透气内里，让脚也能自由的呼吸', 180, 269, 8, 9, '秒杀', '上架', '2017-9-29 12:00:00'),
(null, '休闲韩版时尚透气气垫运动跑鞋', 65, 1, '优质人造革+透气网布，标准休闲码，4CM内增高，全新升级，轻盈舒适脚感', 59, 528, 8, 1, '秒杀', '上架', '2017-9-29 12:00:00');

#创建商品图片表
create table if not exists img 
(
    img_id int unsigned not null auto_increment primary key,
    good_id int unsigned not null,
    img_path varchar(100) not null,
    img_type enum ('common', 'detail'),
    foreign key (good_id) references good (good_id)
)ENGINE=INNODB;

#插入图片表数据
insert into img
values
(null, 001,	'../Upload/goods/img-001.png', 'common'),
(null, 002,	'../Upload/goods/img-002.png', 'common'),
(null, 003,	'../Upload/goods/img-003.png', 'common'),
(null, 004,	'../Upload/goods/img-004.png', 'common'),
(null, 005,	'../Upload/goods/img-005.png', 'common'),
(null, 006,	'../Upload/goods/img-006.png', 'common'),
(null, 007,	'../Upload/goods/img-007.png', 'common'),
(null, 008,	'../Upload/goods/img-008.png', 'common'),
(null, 009,	'../Upload/goods/img-009.png', 'common'),
(null, 010,	'../Upload/goods/img-010.png', 'common'),
(null, 011,	'../Upload/goods/img-011.png', 'common'),
(null, 012,	'../Upload/goods/img-012.png', 'common'),
(null, 013,	'../Upload/goods/img-013.png', 'common'),
(null, 014,	'../Upload/goods/img-014.png', 'common'),
(null, 015,	'../Upload/goods/img-015.png', 'common'),
(null, 016,	'../Upload/goods/img-016.png', 'common'),
(null, 017,	'../Upload/goods/img-017.png', 'common'),
(null, 018,	'../Upload/goods/img-018.png', 'common'),
(null, 019,	'../Upload/goods/img-019.png', 'common'),
(null, 020,	'../Upload/goods/img-020.png', 'common'),
(null, 021,	'../Upload/goods/img-021.png', 'common'),
(null, 022,	'../Upload/goods/img-022.png', 'common'),
(null, 023,	'../Upload/goods/img-023.png', 'common'),
(null, 024,	'../Upload/goods/img-024.png', 'common'),
(null, 025,	'../Upload/goods/img-025.png', 'common'),
(null, 026,	'../Upload/goods/img-026.png', 'common'),
(null, 027,	'../Upload/goods/img-027.png', 'common'),
(null, 028,	'../Upload/goods/img-028.png', 'common'),
(null, 029,	'../Upload/goods/img-029.png', 'common'),
(null, 030,	'../Upload/goods/img-030.png', 'common'),
(null, 031,	'../Upload/goods/img-031.png', 'common'),
(null, 032,	'../Upload/goods/img-032.png', 'common'),
(null, 033,	'../Upload/goods/img-033.png', 'common'),
(null, 034,	'../Upload/goods/img-034.png', 'common'),
(null, 035,	'../Upload/goods/img-035.png', 'common'),
(null, 036,	'../Upload/goods/img-036.png', 'common'),
(null, 037,	'../Upload/goods/img-037.png', 'common'),
(null, 038,	'../Upload/goods/img-038.png', 'common'),
(null, 039,	'../Upload/goods/img-039.png', 'common'),
(null, 040,	'../Upload/goods/img-040.png', 'common'),
(null, 041,	'../Upload/goods/img-041.png', 'common'),
(null, 042,	'../Upload/goods/img-042.png', 'common'),
(null, 043,	'../Upload/goods/img-043.png', 'common'),
(null, 044,	'../Upload/goods/img-044.png', 'common'),
(null, 045,	'../Upload/goods/img-045.png', 'common'),
(null, 046,	'../Upload/goods/img-046.png', 'common'),
(null, 047,	'../Upload/goods/img-047.png', 'common'),
(null, 048,	'../Upload/goods/img-048.png', 'common'),
(null, 049,	'../Upload/goods/img-049.png', 'common'),
(null, 050,	'../Upload/goods/img-050.png', 'common'),
(null, 051,	'../Upload/goods/img-051.png', 'common'),
(null, 052,	'../Upload/goods/img-052.png', 'common'),
(null, 053,	'../Upload/goods/img-053.png', 'common'),
(null, 054,	'../Upload/goods/img-054.png', 'common'),
(null, 055,	'../Upload/goods/img-055.png', 'common'),
(null, 056,	'../Upload/goods/img-056.png', 'common'),
(null, 057,	'../Upload/goods/img-057.png', 'common'),
(null, 058,	'../Upload/goods/img-058.png', 'common'),
(null, 059,	'../Upload/goods/img-059.png', 'common'),
(null, 060,	'../Upload/goods/img-060.png', 'common'),
(null, 061,	'../Upload/goods/img-061.png', 'common'),
(null, 062,	'../Upload/goods/img-062.png', 'common'),
(null, 063,	'../Upload/goods/img-063.png', 'common'),
(null, 064,	'../Upload/goods/img-064.png', 'common'),
(null, 065,	'../Upload/goods/img-065.png', 'common'),
(null, 066,	'../Upload/goods/img-066.png', 'common'),
(null, 067,	'../Upload/goods/img-067.png', 'common'),
(null, 068,	'../Upload/goods/img-068.png', 'common'),
(null, 069,	'../Upload/goods/img-069.png', 'common'),
(null, 070,	'../Upload/goods/img-070.png', 'common'),
(null, 071,	'../Upload/goods/img-071.png', 'common'),
(null, 072,	'../Upload/goods/img-072.png', 'common'),
(null, 073,	'../Upload/goods/img-073.png', 'common'),
(null, 074,	'../Upload/goods/img-074.png', 'common'),
(null, 075,	'../Upload/goods/img-075.png', 'common'),
(null, 076,	'../Upload/goods/img-076.png', 'common'),
(null, 077,	'../Upload/goods/img-077.png', 'common'),
(null, 078,	'../Upload/goods/img-078.png', 'common'),
(null, 079,	'../Upload/goods/img-079.png', 'common'),
(null, 080,	'../Upload/goods/img-080.png', 'common'),
(null, 081,	'../Upload/goods/img-081.png', 'common'),
(null, 082,	'../Upload/goods/img-082.png', 'common'),
(null, 083,	'../Upload/goods/img-083.png', 'common'),
(null, 084,	'../Upload/goods/img-084.png', 'common'),
(null, 085,	'../Upload/goods/img-085.png', 'common'),
(null, 086,	'../Upload/goods/img-086.png', 'common'),
(null, 087,	'../Upload/goods/img-087.png', 'common'),
(null, 088,	'../Upload/goods/img-088.png', 'common'),
(null, 089,	'../Upload/goods/img-089.png', 'common'),
(null, 090,	'../Upload/goods/img-090.png', 'common'),
(null, 091,	'../Upload/goods/img-091.png', 'common'),
(null, 092,	'../Upload/goods/img-092.png', 'common'),
(null, 093,	'../Upload/goods/img-093.png', 'common'),
(null, 094,	'../Upload/goods/img-094.png', 'common'),
(null, 095,	'../Upload/goods/img-095.png', 'common'),
(null, 096,	'../Upload/goods/img-096.png', 'common'),
(null, 097,	'../Upload/goods/img-097.png', 'common'),
(null, 098,	'../Upload/goods/img-098.png', 'common'),
(null, 099,	'../Upload/goods/img-099.png', 'common'),
(null, 100,	'../Upload/goods/img-100.png', 'common'),	
(null, 101,	'../Upload/goods/img-101.png', 'common'),
(null, 001,	'../Upload/goods/detail-001.png', 'detail'),
(null, 002,	'../Upload/goods/detail-002.png', 'detail'),
(null, 003,	'../Upload/goods/detail-003.png', 'detail'),
(null, 004,	'../Upload/goods/detail-004.png', 'detail'),
(null, 005,	'../Upload/goods/detail-005.png', 'detail'),
(null, 006,	'../Upload/goods/detail-006.png', 'detail'),
(null, 007,	'../Upload/goods/detail-007.png', 'detail'),
(null, 008,	'../Upload/goods/detail-008.png', 'detail'),
(null, 009,	'../Upload/goods/detail-009.png', 'detail'),
(null, 010,	'../Upload/goods/detail-010.png', 'detail'),
(null, 011,	'../Upload/goods/detail-011.png', 'detail'),
(null, 012,	'../Upload/goods/detail-012.png', 'detail'),
(null, 013,	'../Upload/goods/detail-013.png', 'detail'),
(null, 014,	'../Upload/goods/detail-014.png', 'detail'),
(null, 015,	'../Upload/goods/detail-015.png', 'detail'),
(null, 016,	'../Upload/goods/detail-016.png', 'detail'),
(null, 017,	'../Upload/goods/detail-017.png', 'detail'),
(null, 018,	'../Upload/goods/detail-018.png', 'detail'),
(null, 019,	'../Upload/goods/detail-019.png', 'detail'),
(null, 020,	'../Upload/goods/detail-020.png', 'detail'),
(null, 021,	'../Upload/goods/detail-021.png', 'detail'),
(null, 022,	'../Upload/goods/detail-022.png', 'detail'),
(null, 023,	'../Upload/goods/detail-023.png', 'detail'),
(null, 024,	'../Upload/goods/detail-024.png', 'detail'),
(null, 025,	'../Upload/goods/detail-025.png', 'detail'),
(null, 026,	'../Upload/goods/detail-026.png', 'detail'),
(null, 027,	'../Upload/goods/detail-027.png', 'detail'),
(null, 028,	'../Upload/goods/detail-028.png', 'detail'),
(null, 029,	'../Upload/goods/detail-029.png', 'detail'),
(null, 030,	'../Upload/goods/detail-030.png', 'detail'),
(null, 031,	'../Upload/goods/detail-031.png', 'detail'),
(null, 032,	'../Upload/goods/detail-032.png', 'detail'),
(null, 033,	'../Upload/goods/detail-033.png', 'detail'),
(null, 034,	'../Upload/goods/detail-034.png', 'detail'),
(null, 035,	'../Upload/goods/detail-035.png', 'detail'),
(null, 036,	'../Upload/goods/detail-036.png', 'detail'),
(null, 037,	'../Upload/goods/detail-037.png', 'detail'),
(null, 038,	'../Upload/goods/detail-038.png', 'detail'),
(null, 039,	'../Upload/goods/detail-039.png', 'detail'),
(null, 040,	'../Upload/goods/detail-040.png', 'detail'),
(null, 041,	'../Upload/goods/detail-041.png', 'detail'),
(null, 042,	'../Upload/goods/detail-042.png', 'detail'),
(null, 043,	'../Upload/goods/detail-043.png', 'detail'),
(null, 044,	'../Upload/goods/detail-044.png', 'detail'),
(null, 045,	'../Upload/goods/detail-045.png', 'detail'),
(null, 046,	'../Upload/goods/detail-046.png', 'detail'),
(null, 047,	'../Upload/goods/detail-047.png', 'detail'),
(null, 048,	'../Upload/goods/detail-048.png', 'detail'),
(null, 049,	'../Upload/goods/detail-049.png', 'detail'),
(null, 050,	'../Upload/goods/detail-050.png', 'detail'),
(null, 051,	'../Upload/goods/detail-051.png', 'detail'),
(null, 052,	'../Upload/goods/detail-052.png', 'detail'),
(null, 053,	'../Upload/goods/detail-053.png', 'detail'),
(null, 054,	'../Upload/goods/detail-054.png', 'detail'),
(null, 055,	'../Upload/goods/detail-055.png', 'detail'),
(null, 056,	'../Upload/goods/detail-056.png', 'detail'),
(null, 057,	'../Upload/goods/detail-057.png', 'detail'),
(null, 058,	'../Upload/goods/detail-058.png', 'detail'),
(null, 059,	'../Upload/goods/detail-059.png', 'detail'),
(null, 060,	'../Upload/goods/detail-060.png', 'detail'),
(null, 061,	'../Upload/goods/detail-061.png', 'detail'),
(null, 062,	'../Upload/goods/detail-062.png', 'detail'),
(null, 063,	'../Upload/goods/detail-063.png', 'detail'),
(null, 064,	'../Upload/goods/detail-064.png', 'detail'),
(null, 065,	'../Upload/goods/detail-065.png', 'detail'),
(null, 066,	'../Upload/goods/detail-066.png', 'detail'),
(null, 067,	'../Upload/goods/detail-067.png', 'detail'),
(null, 068,	'../Upload/goods/detail-068.png', 'detail'),
(null, 069,	'../Upload/goods/detail-069.png', 'detail'),
(null, 070,	'../Upload/goods/detail-070.png', 'detail'),
(null, 071,	'../Upload/goods/detail-071.png', 'detail'),
(null, 072,	'../Upload/goods/detail-072.png', 'detail'),
(null, 073,	'../Upload/goods/detail-073.png', 'detail'),
(null, 074,	'../Upload/goods/detail-074.png', 'detail'),
(null, 075,	'../Upload/goods/detail-075.png', 'detail'),
(null, 076,	'../Upload/goods/detail-076.png', 'detail'),
(null, 077,	'../Upload/goods/detail-077.png', 'detail'),
(null, 078,	'../Upload/goods/detail-078.png', 'detail'),
(null, 079,	'../Upload/goods/detail-079.png', 'detail'),
(null, 080,	'../Upload/goods/detail-080.png', 'detail'),
(null, 081,	'../Upload/goods/detail-081.png', 'detail'),
(null, 082,	'../Upload/goods/detail-082.png', 'detail'),
(null, 083,	'../Upload/goods/detail-083.png', 'detail'),
(null, 084,	'../Upload/goods/detail-084.png', 'detail'),
(null, 085,	'../Upload/goods/detail-085.png', 'detail'),
(null, 086,	'../Upload/goods/detail-086.png', 'detail'),
(null, 087,	'../Upload/goods/detail-087.png', 'detail'),
(null, 088,	'../Upload/goods/detail-088.png', 'detail'),
(null, 089,	'../Upload/goods/detail-089.png', 'detail'),
(null, 090,	'../Upload/goods/detail-090.png', 'detail'),
(null, 091,	'../Upload/goods/detail-091.png', 'detail'),
(null, 092,	'../Upload/goods/detail-092.png', 'detail'),
(null, 093,	'../Upload/goods/detail-093.png', 'detail'),
(null, 094,	'../Upload/goods/detail-094.png', 'detail'),
(null, 095,	'../Upload/goods/detail-095.png', 'detail'),
(null, 096,	'../Upload/goods/detail-096.png', 'detail'),
(null, 097,	'../Upload/goods/detail-097.png', 'detail'),
(null, 098,	'../Upload/goods/detail-098.png', 'detail'),
(null, 099,	'../Upload/goods/detail-099.png', 'detail'),
(null, 100,	'../Upload/goods/detail-100.png', 'detail'),
(null, 101,	'../Upload/goods/detail-101.png', 'detail');

##########################################################
#创建用户表
create table if not exists user
(
    user_id varchar(10) not null primary key,
    user_pwd char(32) not null,
    nick_name varchar(10),
    create_time timestamp not null,
    phone_num varchar(11),
    mailbox varchar(50),
    balance int unsigned not null,
    user_status enum('使用', '锁定')
)ENGINE=INNODB;

#用户表插入数据
insert into user
values
('hf170501', '25d55ad283aa400af464c76d713c07ad', '小赵', '20170808120000', '13711111111', 'for01@126.com', 0, '使用'),
('hf170502', '25d55ad283aa400af464c76d713c07ad', '小钱', '20170808120000', '13722222222', 'for02@126.com', 0, '使用'),
('hf170503', '25d55ad283aa400af464c76d713c07ad', '小孙', '20170808120000', '13733333333', 'for03@126.com', 0, '使用'),
('hf170504', '25d55ad283aa400af464c76d713c07ad', '小李', '20170909120000', '13744444444', 'for04@126.com', 0, '使用'),
('hf170505', '25d55ad283aa400af464c76d713c07ad', '小周', '20170909120000', '13755555555', 'for05@126.com', 0, '使用'),
('hf170506', '25d55ad283aa400af464c76d713c07ad', '小吴', '20170909120000', '13766666666', 'for06@126.com', 0, '使用'),
('hf170507', '25d55ad283aa400af464c76d713c07ad', '小郑', '20171010120000', '13777777777', 'for07@126.com', 0, '使用'),
('hf170508', '25d55ad283aa400af464c76d713c07ad', '小王', '20171010120000', '13788888888', 'for08@126.com', 0, '使用'),
('hf170509', '25d55ad283aa400af464c76d713c07ad', '小冯', '20171010120000', '13799999999', 'for09@126.com', 0, '使用'),
('hf170510', '25d55ad283aa400af464c76d713c07ad', '小陈', '20171010120000', '13700000000', 'for00@126.com', 0, '使用');

#创建订单表
create table if not exists order_list
(
    order_list_id int unsigned not null auto_increment primary key,
    user_id varchar(16) not null,
    good_id int unsigned not null,
    create_time timestamp not null,
    past_time timestamp not null,
    total int unsigned not null,
    address_id int not null,
    ol_status enum('payed', 'nopay', 'autoOverDue', 'menualOverDue'),
    shipped_status boolean not null
)ENGINE=INNODB;

#订单表插入数据
insert into order_list
values
(null, 'hf170501', 1, '2017-8-5 12:12:12', '2017-8-5 12:42:42', 1, 1, 'payed', true),
(null, 'hf170502', 1, '2017-8-5 12:12:13', '2017-8-5 12:42:42', 1, 1, 'payed', true),
(null, 'hf170501', 3, '2017-8-5 12:12:11', '2017-8-5 12:42:42', 1, 1, 'payed', false),
(null, 'hf170501', 4, '2017-8-5 12:12:15', '2017-8-5 12:42:42', 1, 1, 'payed', false),
(null, 'hf170501', 5, '2017-9-5 12:12:16', '2017-9-5 12:42:42', 1, 1, 'payed', false),
(null, 'hf170501', 7, '2017-9-5 12:12:12', '2017-9-5 12:42:42', 1, 1, 'autoOverDue', false),
(null, 'hf170501', 8, '2017-9-5 12:12:13', '2017-9-5 12:42:42', 1, 1, 'autoOverDue', false),
(null, 'hf170501', 9, '2017-9-5 12:12:11', '2017-9-5 12:42:42', 1, 1, 'autoOverDue', false),
(null, 'hf170501', 10, '2017-10-5 12:12:15', '2017-10-5 12:42:42', 1, 1, 'autoOverDue', false),
(null, 'hf170501', 11, '2017-10-5 12:12:16', '2017-10-5 12:42:42', 1, 1, 'autoOverDue', false);

#创建评论表
create table if not exists comment
(
    comment_id int unsigned auto_increment primary key,
    user_id varchar(10) not null,
    good_id int unsigned not null,
    create_time timestamp not null,
    content varchar(360) not null
)ENGINE=INNODB;

#评论表插入数据
insert into comment
values
(null, 'hf170501', 1, '2017-10-9 10:10:10', 'testing');