//商品详情页面js

//加载防爆条控件
var safetyBar = new SafetyBar("#safetyBar", "#seckillBtn", 356);

var $btnList = $("#btnList");
var $aboutGoods = $("#aboutGoods");

//加载等待页面小游戏
var canvasGame = new CanvasGame("canvas");

//菜单切换挂事件
for (var i = 0; i < $btnList.children().length; i++) {
    $btnList.children().eq(i).attr("idx", i);
    $btnList.children().eq(i).click(function() {
        $aboutGoods.children().eq($(this).attr("idx")).show();
        $aboutGoods.children().eq($(this).attr("idx")).siblings().hide();
        $(this).attr("class", "btnSelected");
        $(this).siblings().attr("class", "btnUnselected");

        setTimeout(function() {
            $("#aboutGoods").css("height", (parseInt($aboutGoods.children().eq($(this).attr("idx")).height()) + 80) + "px");
        }.bind(this), 10);
    });
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
        type: "getGoodDetails",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_goodNow
        }
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getGoodImgs",
        sender: "client",
        receiver: "server",
        content: {
            id: sessionStorage.HF170502_goodNow
        }
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getBuyedRecords",
        sender: "client",
        receiver: "server",
        content: {
            id:sessionStorage.HF170502_goodNow
        }
    }

    client.send(JSON.stringify(obj));

    changeComment();
    addCommentBtn();
}

//动态修改评论列表
var commentPageNow = 0;

function changeComment () {
    var obj = {
        type: "getComment",
        sender: "client",
        receiver: "server",
        content: {
            id:sessionStorage.HF170502_goodNow,
            pageNow: commentPageNow
        }
    }

    client.send(JSON.stringify(obj));
}

//动态修改评论分页按钮
function addCommentBtn() {
    var obj = {
        type: "getCommentPageNum",
        sender: "client",
        receiver: "server",
        content: {
            id:sessionStorage.HF170502_goodNow
        }
    }

    client.send(JSON.stringify(obj));
}

//秒杀按钮挂事件
$seckillBtn = $("#seckillBtn");
$seckillBtn.click(function() {
    if (sessionStorage.HF170502_nowLogin == undefined) {
        alert("请先登录");
    } else {
        var obj = {
            type: "secKill",
            sender: "client",
            receiver: "server",
            content: {
                loginId: sessionStorage.HF170502_nowLogin,
                goodId: sessionStorage.HF170502_goodNow
            }
        }

        client.send(JSON.stringify(obj));

        $("#waitingInterface").show();
        $("#transMask").show();
    }
});

//发表评论按钮挂事件
$("input[value='发表评论']").click(function() {
    var val = $(this).prev().text();

    if (sessionStorage.HF170502_nowLogin == undefined) {
        alert("请先登录");
    } else {
        var obj = {
            type: "sendComment",
            sender: "client",
            receiver: "server",
            content: {
                id:sessionStorage.HF170502_nowLogin,
                goodId:sessionStorage.HF170502_goodNow,
                comment:val
            }
        }

        client.send(JSON.stringify(obj));
    }
});
