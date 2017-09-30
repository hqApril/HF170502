//引入适配器
function UserDAO(dbAdapterName, redisAdapterName) {
    this.dbAdapterName = dbAdapterName == undefined ? "../dbAdapter" : dbAdapterName;
    this.redisAdapterName = redisAdapterName == undefined ? "../redisAdapter" : redisAdapterName;

    this.dbAdapter = require(this.dbAdapterName);
    this.redisAdapter = require(this.redisAdapterName);
}

//用户登录
//传入登录id、登录密码
//用回调函数处理得到的数据
UserDAO.prototype.login = function(id, pwd, callback) {
    var sql = "select * from Users where user_id = ? and user_pwd = ?;";

    this.dbAdapter.select(sql, [id, pwd], function(res) {
        if (res == "failed") {
            console.log(res);
        } else {
            if (res.length > 0) {
                callback(res);
            } else {
                callback("failed");
            }
        }
    });
};

//刷新登录信息
//传入需要更新的id
//用回调函数处理得到的数据
UserDAO.prototype.refreshLoginInfo = function(id, callback) {
    var sql = "select * from Users where user_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    });
};

//验证注册名的重复性
//传入需要验证的id
//用回调函数处理得到的数据
UserDAO.prototype.checkRegisterId = function(id, callback) {
    var sql = "select * from Users where user_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    })
}

//用户注册
//传入注册id、注册密码、注册邮箱、注册手机号
////用回调函数处理得到的数据
UserDAO.prototype.register = function(id, pwd, mailbox, balance, callback) {
    var sql = "insert into Users (user_id, user_pwd, mailbox, balance) values (?, ?, ?, ?);";

    this.dbAdapter.run(sql, [id, pwd, mailbox, balance], function(err) {
        callback(err);
    })

    var arr = [];
    this.redisAdapter.setOne(id + ":orderList", arr);
    this.redisAdapter.setOne(id + ":address", arr);

    this.redisAdapter.getOne("users", function(res) {
        var val = JSON.parse(res);

        val.push(id);

        this.redisAdapter.setOne("users", val);
    }.bind(this))
};

//个人中心页面获取个人信息
//传入用户id
//用回调函数处理得到的数据
UserDAO.prototype.getMyInfo = function(id, callback) {
    var sql = "select * from Users where user_id = ?";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    });
}

//个人中心修改昵称
//传入用户id、昵称
//用回调函数处理得到的数据
UserDAO.prototype.changeNickName = function(id, nickName, callback) {
    var sql = "update Users set nickname = ? where user_id = ?;";

    this.dbAdapter.run(sql, [nickName, id], function(err) {
        if (err) {
            console.log(err);
        } else {
            callback("success");
        }
    })
};

//个人中心修改手机号码
//传入用户id、手机号码
//用回调函数处理得到的数据
UserDAO.prototype.changePhoneNum = function(id, phoneNum, callback) {
    var sql = "update Users set phone_num = ? where user_id = ?;";

    this.dbAdapter.run(sql, [phoneNum, id], function(err) {
        if (err) {
            console.log(err);
        } else {
            callback("success");
        }
    })
};

//个人中心修改邮箱地址
//传入用户id、邮箱地址
//用回调函数处理得到的数据
UserDAO.prototype.changeMailbox = function(id, mailbox, callback) {
    var sql = "update Users set mailbox = ? where user_id = ?;";

    this.dbAdapter.run(sql, [mailbox, id], function(err) {
        if (err) {
            console.log(err);
        } else {
            callback("success");
        }
    })
};

//个人中心获取地址
//传入用户id
//用回调函数处理得到的数据
UserDAO.prototype.getMyAdd = function(id, callback) {
    var sql = "select * from Address where user_id = ?";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    })
};

//修改默认地址
//传入用户id、地址id
//用回调函数处理得到的数据
UserDAO.prototype.changeAddDefault = function(id, addId, callback) {
    var sql = "update Address set is_default = 'false' where user_id = ?";

    this.dbAdapter.run(sql, [id], function(err) {});

    var sql = "update Address set is_default = 'true' where user_id = ? and id = ?;"

    this.dbAdapter.run(sql, [id, addId], function(err) {
        if (err) {
            console.log(err);
        } else {
            callback("success");
        }
    })

    setTimeout(function() {
        var sql = "select * from Address where user_id = ?";

        this.dbAdapter.select(sql, [id], function(res1) {
            var arr = [];

            for (var j = 0; j < res1.length; j++) {
                arr.push(res1[j]);
            }

            this.redisAdapter.setOne(id + ":address", arr);
        }.bind(this));
    }.bind(this), 100);
};

