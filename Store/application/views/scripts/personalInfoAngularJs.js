//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.newAdd = '';
    $scope.scPageNow = 0;
    $scope.npPageNow = 0;
    $scope.pdPageNow = 0;
    $scope.recharge = 0;
    //聊天插件初始化
    $scope.chatForUsers = new ChatForUsers("#chatWithService");

    //发送消息初始化
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

    //获取当前登录
    $scope.getLoginNow = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getLoginNow",
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

    //获取当前登录用户信息
    $scope.getloginNowInfo = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getLoginNowInfo",
            method: "get"
        }).then(
            function (res) {
                var data = res.data[0];

                $scope.userId = data.user_id;
                $scope.nickname = data.nick_name;
                $scope.phoneNum = data.phone_num;
                $scope.mailbox = data.mailbox;
            }
        );
    }

    $scope.getloginNowInfo();

    //获取地址信息
    $scope.getAddress = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getAddress",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                var arr = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].is_default == 1) {
                        $scope.defaultAdd = data[i].addr;
                    } else {
                        arr.push(data[i]);
                    }
                }

                $scope.addArr = arr;

                if (arr.length != 0) {
                    $scope.addSelect = arr[0].address_id;
                }
            }
        );
    }

    $scope.getAddress();

    //获取购物车信息
    $scope.getSc = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getSc",
            method: "post",
            data: {
                scPageNow: $scope.scPageNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.scArr = data;
            }
        );
    }

    $scope.getSc();

    //获取购物车
    $scope.getScNum = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getScNum",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                var pageNum = Math.ceil(data / 3);

                var arr = [];

                for (var i = 0; i < pageNum; i++) {
                    arr.push(i);
                }

                $scope.scBtnArr = arr;
            }
        );
    }

    $scope.getScNum();

    //修改购物车当前页
    $scope.changeScPageNow = function (x) {
        $scope.scPageNow = x;

        $scope.getSc();
    }

    //修改默认地址
    $scope.changeDefaultAdd = function () {
        if ($scope.addArr.length == 0) {
            alert("请先添加地址");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=changeDefaultAdd",
                method: "post",
                data: {
                    addressId: $scope.addSelect
                }
            }).then(
                function (res) {
                    var data = res.data;

                    if (data) {
                        alert("修改成功");

                        $scope.getAddress();
                    } else {
                        alert("修改失败");
                    }
                }
            );
        }
    }

    //添加地址
    $scope.addAdd = function () {
        if ($scope.newAdd.length == 0) {
            alert("请输入地址");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=addAdd",
                method: "post",
                data: {
                    addr: $scope.newAdd
                }
            }).then(
                function (res) {
                    var data = res.data;

                    if (data) {
                        alert("添加成功");

                        $scope.newAdd = "";

                        $scope.getAddress();
                    } else {
                        alert("添加失败");
                    }
                }
            );
        }
    }

    //修改昵称
    $scope.changeNickname = function () {
        if ($scope.nickname.length == 0 || $scope.nickname.length > 5) {
            alert("昵称需在1-5个字之间");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=changeNickname",
                method: "post",
                data: {
                    nickname: $scope.nickname
                }
            }).then(
                function (res) {
                    alert("修改成功");
                }
            );
        }
    }

    //修改电话号码
    $scope.changePhoneNum = function () {
        var pattern = /^[0-9]*$/;

        if ($scope.phoneNum.length != 11 || !pattern.test($scope.phoneNum)) {
            alert("电话号码格式不对");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=changePhoneNum",
                method: "post",
                data: {
                    phoneNum: $scope.phoneNum
                }
            }).then(
                function (res) {
                    alert("修改成功");
                }
            );
        }
    }

    //修改邮箱
    $scope.changeMailbox = function () {
        var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

        if (!pattern.test($scope.mailbox)) {
            alert("邮箱格式不对");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=changeMailbox",
                method: "post",
                data: {
                    mailbox: $scope.mailbox
                }
            }).then(
                function (res) {
                    alert("修改成功");
                }
            );
        }
    }

    //添加至订单
    $scope.addToOl = function (scId, goodId) {
        $http({
            url: "./index.php?c=PersonalInfo&a=addToOl",
            method: "post",
            data: {
                scId: scId,
                goodId: goodId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 1) {
                    alert("请先去添加地址，才可建立订单");
                } else if (data == 2) {
                    alert("订单生成成功");

                    $scope.scPageNow = 0;

                    $scope.getSc();
                } else if (data == 3) {
                    alert("订单生成失败");
                }
            }
        );
    }

    //从购物车中删除
    $scope.deleteFromSc = function (scId) {
        $http({
            url: "./index.php?c=PersonalInfo&a=deleteFromSc",
            method: "post",
            data: {
                scId: scId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 1) {
                    alert("删除成功");

                    $scope.scPageNow = 0;

                    $scope.getSc();
                } else if (data == 2) {
                    alert("删除失败");
                } else {
                    alert("未知错误");
                }
            }
        );
    }

    //获取未支付订单
    $scope.getNoPayOl = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getNoPayOl",
            method: "post",
            data: {
                npPageNow: $scope.npPageNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.noPayArr = data;
            }
        );
    }

    $scope.getNoPayOl();

    //获取未支付订单数量
    $scope.getNoPayOlNum = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getNoPayOlNum",
            method: "get"
        }).then(function (res) {
            var data = res.data;
            var pageNum = Math.ceil(data / 3);
            var arr = [];

            for (var i = 0; i < pageNum; i++) {
                arr.push(i);
            }

            $scope.npBtnArr = arr;
        });
    }

    $scope.getNoPayOlNum();

    //修改未支付订单当前页
    $scope.changeNpPageNow = function (x) {
        $scope.npPageNow = x;

        $scope.getNoPayOl();
    }

    //订单支付
    $scope.payOl = function (orderListId, postType) {
        $http({
            url: "./index.php?c=PersonalInfo&a=payOl",
            method: "post",
            data: {
                orderListId: orderListId,
                postType: postType
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 1) {
                    alert("余额不足 请充值");
                } else if (data == 2) {
                    alert("支付成功");

                    $scope.npPageNow = 0;

                    $scope.getNoPayOl();
                }
            }
        );
    }

    //删除订单
    $scope.deleteOl = function (orderListId) {
        $http({
            url: "./index.php?c=PersonalInfo&a=deleteOl",
            method: "post",
            data: {
                orderListId: orderListId
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data) {
                    alert("订单取消成功");

                    $scope.npPageNow = 0;

                    $scope.getNoPayOl();
                } else {
                    alert("订单取消失败");
                }
            }
        );
    }

    //获取已支付订单
    $scope.getPayedOl = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getPayedOl",
            method: "post",
            data: {
                pdPageNow: $scope.pdPageNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.payedArr = data;
            }
        );
    }

    $scope.getPayedOl();

    //获取已支付订单数量
    $scope.getPayedOlNum = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getPayedOlNum",
            method: "get"
        }).then(function (res) {
            var data = res.data;
            var pageNum = Math.ceil(data / 3);
            var arr = [];

            for (var i = 0; i < pageNum; i++) {
                arr.push(i);
            }

            $scope.pdBtnArr = arr;
        });
    }

    $scope.getPayedOlNum();

    //修改已支付订单当前页
    $scope.changePdPageNow = function (x) {
        $scope.pdPageNow = x;

        $scope.getPayedOl();
    }

    //跳转到主页面
    $scope.toMainView = function () {
        window.location.href = "./index.php?c=Main&a=toMainView";
    }

    //获取余额
    $scope.getBalance = function () {
        $http({
            url: "./index.php?c=PersonalInfo&a=getBalance",
            method: "get"
        }).then(function (res) {
            var data = res.data;

            $scope.balance = data;
        });
    }

    $scope.getBalance();

    //余额充值
    $scope.addRecharge = function () {
        if ($scope.recharge < 0) {
            alert("需要输入大于0的数");
        } else {
            $http({
                url: "./index.php?c=PersonalInfo&a=addRecharge",
                method: "post",
                data: {
                    recharge: $scope.recharge
                }
            }).then(function (res) {
                    var data = res.data;

                    if (data == 1) {
                        alert("充值成功");

                        $scope.getBalance();
                    } else {
                        alert("充值失败");
                    }
                }
            );
        }
    }
});