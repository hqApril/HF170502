function GoodDAO(dbAdapterName, redisAdapterName) {    //引入适配器
    this.dbAdapterName = dbAdapterName == undefined ? "../dbAdapter" : dbAdapterName;
    this.redisAdapterName = redisAdapterName == undefined ? "../redisAdapter" : redisAdapterName;

    this.dbAdapter = require(this.dbAdapterName);
    this.redisAdapter = require(this.redisAdapterName);
}

//首页获取分类信息
//callback为回调函数
GoodDAO.prototype.getClassify = function(callback) {
    var sql = "select * from Goods_classify;";

    this.dbAdapter.select(sql, [], function(res) {
        callback(res);
    });
};

//首页获取banner图片
//传入回调函数
GoodDAO.prototype.getBannerImg = function(callback) {
    var sql = "select * from Banner_img;";

    this.dbAdapter.select(sql, [], function(res) {
        callback(res);
    });
};

//首页获取秒杀时间段
//传入回调函数
GoodDAO.prototype.getTimeQuantum = function(callback) {
    var sql = "select * from timeQuantum;";

    this.dbAdapter.select(sql, [], function(res) {
        for (var i = 0; i < res.length; i++) {
            var date = new Date();
            var startTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + res[i].start_time + ":" + "00:00");
            var endTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + res[i].end_time + ":" + "00:00");
            var now = date.getTime();

            if (startTime <= now && endTime >= now) {
                break;
            }
        }

        if (i == res.length) {
            callback("noSeckill", res)
        } else {
            callback(i, res);
        }
    })
};

//获取最新的订单信息，用于荣誉墙数据的更新
//传入回调函数
GoodDAO.prototype.getlastetOl = function(callback) {
    var sql = "select * from OrderList order by id desc limit 0,15;";

    this.dbAdapter.select(sql, [], function(res) {
        callback(res);
    })
}

//首页获取当前展示的商品信息
//传入分类、图片类型、时间段、当前页信息
//用回调函数处理得到的数据
GoodDAO.prototype.getGoodInfo = function(classifyId, type, timeQuantumId, start, resPerPage, callback) {
    if (classifyId == "all") {
        var sql = "select Goods.[good_id],Goods.[name],Goods.[discount_price],Goods_img.[path] from Goods,Goods_img where Goods.[good_id] = Goods_img.[good_id] and Goods_img.[img_type] = ? and Goods.[time_quantum_id] = ? limit ?, ?;";

        this.dbAdapter.select(sql, [type, timeQuantumId, start, resPerPage], function(res) {
            callback(res);
        });
    } else {
        var sql = "select Goods.[good_id],Goods.[name],Goods.[discount_price],Goods_img.[path] from Goods,Goods_img where Goods.[good_id] = Goods_img.[good_id] and Goods_img.[img_type] = ? and Goods.[time_quantum_id] = ? and Goods.[classify_id] = ? limit ?, ?;";

        this.dbAdapter.select(sql, [type, timeQuantumId, classifyId, start, resPerPage], function(res) {
            callback(res);
        });
    }
};

//首页获取商品的分类信息
//传入分类、时间段
//用回调函数处理得到的数据
GoodDAO.prototype.getPageNum = function(classifyId, timeQuantumId, callback) {
    if (classifyId == "all") {
        var sql = "select * from Goods where   time_quantum_id = ?;";

        this.dbAdapter.select(sql, [timeQuantumId], function(res) {
            callback(res);
        });
    } else {
        var sql = "select * from Goods where   time_quantum_id = ? and classify_id = ?;";

        this.dbAdapter.select(sql, [timeQuantumId, classifyId], function(res) {
            callback(res);
        })
    }
};