//新增地址
//传入用户id、新id地址
//用回调函数处理得到的数据
UserDAO.prototype.addNewAdd = function(id, add, callback) {
    var sql = "select * from Address where user_id = ? and address = ?;";

    this.dbAdapter.select(sql, [id, add], function(res) {
        if (res.length > 0) {
            callback("owned");
        } else {
            var sql = "select * from Address where user_id = ?;";

            this.dbAdapter.select(sql, [id], function(res) {
                var sql = "insert into Address (user_id, address, is_default) values (?, ?, ?);";

                if (res.length > 0) {
                    this.dbAdapter.run(sql, [id, add, "false"], function(err) {
                        callback("success");
                    })
                } else {
                    this.dbAdapter.run(sql, [id, add, "true"], function(err) {
                        callback("success");
                    })
                }

                setTimeout(function() {
                    var sql = "select * from Address where user_id = ?";

                    this.dbAdapter.select(sql, [id], function(res1) {
                        var arr = [];

                        for (var j = 0; j < res1.length; j++) {
                            arr.push(res1[j]);
                        }

                        this.redisAdapter.setOne(id + ":address", arr);
                    }.bind(this));
                }.bind(this), 100);
            }.bind(this))
        }
    }.bind(this))
};

//充值功能
//传入用户id、充值金额
//用回调函数处理得到的数据
UserDAO.prototype.recharge = function(id, num, callback) {
    var sql = "select balance from Users where user_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        var balance = res[0].balance;

        balance = parseInt(balance) + parseInt(num);

        var sql = "update Users set balance = ? where user_id = ?;";

        this.dbAdapter.run(sql, [balance, id], function(err) {
            if (err == null)
                callback(balance);
            else {
                callback("failed");
            }
        })
    }.bind(this));
};

//获取未支付订单
//传入用户id、当前页信息
//用回调函数处理得到的数据
UserDAO.prototype.getMyNopayOl = function(id, pageNow, callback) {
    var sql = "select OrderList.[id], Goods.[good_id], Goods.[name], Goods.[original_price], Goods.[discount_price], Goods_img.[path] from OrderList, Goods, Goods_img where OrderList.[good_id] = Goods_img.[good_id] and Goods_img.[good_id] = Goods.[good_id] and Goods_img.[img_type] = ? and OrderList.[user_id] = ? and OrderList.[ol_status] = ? limit ?, ?;";

    this.dbAdapter.select(sql, ["common", id, "nopay", pageNow * 3, 3], function(res) {
        var arr = [];

        for (var i = 0; i < res.length; i++) {
            arr.push(res[i]);
        }

        callback(arr);
    })
};

//获取未支付订单的分页信息
//传入用户id
//用回调函数处理得到的数据
UserDAO.prototype.getNoPayPageNum = function(id, callback) {
    var sql = "select Goods.[good_id], Goods.[name], Goods.[original_price], Goods.[discount_price], Goods_img.[path] from OrderList, Goods, Goods_img where OrderList.[good_id] = Goods_img.[good_id] and Goods_img.[good_id] = Goods.[good_id] and Goods_img.[img_type] = ? and OrderList.[user_id] = ? and OrderList.[ol_status] = ?;";

    this.dbAdapter.select(sql, ["common", id, "nopay"], function(res) {
        callback(Math.ceil(res.length / 3));
    })
};

//获取已支付订单
//传入用户id、当前页信息
//用回调函数处理得到的数据
UserDAO.prototype.getMyPayedOl = function(id, pageNow, callback) {
    var sql = "select Goods.[good_id], Goods.[name], Goods.[original_price], Goods.[discount_price], Goods_img.[path] from OrderList, Goods, Goods_img where OrderList.[good_id] = Goods_img.[good_id] and Goods_img.[good_id] = Goods.[good_id] and Goods_img.[img_type] = ? and OrderList.[user_id] = ? and OrderList.[ol_status] = ? limit ?, ?;";

    this.dbAdapter.select(sql, ["common", id, "payed", pageNow * 3, 3], function(res) {
        var arr = [];

        for (var i = 0; i < res.length; i++) {
            arr.push(res[i]);
        }

        callback(arr);
    })
};

