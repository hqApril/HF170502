//创建客服聊天的窗口，传入一个div的id

function ChatForService(id) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./application/views/css/ChatForService.css";
    document.getElementsByTagName("head")[0].appendChild(link);

    this.$id = $(id);

    var $div1 = $("<div id='chatObj'></div>");
    var $div11 = $("<div id='serviceInfo'></div>");
    var $img = "<img src='./application/views/images/01.jpg'>";
    var $p1 = $("<p>当前客服：小王</p>");
    var $p2 = $("<p>商&emsp;&emsp;店：小何电商秒杀平台</p>");

    $div11.append($img, $p1, $p2);

    var $div12 = $("<div id='headTitle'>当前聊天用户</div>");
    var $div13 = $("<div id='chatWith'></div>");

    $div1.append($div11, $div12, $div13);

    var $div2 = $("<div id='container'></div>");
    $div2.css("background-image", "url('./application/views/images/serviceBg.png')");

    this.$id.append($div1, $div2);
}

//添加发消息进来的用户到窗口中
ChatForService.prototype.addObj = function(sender, isTourist) {
    var $div = $("<div class='oneUser'></div>");
    $div.attr("sender", sender);
    $div.click(function() {
        for (var i = 0; i < $("#container").children().length; i++) {
            if ($("#container").children().eq(i).attr("sender") == $(this).attr("sender")) {
                break;
            }
        }

        $("#container").children().eq(i).show();
        $("#container").children().eq(i).siblings().hide();
    });

    if (isTourist == "yes") {
        $div.text("游客" + sender);
    } else {
        $div.text("用户" + sender);
    }

    $div.appendTo($("#chatWith"));
};

//为新连接的用户添加聊天窗口
ChatForService.prototype.createChatWindow = function(sender, isTourist) {
    var $div = $("<div class='chatWindow'></div>");
    $div.attr("sender", sender);

    if (isTourist == "yes") {
        var $div1 = $("<div class='chatWithWho'>正在和游客" + sender + "聊天</div>");
    } else {
        var $div1 = $("<div class='chatWithWho'>正在和用户" + sender + "聊天</div>");
    }

    var $div2 = $("<div class='chatInfo'></div>");
    var $div3 = $("<div class='enterInfo' contenteditable='true'></div>");
    var $sdiv4 = $("<div class='expression'></div>");

    for (i = 0; i < 50; i++) {
        var $img = $("<img src='./application/views/images/expression/" + (i + 1) + ".gif'>")
        $img.click(function() {
            $(this).clone().appendTo($div3);
        });

        $sdiv4.append($img);
    }

    var $input1 = $("<input type='button' value='添加表情'>");
    $input1.click(function() {
        $(this).next().next().toggle();
    });
    var $input2 = $("<input type='button' value='消息发送'>");
    $input2.attr("sender", sender);
    $input2.attr("isTourist", isTourist);

    $div.append($div1, $div2, $div3, $input1, $input2, $sdiv4);
    $("#container").append($div);
};

//客服登录后动态显示客服名字
ChatForService.prototype.changeServiceName = function(name) {
    $("#serviceInfo").children(":eq(1)").text("当前客服：" + name);
};

//发送信息按钮时间，用callback回调函数
ChatForService.prototype.sendMsg = function(callback) {
    $("input[value='消息发送']:last").click(function() {
        var msg = $(this).prev().prev();

        if (msg.html() == "") {
            alert("请输入内容");
        } else {
            callback(msg, $(this).attr("sender"), $(this).attr("isTourist"));

            var $div = $("<div class='oneMsg'></div>");
            var $p = $("<p>我</p>");
            var $sdiv1 = $("<div>" + msg.html() + "</div>");

            $div.append($p, $sdiv1);
            msg.prev().append($div);

            msg.prev()[0].scrollTop = msg.prev()[0].scrollHeight;
        }
    });
};