//获取首页的倒计时信息
//传入时间段的id
//用回调函数处理得到的数据
GoodDAO.prototype.getBackTime = function(id, callback) {
    var sql = "select * from TimeQuantum where time_quantum_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        var date = new Date();
        var startTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + res[0].start_time + ":" + "00:00");
        var endTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + res[0].end_time + ":" + "00:00");
        var now = date.getTime();

        var res1;
        var ms;

        if (startTime > now) {
            res1 = "wait";
            ms = startTime - now;
        } else if (startTime <= now && endTime >= now) {
            res1 = "now";
            ms = endTime - now;
        } else {
            res1 = "pass";
            ms = 0;
        }

        callback(res1, ms);
    });
};

//商品详情页面获取商品详细信息
//传入商品的id
//用回调函数处理得到的数据
GoodDAO.prototype.getGoodDetails = function(id, callback) {
    var sql = "select Goods.* from Goods where Goods.[good_id] = ?";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    });
};

//商品详情页获取商品的图片展示
//传入商品的id
//用回调函数处理得到的数据
GoodDAO.prototype.getGoodImgs = function(id, callback) {
    var sql = "select * from Goods_img where good_id = ?";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    });
};

//商品详情页面获取商品的购买记录
//传入商品的id
//用回调函数处理得到的数据
GoodDAO.prototype.getBuyedRecords = function(id, callback) {
    var sql = "select * from OrderList, Goods where OrderList.[good_id] = ? and OrderList.[ol_status] = ? and Goods.[good_id] = OrderList.[good_id];";

    this.dbAdapter.select(sql, [id, "payed"], function(res) {
        callback(res);
    });
};

//商品详情页面获取商品的评论记录
//传入商品的id、评论页当前页的页码
//用回调函数处理得到的数据
GoodDAO.prototype.getComment = function(id, pageNow, callback) {
    var sql = "select * from Comments where good_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        var len = res.length;
        var sql = "select * from Comments where good_id = ? order by create_time desc limit ?, ?;";

        this.dbAdapter.select(sql, [id, pageNow * 15, 15], function(res1) {
            callback(res1, len);
        })
    }.bind(this));
};

//商品详情页获取商品的评论分页信息
//传入商品的id
//用回调函数处理得到的数据
GoodDAO.prototype.getCommentPageNum = function(id, callback) {
    var sql = "select * from Comments where good_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(Math.ceil(res.length / 15));
    })
};

//商品详情也发送评论
//传入用户id、商品id、评论内容
//用回调函数处理得到的数据
GoodDAO.prototype.sendComment = function(id, goodId, val, callback) {
    var sql = "select * from OrderList where user_id = ? and good_id = ? and ol_status = ?;";

    this.dbAdapter.select(sql, [id, goodId, "payed"], function(res) {
        if (res.length == 0) {
            callback("nopay");
        } else {
            var sql = "select * from Comments where user_id = ? and good_id = ?;";

            this.dbAdapter.select(sql, [id, goodId], function(res1) {
                if (res1.length != 0) {
                    callback("sended");
                } else if (val.length < 5) {
                    callback("tooShort");
                } else if (val.length > 180) {
                    callback("tooLong");
                } else {
                    callback("success");

                    var sql = "insert into Comments (user_id, good_id, create_time, content) values (?, ?, ?, ?);";

                    this.dbAdapter.run(sql, [id, goodId, new Date().getTime(), val], function() {});
                }
            }.bind(this))
        }
    }.bind(this));
};

