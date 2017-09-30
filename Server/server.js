//创建websocket服务器
var WebSocketServer = require("ws").Server;
var ws = new WebSocketServer({
    port: 8181
})
var loginNow = [];
var serviceLoginNow = [];
var touristArr = [];
var UserDAO = require("./UserDAO");
var GoodDAO = require("./GoodDAO");
var ServiceDAO = require("./ServiceDAO");

console.log("服务器已启动");

//启动时更新数据到redis中
GoodDAO.setRedisData();

//定时更新数据库中的数据
GoodDAO.updateDbFromRedis();
GoodDAO.checkOrderList();

ws.on("connection", function(socket) {
    console.log("connected");

    socket.on("message", function(msg) {
        var msgObj = JSON.parse(msg);

        if (msgObj.type == "login") { //用户登录
            UserDAO.login(msgObj.content.id, msgObj.content.pwd, function(res) {
                if (res == "failed") {
                    var obj = {
                        type: "login",
                        sender: "server",
                        receiver: "client",
                        content: {
                            success: "no"
                        }
                    }
                } else {
                    if (loginNow[msgObj.content.id] != undefined) {
                        var obj = {
                            type: "login",
                            sender: "server",
                            receiver: "client",
                            content: {
                                success: "logined"
                            }
                        }
                    } else {
                        loginNow[msgObj.content.id] = socket;

                        var obj = {
                            type: "login",
                            sender: "server",
                            receiver: "client",
                            content: {
                                id: res[0].user_id,
                                nickname: res[0].nickname,
                                success: "yes"
                            }
                        }
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "refreshLoginInfo") { //更新登录信息
            loginNow[msgObj.content.id] = socket;

            UserDAO.refreshLoginInfo(msgObj.content.id, function(res) {
                var obj = {
                    type: "refreshLoginInfo",
                    sender: "server",
                    receiver: "client",
                    content: {
                        id: res[0].user_id,
                        nickname: res[0].nickname,
                        success: "yes"
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "checkRegisterId") { //验证注册名的重复性
            UserDAO.checkRegisterId(msgObj.content.id, function(res) {
                var obj = {
                    type: "checkRegisterId",
                    sender: "server",
                    receiver: "client",
                    content: {
                        success: true
                    }
                }

                if (res.length == 0)
                    obj.content.success = false;

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "register") { //注册
            UserDAO.register(msgObj.content.id, msgObj.content.pwd, msgObj.content.mailbox, 0, function(err) {
                var obj = {
                    type: "register",
                    sender: "server",
                    receiver: "client",
                    content: {
                        success: true
                    }
                }
                if (err) {
                    obj.content.success = false;
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getBannerImg") { //首页获取banner图片
            GoodDAO.getBannerImg(function(res) {
                var obj = {
                    type: "getBannerImg",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "getClassify") { //首页获取分类信息
            GoodDAO.getClassify(function(res) {
                var obj = {
                    type: "getClassify",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getTimeQuantum") { //首页获取时段信息
            GoodDAO.getTimeQuantum(function(i, res) {
                var obj = {
                    type: "getTimeQuantum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        i: i,
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getlastetOl") { //荣誉墙获取最新订单信息
            GoodDAO.getlastetOl(function(res) {
                var obj = {
                    type: "getlastetOl",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getGoodInfo") { //首页获取商品信息
            var start = msgObj.content.pagination * 4;
            var resPerPage = 4;

            GoodDAO.getGoodInfo(msgObj.content.classifyId, "common", msgObj.content.timeQuantumId, start, resPerPage, function(res) {
                var obj = {
                    type: "getGoodInfo",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getPageNum") { //首页获取商品分页信息
            GoodDAO.getPageNum(msgObj.content.classifyId, msgObj.content.timeQuantumId, function(res) {
                var obj = {
                    type: "getPageNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: Math.ceil(res.length / 4)
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getBackTime") { //首页获取倒计时信息
            GoodDAO.getBackTime(msgObj.content.timeQuantumId, function(res, ms) {
                var obj = {
                    type: "getBackTime",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res,
                        ms: ms
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getGoodDetails") { //商品详情页获取商品详情
            GoodDAO.getGoodDetails(msgObj.content.id, function(res) {
                var obj = {
                    type: "getGoodDetails",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getGoodImgs") { //获取商品图片
            GoodDAO.getGoodImgs(msgObj.content.id, function(res) {
                var obj = {
                    type: "getGoodImgs",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "secKill") { //商品秒杀
            GoodDAO.secKill(msgObj.content.loginId, msgObj.content.goodId, function(res) {
                var obj = {
                    type: "secKill",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "getMyInfo") { //获取我的信息
            UserDAO.getMyInfo(msgObj.content.id, function(res) {
                var obj = {
                    type: "getMyInfo",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "changeNickName") { //修改昵称
            UserDAO.changeNickName(msgObj.content.id, msgObj.content.nickname, function(res) {
                var obj = {
                    type: "changeNickName",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "changePhoneNum") { //修改手机号码
            UserDAO.changePhoneNum(msgObj.content.id, msgObj.content.phoneNum, function(res) {
                var obj = {
                    type: "changePhoneNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "changeMailbox") { //修改邮箱
            UserDAO.changeMailbox(msgObj.content.id, msgObj.content.mailbox, function(res) {
                var obj = {
                    type: "changeMailbox",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getMyAdd") { //获取我的地址
            UserDAO.getMyAdd(msgObj.content.id, function(res) {
                var obj = {
                    type: "getMyAdd",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "changeAddDefault") { //修改默认地址
            UserDAO.changeAddDefault(msgObj.content.id, msgObj.content.addId, function(res) {
                var obj = {
                    type: "changeAddDefault",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "addNewAdd") { //添加新地址
            UserDAO.addNewAdd(msgObj.content.id, msgObj.content.add, function(res) {
                var obj = {
                    type: "addNewAdd",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "recharge") { //充值
            UserDAO.recharge(msgObj.content.id, msgObj.content.num, function(res) {
                var obj = {
                    type: "recharge",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "getMyNopayOl") { //获取未支付订单
            UserDAO.getMyNopayOl(msgObj.content.id, msgObj.content.pageNow, function(res) {
                var obj = {
                    type: "getMyNopayOl",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getNoPayPageNum") { //获取未支付订单的分页信息
            UserDAO.getNoPayPageNum(msgObj.content.id, function(res) {
                var obj = {
                    type: "getNoPayPageNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getMyPayedOl") { //获取已支付订单
            UserDAO.getMyPayedOl(msgObj.content.id, msgObj.content.pageNow, function(res) {
                var obj = {
                    type: "getMyPayedOl",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getPayedPageNum") { //获取已支付订单的分页信息
            UserDAO.getPayedPageNum(msgObj.content.id, function(res) {
                var obj = {
                    type: "getPayedPageNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "payment") { //订单支付
            UserDAO.payment(msgObj.content.olId, function(res) {
                var obj = {
                    type: "payment",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "cancalOl") { //手动取消订单
            UserDAO.cancalOl(msgObj.content.olId, function(res) {
                var obj = {
                    type: "cancalOl",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getBuyedRecords") { //获取购买记录
            GoodDAO.getBuyedRecords(msgObj.content.id, function(res) {
                var obj = {
                    type: "getBuyedRecords",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getComment") { //获取评论信息
            GoodDAO.getComment(msgObj.content.id, msgObj.content.pageNow, function(res, len) {
                var obj = {
                    type: "getComment",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res,
                        len: len
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getCommentPageNum") { //获取评论的分页信息
            GoodDAO.getCommentPageNum(msgObj.content.id, function(res) {
                var obj = {
                    type: "getCommentPageNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "sendComment") { //发送评论
            GoodDAO.sendComment(msgObj.content.id, msgObj.content.goodId, msgObj.content.comment, function(res) {
                var obj = {
                    type: "sendComment",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "serviceLogin") { //客服登录
            ServiceDAO.serviceLogin(msgObj.content.id, msgObj.content.pwd, function(res) {
                var obj = {
                    type: "serviceLogin",
                    sender: "server",
                    receiver: "serviceClient",
                    content: {
                        res: res
                    }
                }

                if (res.length > 0) {
                    serviceLoginNow[msgObj.content.id] = socket;
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "freshLoginInfo") { //更新客服登录信息
            serviceLoginNow[msgObj.content.id] = socket;

            ServiceDAO.freshLoginInfo(msgObj.content.id, function(res) {
                var obj = {
                    type: "freshLoginInfo",
                    sender: "server",
                    receiver: "serviceClient",
                    content: {
                        res: res,
                        success: "yes"
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        } else if (msgObj.type == "sendMsgToservice") { //发送消息给客服
            var count = 0;

            for (key in serviceLoginNow) {
                count++;
            }

            if (count == 0) {
                var obj = {
                    type: "noService",
                    sender: "server",
                    receiver: "client",
                    content: {}
                }

                socket.send(JSON.stringify(obj));

                UserDAO.saveRecord(msgObj.sender, "service", msgObj.content.content, "from");
            } else {
                if (msgObj.sender == "tourist") {
                    for (var i = 0; i < touristArr.length; i++) {
                        if (touristArr[i] == socket)
                            break;
                    }

                    if (i == touristArr.length)
                        touristArr.push(socket);

                    for (key in serviceLoginNow) {
                        var obj = {
                            type: "sendMsgToservice",
                            sender: i,
                            receiver: "serviceClient",
                            content: {
                                content: msgObj.content.content,
                                isTourist: "yes"
                            }
                        }

                        serviceLoginNow[key].send(JSON.stringify(obj));
                    }
                } else {
                    for (key in serviceLoginNow) {
                        var obj = {
                            type: "sendMsgToservice",
                            sender: msgObj.sender,
                            receiver: "serviceClient",
                            content: {
                                content: msgObj.content.content,
                                isTourist: "no"
                            }
                        }

                        serviceLoginNow[key].send(JSON.stringify(obj));

                        UserDAO.saveRecord(msgObj.sender, key, msgObj.content.content, "from");
                    }
                }
            }
        } else if (msgObj.type == "sendMsgToClient") { //发送消息给用户
            if (msgObj.content.isTourist == "yes") {
                if (touristArr[msgObj.receiver].readyState != 3) {
                    var obj = {
                        type: "sendMsgToClient",
                        sender: msgObj.sender,
                        receiver: "tourist",
                        content: {
                            content: msgObj.content.content
                        }
                    }

                    touristArr[msgObj.receiver].send(JSON.stringify(obj));
                }
            } else {
                if (loginNow[msgObj.receiver] != undefined) {
                    var obj = {
                        type: "sendMsgToClient",
                        sender: msgObj.sender,
                        receiver: msgObj.receiver,
                        content: {
                            content: msgObj.content.content
                        }
                    }

                    loginNow[msgObj.receiver].send(JSON.stringify(obj));
                }

                UserDAO.saveRecord(msgObj.receiver, msgObj.sender, msgObj.content.content, "to");
            }
        } else if (msgObj.type == "getChatRecord") { //获取客服发过来的消息
            UserDAO.getChatRecord(msgObj.content.id, "to", msgObj.content.chatRecordPageNow, function(res) {

                var obj = {
                    type: "getChatRecord",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            });
        } else if (msgObj.type == "getChatPageNum") { //获取聊天分页信息
            UserDAO.getChatPageNum(msgObj.content.id, "to", function(res) {
                var obj = {
                    type: "getChatPageNum",
                    sender: "server",
                    receiver: "client",
                    content: {
                        res: res
                    }
                }

                socket.send(JSON.stringify(obj));
            })
        }
    });

    socket.on("close", function() {
        for (key in loginNow) {
            if (loginNow[key].readyState == 3) {
                delete loginNow[key];
            }
        }

        for (key in serviceLoginNow) {
            if (serviceLoginNow[key].readyState == 3) {
                delete serviceLoginNow[key];
            }
        }
    })
});