//获取已支付订单的分页信息
//传入用户id
//用回调函数处理得到的数据
UserDAO.prototype.getPayedPageNum = function(id, callback) {
    var sql = "select Goods.[good_id], Goods.[name], Goods.[original_price], Goods.[discount_price], Goods_img.[path] from OrderList, Goods, Goods_img where OrderList.[good_id] = Goods_img.[good_id] and Goods_img.[good_id] = Goods.[good_id] and Goods_img.[img_type] = ? and OrderList.[user_id] = ? and OrderList.[ol_status] = ?;";

    this.dbAdapter.select(sql, ["common", id, "payed"], function(res) {
        callback(Math.ceil(res.length / 3));
    })
};

//订单支付
//传入订单id
//用回调函数处理得到的数据
UserDAO.prototype.payment = function(id, callback) {
    var sql = "select * from OrderList, Goods where OrderList.[id] = ? and OrderList.[good_id] = Goods.[good_id];";

    this.dbAdapter.select(sql, [id], function(res) {
        var sql = "select * from Users where user_id = ?;";

        this.dbAdapter.select(sql, [res[0].user_id], function(res1) {
            if (res[0].ol_status != "nopay") {
                callback("overDue");
            } else if (res[0].discount_price > res1[0].balance) {
                callback("noMoney");
            } else {
                callback("success");
                var balance = res1[0].balance - res[0].discount_price;

                var sql = "update Users set balance = ? where user_id = ?;";

                this.dbAdapter.run(sql, [balance, res[0].user_id], function() {});

                var sql = "update OrderList set ol_status = ? where id = ?;";

                this.dbAdapter.run(sql, ["payed", id], function() {});

                this.redisAdapter.getOne(res[0].user_id + ":orderList", function(res2) {
                    var val = JSON.parse(res2);

                    for (var i = 0; i < val.length; i++) {
                        if (val[i].user_id == res[0].user_id && val[i].good_id == res[0].good_id && val[i].ol_status == "nopay") {
                            val[i].ol_status = "payed";
                            break;
                        }
                    }

                    this.redisAdapter.setOne(res[0].user_id + ":orderList", val);
                }.bind(this));
            }
        }.bind(this));
    }.bind(this));
}

//手动取消订单
//传入用户id
//用回调函数处理得到的数据
UserDAO.prototype.cancalOl = function(id, callback) {
    var sql = "select * from OrderList, Goods where OrderList.[id] = ? and OrderList.[good_id] = Goods.[good_id];";

    this.dbAdapter.select(sql, [id], function(res) {
        var sql = "select * from Users where user_id = ?;";

        this.dbAdapter.select(sql, [res[0].user_id], function(res1) {
            if (res[0].ol_status != "nopay") {
                callback("overDue");
            } else {
                callback("success");

                var sql = "update OrderList set ol_status = ? where id = ?;";

                this.dbAdapter.run(sql, ["manualOverDue", id], function() {});

                this.redisAdapter.getOne(res[0].user_id + ":orderList", function(res2) {
                    var val = JSON.parse(res2);

                    for (var i = 0; i < val.length; i++) {
                        if (val[i].user_id == res[0].user_id && val[i].good_id == res[0].good_id && val[i].ol_status == "nopay") {
                            val[i].ol_status = "manualOverDue";
                            break;
                        }
                    }

                    this.redisAdapter.setOne(res[0].user_id + ":orderList", val);
                }.bind(this));
            }
        }.bind(this));
    }.bind(this));
};

//保存聊天记录
//传入用户id、客服id、聊天内容、内容来源
//用回调函数处理得到的数据
UserDAO.prototype.saveRecord = function(userid, serviceId, content, source) {
    var sql = "insert into ChatRecords (user_id, service_id, create_time, content, source) values (?, ?, ?, ?, ?);";

    var now = new Date().getTime();

    this.dbAdapter.run(sql, [userid, serviceId, now, content, source], function() {});
};

//个人中心页面获取客服发来的信息
//传入用户id、信息来源、当前分页信息
//用回调函数处理得到的数据
UserDAO.prototype.getChatRecord = function(id, source, pageNow, callback) {
    var sql = "select * from ChatRecords where user_id = ? and source = ? limit ?, ?;";

    this.dbAdapter.select(sql, [id, source, pageNow * 3, 3], function(res) {
        callback(res);
    });
}

//个人中心获取客服发来的消息的分页信息
//传入用户id、信息来源
//用回调函数处理得到的数据
UserDAO.prototype.getChatPageNum = function(id, source, callback) {
    var sql = "select * from ChatRecords where user_id = ? and source = ?;";

    this.dbAdapter.select(sql, [id, source], function(res) {
        callback(Math.ceil(res.length / 3));
    });
};

module.exports = new UserDAO();