//服务器开机的时候将数据库的数据写入到redis中
GoodDAO.prototype.setRedisData = function() {
    var sql = "select * from Users";
    this.dbAdapter.select(sql, [], function(res) {
        var arr = [];

        for (var i = 0; i < res.length; i++) {
            arr.push(res[i].user_id);
        }

        this.redisAdapter.setOne("users", arr);
    }.bind(this));

    var sql = "select * from Goods;"
    this.dbAdapter.select(sql, [], function(res) {
        for (var i = 0; i < res.length; i++) {
            this.redisAdapter.setOne(res[i].good_id, res[i]);
        }
    }.bind(this));

    var sql = "select * from TimeQuantum;"
    this.dbAdapter.select(sql, [], function(res) {
        for (var i = 0; i < res.length; i++) {
            this.redisAdapter.setOne(res[i].time_quantum_id, res[i]);
        }
    }.bind(this));

    var sql = "select * from Users;";
    this.dbAdapter.select(sql, [], function(res) {
        for (var i = 0; i < res.length; i++) {
            var sql = "select * from Address where user_id = ?;";

            this.dbAdapter.select1(sql, [res[i].user_id], i, function(i, res1) {
                var arr = [];

                for (var j = 0; j < res1.length; j++) {
                    arr.push(res1[j]);
                }

                this.redisAdapter.setOne(res[i].user_id + ":address", arr);
            }.bind(this))
        }
    }.bind(this));

    var sql = "select * from Users;";
    this.dbAdapter.select(sql, [], function(res) {
        for (var i = 0; i < res.length; i++) {
            var sql = "select * from OrderList where user_id = ?;";

            this.dbAdapter.select1(sql, [res[i].user_id], i, function(i, res1) {
                var arr = [];

                for (var j = 0; j < res1.length; j++) {
                    arr.push(res1[j]);
                }

                this.redisAdapter.setOne(res[i].user_id + ":orderList", arr);
            }.bind(this))
        }
    }.bind(this));

    this.redisAdapter.setOne("goodChanged", []);
    this.redisAdapter.setOne("olAdd", []);
    this.redisAdapter.setOne("olChanged", []);
};

