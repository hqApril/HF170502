//创建websocket服务器
var WebSocketServer = require("ws").Server;
var ws = new WebSocketServer({
    port: 8181
});
var loginNow = [];
var serviceLoginNow = [];
var touristArr = [];
var GoodDAO = require("./GoodDAO");

console.log("服务器已启动");

//开机时搬运数据到redis中
GoodDAO.setReisData();


ws.on("connection", function (socket) {
    console.log("connected");

    socket.on("message", function (msg) {
        var msgObj = JSON.parse(msg);

        if (msgObj.type == "seckill") {    //秒杀
            var obj = {
                type: "seckill",
                sender: "server",
                receiver: "client",
                content: {
                    res: 0,
                    userId: msgObj.content.id,
                    goodId: msgObj.content.goodId
                }
            };

            GoodDAO.checkAddress(msgObj.content.id, function (res) {    //检查地址
                if (res == 0) {
                    obj.content.res = 0;

                    socket.send(JSON.stringify(obj));
                } else if (res == 1) {
                    GoodDAO.checkTimeQuantum(msgObj.content.goodId, function (res1) {   //检查时间段
                        if (res1 == 0) {
                            obj.content.res = 1;

                            socket.send(JSON.stringify(obj));
                        } else {
                            GoodDAO.checkRest(msgObj.content.goodId, function (res1) {    //检查剩余
                                if (res1 == 0) {
                                    obj.content.res = 2;

                                    socket.send(JSON.stringify(obj));
                                } else {
                                    GoodDAO.checkOrderList(msgObj.content.id, msgObj.content.goodId, function (res2) {    //检查订单
                                        if (res2 == 0) {
                                            obj.content.res = 3;
                                        } else {
                                            obj.content.res = 4;
                                        }

                                        socket.send(JSON.stringify(obj));
                                    });
                                }
                            }.bind(this));
                        }
                    }.bind(this));
                }
            }.bind(this));
        } else if (msgObj.type == "flashServiceLogin") {    //刷新客服登录的socket
            serviceLoginNow[msgObj.content.id] = socket;
        } else if (msgObj.type == "sendMsgToService") {    //发送小心给客服
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
                };

                socket.send(JSON.stringify(obj));
            } else {
                if (msgObj.sender == "tourist") {
                    var judge = "yes";

                    loginNow["tourist"] = socket;
                } else {
                    var judge = "no";

                    loginNow[msgObj.sender] = socket;

                    GoodDAO.addChatRecord(msgObj.sender, msgObj.content.content, 'to');
                }

                for (key in serviceLoginNow) {
                    var obj = {
                        type: "sendMsgToService",
                        sender: msgObj.sender,
                        receiver: "service",
                        content: {
                            isTourist: judge,
                            content: msgObj.content.content
                        }
                    };

                    serviceLoginNow[key].send(JSON.stringify(obj));
                }
            }
        } else if (msgObj.type == "sendMsgToClient") {    //发送消息给用户
            if (msgObj.content.isTourist == "yes") {
                var obj = {
                    type: "sendMsgToClient",
                    sender: msgObj.sender,
                    receiver: "client",
                    content: {
                        content: msgObj.content.content
                    }
                };

                loginNow["tourist"].send.send(JSON.stringify(obj));
            } else {
                GoodDAO.addChatRecord(msgObj.receiver, msgObj.content.content, 'from');

                var obj = {
                    type: "sendMsgToClient",
                    sender: msgObj.sender,
                    receiver: "client",
                    content: {
                        content: msgObj.content.content
                    }
                };

                loginNow[msgObj.receiver].send(JSON.stringify(obj));
            }
        }
    });

    socket.on("close", function () {    //页面关闭时检查用户页面连接情况
        for (key in serviceLoginNow) {
            if (serviceLoginNow[key].readyState == 3) {
                delete serviceLoginNow[key];
            }
        }

        for (key in loginNow) {
            if (loginNow[key].readyState == 3) {
                delete loginNow[key];
            }
        }
    });
});