//倒计时控件
var backTime = new BackTime("#backTimeClock", new Date().getTime(), new Date().getTime() + 3800000);

var classifyNow = "all";
var timeQuantumNow = "tq4";
var timeSelectedNow = 3;
var pagination = 0;

//连接服务器后更新相关信息
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
        type: "getBannerImg",
        sender: "client",
        receiver: "server",
        content: {}
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getlastetOl",
        sender: "client",
        receiver: "server",
        content: {}
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getClassify",
        sender: "client",
        receiver: "server",
        content: {}
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getTimeQuantum",
        sender: "client",
        receiver: "server",
        content: {}
    }

    client.send(JSON.stringify(obj));
}

//获取商品信息
function changeGoods() {
    var obj = {
        type: "getGoodInfo",
        sender: "client",
        receiver: "server",
        content: {
            timeQuantumId: timeQuantumNow,
            classifyId: classifyNow,
            pagination: pagination
        }
    }

    client.send(JSON.stringify(obj));

    var obj = {
        type: "getPageNum",
        sender: "client",
        receiver: "server",
        content: {
            timeQuantumId: timeQuantumNow,
            classifyId: classifyNow,
        }
    }

    client.send(JSON.stringify(obj));
}

//获取倒计时信息
function changeBackTime() {
    var obj = {
        type: "getBackTime",
        sender: "client",
        receiver: "server",
        content: {
            timeQuantumId: timeQuantumNow
        }
    }

    client.send(JSON.stringify(obj));
}
