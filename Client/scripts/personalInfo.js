//个人中心页面js

//菜单切换效果
var $menu = $("#menu");
var $menuDetails = $("#menuDetails");

for (var i = 0; i < $menu.children().length; i++) {
    $menu.children().eq(i).attr("order", i);
}

$menu.children().each(function() {
    $(this).click(function() {
        $(this).attr("class", "menuSelected");
        $(this).siblings().attr("class", "menuUnselected");
        $menuDetails.children().eq($(this).attr("order")).show();
        $menuDetails.children().eq($(this).attr("order")).siblings().hide();
    })
})

//判断是否要进入我的订单界面
if (sessionStorage.fromMyOrder == "true") {
    $("#menu").children().eq(2).click();
    sessionStorage.removeItem("fromMyOrder");
}

//连接服务器后获取相关信息
client.onopen = function() {
    console.log("已连接服务器");

    if (sessionStorage.HF170502_nowLogin != undefined) {

        var obj = {
            type: "refreshLoginInfo",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin
            }
        }

        client.send(JSON.stringify(obj));
    }

    var obj = {
        type: "getMyInfo",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin
        }
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getMyAdd",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin
        }
    }

    client.send(JSON.stringify(obj));

    changeNoPay();

    var obj = {
        type: "getNoPayPageNum",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
        }
    }

    client.send(JSON.stringify(obj));

    changePayed();

    var obj = {
        type: "getPayedPageNum",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
        }
    }

    client.send(JSON.stringify(obj));

    changeChatRecord();

    var obj = {
        type: "getChatPageNum",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
        }
    }

    client.send(JSON.stringify(obj));
}

//动态获取未支付订单
var noPayOlPageNow = 0;

function changeNoPay() {
    var obj = {
        type: "getMyNopayOl",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
            pageNow: noPayOlPageNow
        }
    }

    client.send(JSON.stringify(obj));
}

//动态获取已支付订单
var payedOlPageNow = 0;

function changePayed() {
    var obj = {
        type: "getMyPayedOl",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
            pageNow: payedOlPageNow
        }
    }

    client.send(JSON.stringify(obj));
}

//修改昵称挂事件
$("input[value='*修改']:eq(0)").click(function() {
    var val = $(this).parent().prev().children(":eq(0)").val();

    if (isNull(val)) {
        alert("请先输入信息");
    } else {
        var obj = {
            type: "changeNickName",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                nickname: val
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//动态获取商家发来的信息
var chatRecordPageNow = 0;

function changeChatRecord() {
    var obj = {
        type: "getChatRecord",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_nowLogin,
            chatRecordPageNow: chatRecordPageNow
        }
    }

    client.send(JSON.stringify(obj));
}

//修改手机号码挂事件
$("input[value='*修改']:eq(1)").click(function() {
    var val = $(this).parent().prev().children(":eq(0)").val();

    if (isNull(val)) {
        alert("请先输入信息");
    } else if (checkPhoneNum(val)) {
        alert("手机号码格式不对");
    } else {
        var obj = {
            type: "changePhoneNum",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                phoneNum: val
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//修改邮箱信息挂事件
$("input[value='*修改']:eq(2)").click(function() {
    var val = $(this).parent().prev().children(":eq(0)").val();

    if (isNull(val)) {
        alert("请先输入信息");
    } else if (checkMailbox(val)) {
        alert("邮箱格式不对");
    } else {
        var obj = {
            type: "changeMailbox",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                mailbox: val
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//修改默认地址挂事件
$("input[value='*设置为默认地址']").click(function() {
    $restAddress = $("#restAddress");

    if ($restAddress.children("option:selected").text() == "") {
        alert("您还没有选择地址");
    } else {
        var obj = {
            type: "changeAddDefault",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                addId: $restAddress.children("option:selected").attr("idx")
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//新增地址挂事件
$("input[value='新增地址']").click(function() {
    var val = $(this).parent().parent().prev().children(":eq(1)").children(":eq(0)").val();

    if (isNull(val)) {
        alert("请先输入地址信息");
    } else {
        var obj = {
            type: "addNewAdd",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                add: val
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//点击账户充值弹出窗口
$("input[value='账户充值']").click(function() {
    $("#transMask").show();
    $("#recharge").show();
});

//关闭充值界面
$("#recharge").children("input[value='X']").click(function() {
    $("#transMask").hide();
    $("#recharge").hide();
});

//检验充值金额
$("#rechargeAmount").blur(function() {
    var val = $("#rechargeAmount").val();

    if (isNull(val)) {
        $("#rechargeAmount").next().text("*请输入金额");
    } else if (val <= 0) {
        $("#rechargeAmount").next().text("*请输入大于0的金额");
    } else if (val > 100000) {
        $("#rechargeAmount").next().text("*每次充值不大于￥100000");
    } else {
        $("#rechargeAmount").next().text("");
    }
});

//充值按钮挂事件
$("#rechargeBtn").click(function() {
    var val = $("#rechargeAmount").val();

    if (isNull(val) || val <= 0 || val > 100000) {
        $("#rechargeAmount").next().text("*请先检查输入金额");
    } else {
        var obj = {
            type: "recharge",
            sender: "client",
            receiver: "server",
            content: {
                id: sessionStorage.HF170502_nowLogin,
                num: val
            }
        }

        client.send(JSON.stringify(obj));
    }
});

//已支付和未支付菜单切换
$("input[value='未支付']").click(function() {
    $("#nopayOl").show();
    $("#payedOl").hide();
    $("#olNoPayPageBtn").show();
    $("#olPayedPageBtn").hide();
});

$("input[value='已支付']").click(function() {
    $("#nopayOl").hide();
    $("#payedOl").show();
    $("#olNoPayPageBtn").hide();
    $("#olPayedPageBtn").show();
});
