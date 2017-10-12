//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.goodId = goodId;
    $scope.enterComment = "";
    //防爆条插件初始化
    $scope.safetyBar = new SafetyBar("#safetyBar", "#seckillBtn", 356);
    //聊天插件初始化
    $scope.chatForUsers = new ChatForUsers("#chatWithService");

    //发送小心挂事件
    $scope.chatForUsers.sendMsg(function (msg) {
        if ($scope.loginNow == "") {
            var obj = {
                type: "sendMsgToService",
                sender: "tourist",
                receiver: "service",
                content: {
                    content: msg.html()
                }
            }

            client.send(JSON.stringify(obj));
        } else {
            var obj = {
                type: "sendMsgToService",
                sender: $scope.loginNow,
                receiver: "service",
                content: {
                    content: msg.html()
                }
            }

            client.send(JSON.stringify(obj));
        }
    });

    //获取当前登录用户信息
    $scope.getLoginNow = function () {
        $http({
            url: "./index.php?c=Main&a=getLoginNow",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.loginNow = data;
                if ($scope.loginNow != "") {
                    $scope.chatForUsers.changeWho(data);
                }
            }
        );
    }

    $scope.getLoginNow();

    //获取商品详情
    $scope.getGoodDetail = function () {
        $http({
            url: "./index.php?c=goodDetail&a=getGoodDetail",
            method: "post",
            data: {
                goodId: $scope.goodId
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.goodDetail = data[0];
            }
        );
    }

    $scope.getGoodDetail();

    //获取详情图片
    $scope.getDetailImg = function () {
        $http({
            url: "./index.php?c=goodDetail&a=getDetailImg",
            method: "post",
            data: {
                goodId: $scope.goodId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data.length) {
                    $scope.detailImg = data[0].img_path;
                } else {
                    $scope.detailImg = "./application/views/images/noDetail.png";
                }

                setTimeout(function () {
                    $("#aboutGoods").css("height", (parseInt($("#pageDetail").height()) +
                        80) + "px");
                }, 200);
            }
        );
    }

    $scope.getDetailImg();

    //获取购买记录
    $scope.getBuyedRecord = function () {
        $http({
            url: "./index.php?c=goodDetail&a=getBuyedRecord",
            method: "post",
            data: {
                goodId: $scope.goodId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data.length) {
                    $scope.showNoRecord = false;

                    $scope.recordArr = data;
                } else {
                    $scope.showNoRecord = true;
                }
            }
        )
    }

    $scope.getBuyedRecord();

    $scope.getComment = function () {
        $http({
            url: "./index.php?c=goodDetail&a=getComment",
            method: "post",
            data: {
                goodId: $scope.goodId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data.length) {
                    $scope.showComment = false;

                    $scope.commentLen = data.length;
                    $scope.commentArr = data;
                } else {
                    $scope.showComment = true;
                }
            }
        )
    }

    $scope.getComment();

    //添加评论
    $scope.addComment = function () {
        if ($scope.loginNow == "") {
            alert("登录后才可使用评论功能");
        } else if ($scope.enterComment.length < 5 || $scope.enterComment.length > 180) {
            alert("评论长度需要5-180字之间");
        } else {
            $http({
                url: "./index.php?c=goodDetail&a=addComment",
                method: "post",
                data: {
                    goodId: $scope.goodId,
                    content: $scope.enterComment
                }
            }).then(
                function (res) {
                    var data = res.data;

                    if (data == 0) {
                        alert("需要购买（付款后）该商品才可评论");
                    } else if (data == 1) {
                        alert("您已评论过该商品，无法重复评论");
                    } else if (data == 2) {
                        alert("评论成功");

                        $scope.getComment();
                    } else {
                        alert("未知错误");
                    }
                }
            )
        }
    }

    //秒杀功能
    $scope.seckill = function () {
        if ($scope.loginNow == "") {
            alert("请先登录");
        } else {
            var obj = {
                type: "seckill",
                sender: "client",
                receiver: "server",
                content: {
                    id: $scope.loginNow,
                    goodId: $scope.goodId
                }
            }

            client.send(JSON.stringify(obj));
        }
    }
});