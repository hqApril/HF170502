//客服客户端连接服务器

var client = new WebSocket("ws://localhost:8181");

client.onopen = function() {
    console.log("connected to server");

    if (sessionStorage.HF170502_serviceNow != undefined) {
        $("#transMask").hide();
        $("#loginInterface").hide();

        var obj = {
            type: "freshLoginInfo",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_serviceNow
            }
        }

        client.send(JSON.stringify(obj));
    }
}

client.onmessage = function(msg) {
    var msgObj = JSON.parse(msg.data);

    if (msgObj.type == "serviceLogin") {
        if (msgObj.content.res.length == 0) {
            alert("登录失败");
        } else {
            alert("登录成功");

            $("#transMask").hide();
            $("#loginInterface").hide();
            sessionStorage.HF170502_serviceNow = msgObj.content.res[0].service_id;

            chatForService.changeServiceName(msgObj.content.res[0].nickname);
        }
    } else if (msgObj.type == "freshLoginInfo") {
        if (msgObj.content.success == "yes") {
            $("#transMask").hide();
            $("#loginInterface").hide();

            chatForService.changeServiceName(msgObj.content.res[0].nickname);
        }
    } else if (msgObj.type = "sendMsgToservice") {
        for (var i = 0; i < $("#chatWith").children().length; i++) {
            if ($("#chatWith").children().eq(i).attr("sender") == msgObj.sender) {
                break;
            }
        }

        if (i == $("#chatWith").children().length) {
            chatForService.addObj(msgObj.sender, msgObj.content.isTourist);
            chatForService.createChatWindow(msgObj.sender, msgObj.content.isTourist);

            chatForService.sendMsg(function(msg, receiver, isTourist) {
                var obj = {
                    type: "sendMsgToClient",
                    sender: sessionStorage.HF170502_serviceNow,
                    receiver: receiver,
                    content: {
                        content: msg.html(),
                        isTourist: isTourist
                    }
                }

                client.send(JSON.stringify(obj));
            });
        }

        for (var i = 0; i < $("#container").children().length; i++) {
            if ($("#container").children().eq(i).attr("sender") == msgObj.sender)
                break;
        }

        var $div = $("<div class='oneMsg'></div>");

        if (msgObj.content.isTourist == "yes") {
            var $p = $("<p>游客" + msgObj.sender + "</p>");
        } else {
            var $p = $("<p>用户" + msgObj.sender + "</p>");
        }

        var $sdiv1 = $("<div>" + msgObj.content.content + "</div>");

        $div.append($p, $sdiv1);
        $("#container").children().eq(i).children(".chatInfo").append($div);

        $("#container").children().eq(i).children(".chatInfo").get(0).scrollTop = $("#container").children().eq(i).children(".chatInfo").get(0).scrollHeight;
    }
}