//商品秒杀
//传入当前登录id、商品id
//用回调函数处理得到的数据
GoodDAO.prototype.secKill = function(loginId, goodId, callback) {
    this.redisAdapter.getOne(goodId, function(res) {
        var goodInfo = JSON.parse(res);

        this.redisAdapter.getOne(goodInfo.time_quantum_id, function(res1) {
            console.log(res1);
            var timeInfo = JSON.parse(res1);

            var date = new Date();
            var startTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + timeInfo.start_time + ":" + "00:00");
            var endTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + timeInfo.end_time + ":" + "00:00");
            var now = date.getTime();

            if (now < startTime) {
                callback("wait");
            } else if (now > endTime) {
                callback("end");
            } else {
                this.redisAdapter.getOne(loginId + ":address", function(res1) {
                    var val1 = JSON.parse(res1);

                    if (val1.length == 0) {
                        callback("noAdd");
                    } else {
                        this.redisAdapter.getOne(loginId + ":orderList", function(res2) {
                            var val2 = JSON.parse(res2);

                            for (var i = 0; i < val2.length; i++) {
                                if (val2[i].user_id == loginId && val2[i].good_id == goodId && (val2[i].ol_status == "nopay" || val2[i].ol_status == "payed")) {
                                    break;
                                }
                            }

                            if (i != val2.length) {
                                callback("buyed");
                            } else {
                                this.redisAdapter.getOne(goodId, function(res3) {
                                    var val3 = JSON.parse(res3);

                                    if (val3.rest == 0) {
                                        callback("noRest");
                                    } else {
                                        callback("success");
                                        val3.rest--;
                                        this.redisAdapter.setOne(goodId, val3);

                                        this.redisAdapter.getOne("goodChanged", function(res4) {
                                            var val4 = JSON.parse(res4);

                                            for (var j = 0; j < val4.length; i++) {
                                                if (val4[j] == goodId) {
                                                    break;
                                                }
                                            }

                                            if (j == val4.length) {
                                                val4.push(goodId);

                                                this.redisAdapter.setOne("goodChanged", val4);
                                            }
                                        }.bind(this))

                                        for (var k = 0; k < val1.length; k++) {
                                            if (val1[k].is_default == "true") {
                                                break;
                                            }
                                        }

                                        var ol = {
                                            user_id: loginId,
                                            good_id: goodId,
                                            create_time: new Date().getTime(),
                                            past_time: new Date().getTime() + 1800000,
                                            total: 1,
                                            address_id: val1[k].id,
                                            ol_status: "nopay"
                                        }

                                        this.redisAdapter.getOne(loginId + ":orderList", function(res5) {
                                            var val5 = JSON.parse(res5);

                                            val5.push(ol);

                                            this.redisAdapter.setOne(loginId + ":orderList", val5);
                                        }.bind(this));

                                        this.redisAdapter.getOne("olAdd", function(res6) {
                                            var val6 = JSON.parse(res6);

                                            val6.push(ol);

                                            this.redisAdapter.setOne("olAdd", val6);
                                        }.bind(this));
                                    }
                                }.bind(this))
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
    }.bind(this));
};

//定时更新redis中的数据到数据库中
GoodDAO.prototype.updateDbFromRedis = function() {
    setInterval(function() {
        this.redisAdapter.getOne("goodChanged", function(res) {
            var val = JSON.parse(res);

            this.redisAdapter.setOne("goodChanged", []);

            for (var i = 0; i < val.length; i++) {
                this.redisAdapter.getOne(val[i], function(res1) {
                    var val1 = JSON.parse(res1);
                    var sql = "update Goods set rest = ? where good_id = ?;";
                    this.dbAdapter.run(sql, [val1.rest, val1.good_id], function() {});
                }.bind(this))
            }
        }.bind(this));

        this.redisAdapter.getOne("olAdd", function(res) {
            var val = JSON.parse(res);
            this.redisAdapter.setOne("olAdd", []);

            for (var i = 0; i < val.length; i++) {
                var sql = "insert into OrderList (user_id, good_id, create_time, past_time, total, address_id, ol_status) values (?, ?, ?, ?, ?, ?, ?);";

                this.dbAdapter.run(sql, [val[i].user_id, val[i].good_id, val[i].create_time, val[i].past_time, val[i].total, val[i].address_id, val[i].ol_status], function(err) {
                    console.log(err);
                });
            }
        }.bind(this));

        this.redisAdapter.getOne("olChanged", function(res) {
            var val = JSON.parse(res);

            this.redisAdapter.setOne("olChanged", []);

            for (var i = 0; i < val.length; i++) {
                this.redisAdapter.getOne1(val[i].user_id + ":orderList", i, function(i, res1) {
                    var val1 = JSON.parse(res1);

                    var sql = "update OrderList set ol_status = ? where user_id = ? and good_id = ? and ol_status = ?;";

                    this.dbAdapter.run(sql, [val1[val[i].order].ol_status, val1[val[i].order].user_id, val1[val[i].order].good_id, "nopay"], function() {});
                }.bind(this));
            }
        }.bind(this));
    }.bind(this), 1000);
}

//定时对订单进行过期查询
GoodDAO.prototype.checkOrderList = function() {
    setInterval(function() {
        this.redisAdapter.getOne("users", function(res1) {
            var users = JSON.parse(res1);

            for (var i = 0; i < users.length; i++) {
                this.redisAdapter.getOne1(users[i] + ":orderList", i, function(i, res2) {
                    var val2 = JSON.parse(res2);
                    var judgement = false;

                    for (var j = 0; j < val2.length; j++) {
                        var now = new Date().getTime();

                        if (val2[j].past_time < now && val2[j].ol_status == "nopay") {
                            val2[j].ol_status = "autoOverDue";
                            judgement = true;

                            var obj = {
                                user_id: users[i],
                                order: j
                            }

                            this.redisAdapter.getOne("olChanged", function(res3) {
                                var val3 = JSON.parse(res3);

                                val3.push(obj);

                                this.redisAdapter.setOne("olChanged", val3);
                            }.bind(this))
                        }
                    }

                    if (judgement) {
                        this.redisAdapter.setOne(users[i] + ":orderList", val2);
                    }
                }.bind(this));
            }
        }.bind(this));
    }.bind(this), 1000);
};

module.exports = new GoodDAO();
