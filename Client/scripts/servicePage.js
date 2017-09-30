//客服页面js

var $loginBtn = $("#loginBtn");
var $loginId = $("#loginId");
var $loginPwd = $("#loginPwd");
var $loginBtn = $("#loginBtn");

//登录的各项验证
$loginId.blur(function() {
    var val = $loginId.val();

    if (isNull(val)) {
        $loginId.next().html("*请输入账号");
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
            type: "serviceLogin",
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

//客服聊天页面插件
var chatForService = new ChatForService("#content");

//正则验证表达式
function isNull(str) { //检验输入是否为空
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
