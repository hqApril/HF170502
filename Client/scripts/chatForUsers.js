//创建用户聊天的窗口，传入一个div的id

function ChatForUsers(id) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "./css/ChatForUsers.css";
    document.getElementsByTagName("head")[0].appendChild(link);
    this.$id = $(id);

    var $fdiv = $("<div id='chatWindow'></div>");
    var $sdiv1 = $("<div id='whoChat'>游客在线</div>");
    var $sdiv2 = $("<div id='headLine'></div>");
    var $sdiv3 = $("<div id='showChatInfo'></div>");
    var $sdiv4 = $("<div id='enterInfo' contenteditable='true'></div>");
    var $sdiv5 = $("<div id='expression'></div>");

    for (i = 0; i < 50; i++) {
        var $img = $("<img src='./images/expression/" + (i + 1) + ".gif'>")
        $img.click(function() {
            $(this).clone().appendTo($sdiv4);
        });

        $sdiv5.append($img);
    }

    var $input1 = $("<input value='添加表情' type='button'>");
    $input1.click(function() {
        $("#expression").toggle();
    });

    var $input2 = $("<input value='消息发送' type='button'>");

    $fdiv.append($sdiv1, $sdiv2, $sdiv3, $sdiv4, $input1, $input2, $sdiv5);
    this.$id.append($fdiv);
}

//用户登录后修改当前用户名
ChatForUsers.prototype.changeWho = function(id, nickname) {
    if (arguments.length == 1) {
        $("#whoChat").text(id);
    } else {
        $("#whoChat").text(nickname + "(" + id + ")");
    }
};

//发送消息挂事件，用一个回调函数
ChatForUsers.prototype.sendMsg = function(callback) {
    $("input[value='消息发送']").click(function() {
        var msg = $("#enterInfo");

        if (msg.html() == "") {
            alert("请输入内容");
        } else {
            callback(msg);

            var $div = $("<div class='oneMsg'></div>");
            var $p = $("<p>我</p>");
            var $sdiv1 = $("<div>" + msg.html() + "</div>");

            $div.append($p, $sdiv1);
            $("#showChatInfo").append($div);

            var div = document.getElementById('showChatInfo');
            div.scrollTop = div.scrollHeight;
        }
    });
};
