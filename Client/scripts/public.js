//公用js代码

//加载防爆条
var bar = new SafetyBar("#bar", "#loginBtn", 264);

//加载用户聊天窗口
var chatForUsers = new ChatForUsers("#chatWithService");

//发送消息挂事件
chatForUsers.sendMsg(function(msg) {
    if (sessionStorage.HF170502_nowLogin == undefined) {
        var obj = {
            type: "sendMsgToservice",
            sender: "tourist",
            receiver: "service",
            content: {
                content: msg.html()
            }
        }

        client.send(JSON.stringify(obj));
    } else {
        var obj = {
            type: "sendMsgToservice",
            sender: sessionStorage.HF170502_nowLogin,
            receiver: "service",
            content: {
                content: msg.html()
            }
        }

        client.send(JSON.stringify(obj));
    }
});

var $transMask = $("#transMask");
var $loginInterface = $("#loginInterface");
var $registerInterface = $("#registerInterface");
var $navA = $(".navA");

//nav导航栏点击效果
$navA.eq(0).click(function() {
    $transMask.show();
    $loginInterface.show();
});

$navA.eq(1).click(function() {
    $transMask.show();
    $registerInterface.show();
});

$loginInterface.children('input[value = "X"]').click(function() {
    $transMask.hide();
    $loginInterface.hide();
});

$registerInterface.children('input[value = "X"]').click(function() {
    $transMask.hide();
    $registerInterface.hide();
});

//注册的各项验证
var $loginId = $("#loginId");
var $loginPwd = $("#loginPwd");
var $loginBtn = $("#loginBtn");

$loginId.blur(function() {
    var val = $loginId.val();

    if (isNull(val)) {
        $loginId.next().html("*请输入用户名");
    } else {
        $loginId.next().html("");
    }
});

$loginPwd.blur(function() {
    var val = $loginPwd.val();

    if (isNull(val)) {
        $loginPwd.next().html("*请输入密码");
    } else {
        $loginPwd.next().html("");
    }
});

$loginBtn.click(function() {
    var val1 = $loginId.val();
    var val2 = $loginPwd.val();

    if (isNull(val1) || isNull(val2)) {
        alert("*用户名或密码输入有误");
    } else {
        var obj = {
            type: "login",
            sender: "client",
            receiver: "server",
            content: {
                id: val1,
                pwd: val2
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//访问个人中心的资格验证
$(".nvaAWithBg").eq(1).click(function(e) {
    if (sessionStorage.HF170502_nowLogin == undefined) {
        e.preventDefault();
        alert("没有登录，无法访问个人中心");
    }
})

$(".nvaAWithBg").eq(2).click(function(e) {
    if (sessionStorage.HF170502_nowLogin == undefined) {
        e.preventDefault();
        alert("没有登录，无法访问我的订单");
    }
})

//点击图片弹出聊天窗口
$("#floatLogo").click(function() {
    $("#chatWithService").toggle();
});

//登录的各项验证
function logined(id) {
    $("#showName").show();
    $("#showName").html("当前登录用户：" + id);
}

var $registerId = $("#registerId");
var $registerPwd = $("#registerPwd");
var $confirmPwd = $("#confirmPwd");
var $mailbox = $("#mailbox");
var $registerBtn = $("#registerBtn");

$registerId.blur(function() {
    checkRegisterId();
});

$registerPwd.blur(function() {
    checkRegisterPwd();
});

$confirmPwd.blur(function() {
    checkConfirmPwd();
});

$mailbox.blur(function() {
    checkMailAdd();
});

$registerBtn.click(function() {
    if (checkRegisterId() && checkRegisterPwd() && checkConfirmPwd() && checkMailAdd()) {
        var obj = {
            type: "register",
            sender: "client",
            receiver: "server",
            content: {
                id: $registerId.val(),
                pwd: $registerPwd.val(),
                mailbox: $mailbox.val()
            }
        }

        client.send(JSON.stringify(obj));
    } else {
        alert("请检查您的注册信息");
    }
});

//各项正则验证
function checkRegisterId() {
    var val = $registerId.val();
    $registerId.next().removeAttr("style");

    if (isNull(val)) {
        $registerId.next().html("*请输入用户名");
    } else if (checkName(val)) {
        $registerId.next().html("*用户名应由字母、数字和下划线组成");
    } else if (val.length > 10 || val.length < 6) {
        $registerId.next().html("*用户名为6-10位");
    } else {
        var obj = {
            type: "checkRegisterId",
            sender: "client",
            receiver: "server",
            content: {
                id: val
            }
        }

        client.send(JSON.stringify(obj));

        return true;
    }
};

function checkRegisterPwd() {
    var val = $registerPwd.val();
    $registerPwd.next().removeAttr("style");

    if (isNull(val)) {
        $registerPwd.next().html("*请输入密码");
    } else if (checkPassword(val)) {
        $registerPwd.next().html("*密码应由字母或数字组成");
    } else if (val.length > 15 || val.length < 6) {
        $registerPwd.next().html("*密码为6-15位");
    } else {
        $registerPwd.next().html("*密码验证通过");
        $registerPwd.next().css("color", "green");
        return true;
    }
}

function checkConfirmPwd() {
    var val1 = $registerPwd.val();
    var val2 = $confirmPwd.val();
    $confirmPwd.next().removeAttr("style");

    if (isNull(val2)) {
        $confirmPwd.next().html("*请输入确认密码");
    } else if (val1 != val2) {
        $confirmPwd.next().html("*两次密码输入不一致");
    } else {
        $confirmPwd.next().html("*确认密码验证成功");
        $confirmPwd.next().css("color", "green");
        return true;
    }
}

function checkMailAdd() {
    var val = $mailbox.val();
    $mailbox.next().removeAttr("style");

    if (isNull(val)) {
        $mailbox.next().html("*请输入邮箱");
    } else if (checkMailbox(val)) {
        $mailbox.next().html("*邮箱格式有误");
    } else {
        $mailbox.next().html("*邮箱验证通过");
        $mailbox.next().css("color", "green");
        return true;
    }
}

function isNull(str) { //检验输入是否为空
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

function checkName(str) { //检验用户名是否由字母、数字和下划线组成
    var regu = /^[a-zA-Z0-9_]+$/;
    var re = new RegExp(regu);
    if (re.test(str)) {
        return false;
    } else {
        return true;
    }
}

function checkPassword(str) { //检验密码是否由字母或数字组成
    var regu = /^[a-zA-Z0-9]+$/;
    var re = new RegExp(regu);
    if (re.test(str)) {
        return false;
    } else {
        return true;
    }
}

function checkMailbox(str) { //检验邮箱格式
    var regu = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var re = new RegExp(regu);
    if (re.test(str)) {
        return false;
    } else {
        return true;
    }
}

function checkPhoneNum(str) { //检验手机号码
    var regu = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;

    var re = new RegExp(regu);
    if (re.test(str)) {
        return false;
    } else {
        return true;
    }
}
