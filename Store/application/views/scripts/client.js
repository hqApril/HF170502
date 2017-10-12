//客户端收到WS服务器数据处理

//连接服务器
var client = new WebSocket("ws://localhost:8181");

client.onmessage = function (msg) {
    var msgObj = JSON.parse(msg.data);

    if (msgObj.type == "seckill") {
        if (msgObj.content.res == 0) {
            alert("请先添加默认地址");
        } else if (msgObj.content.res == 1) {
            alert("非秒杀时间段产品");
        } else if (msgObj.content.res == 2) {
            alert("商品已被秒杀完");
        } else if (msgObj.content.res == 3) {
            alert("您已秒杀过该商品");
        } else if (msgObj.content.res == 4) {
            alert("秒杀成功");

            $.ajax({
                url: "./index.php?c=SeckillGoodDetail&a=addToOl&goodId=" + msgObj.content.goodId,
                type: "get",
                dataType: "text",
                success: function (res) {
                    console.log(res);
                }
            });
        }
    } else if (msgObj.type == "noService") {
        alert("暂无客服在线");
    } else if (msgObj.type == "sendMsgToClient") {
        var $div = $("<div class='oneMsg'></div>");
        var $p = $("<p>客服" + msgObj.sender + "</p>");
        var $sdiv1 = $("<div>" + msgObj.content.content + "</div>");

        $div.append($p, $sdiv1);
        $("#showChatInfo").append($div);

        var div = document.getElementById('showChatInfo');
        div.scrollTop = div.scrollHeight;
    }
}

client.onopen = function () {
    console.log("已连接ws服务器");
}