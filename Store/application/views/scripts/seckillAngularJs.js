//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.classifyNow = 0;
    $scope.pageNow = 0;
    $scope.timeQuantumNow = 4;
    $scope.timeSelectNow = 3;
    $scope.backTime = new BackTime("#backTimeClock", new Date().getTime(), new Date().getTime());
    //加载用户聊天窗口
    $scope.chatForUsers = new ChatForUsers("#chatWithService");

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

    //获取banner图片
    $scope.getBannerImg = function () {
        $http({
            url: "./index.php?c=Main&a=getBannerImg",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                $scope.sliderImgArr = [];

                for (var i = 0; i < data.length; i++) {
                    $scope.sliderImgArr.push(data[i].banner_img_path);
                }

                var slider = new BannerSlider("#bannerSlider", "#previousPageBtn",
                    "#nextPageBtn", "#sliderDot", 980, $scope.sliderImgArr);

                slider.addDot(
                    "sliderDotUnselected", "sliderDotSelected");

                slider.autoSlider();
            }
        );
    }

    $scope.getBannerImg();

    //获取分类信息
    $scope.getClassify = function () {
        $http({
            url: "./index.php?c=Main&a=getClaasify",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.classifyArr = data;
            }
        );
    }

    $scope.getClassify();

    //修改当前分类
    $scope.changeClassify = function (classify_id) {
        $scope.classifyNow = classify_id;
        $scope.pageNow = 0;

        $scope.getGoodNum();
        $scope.getGood();
    }

    //获取商品信息
    $scope.getGood = function () {
        $http({
            url: "./index.php?c=Seckill&a=getGood",
            method: "post",
            data: {
                classifyId: $scope.classifyNow,
                pageNow: $scope.pageNow,
                timeIntervalId: $scope.timeQuantumNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.goodArr = data;
            }
        );
    }

    //获取商品数量
    $scope.getGoodNum = function () {
        $http({
            url: "./index.php?c=Seckill&a=getGoodNum",
            method: "post",
            data: {
                classifyId: $scope.classifyNow,
                timeIntervalId: $scope.timeQuantumNow
            }
        }).then(
            function (res) {
                var data = res.data;

                var pageNum = Math.ceil(data / 4);

                $scope.inputArr = [];

                for (var i = 0; i < pageNum; i++) {
                    $scope.inputArr.push(i);
                }
            }
        );
    }

    //修改当前页
    $scope.changePageNow = function (pageNow) {
        $scope.pageNow = pageNow;

        $scope.getGood();
    }

    //获取荣誉墙信息
    $scope.getHonor = function () {
        $http({
            url: "./index.php?c=Main&a=getHonor",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.honorArr = data;

                setTimeout(function () {
                    var $showHonors = $("#showHonors");

                    if ($showHonors.children().length > 11) {
                        $showHonors.children().clone().appendTo($showHonors);
                        var showHonorsTop = 0;
                        var timer3 = setInterval(function () {
                            showHonorsTop -= 1;
                            if (parseInt($showHonors.css("top")) <= -
                                parseInt($showHonors.css("height")) / 2) {
                                showHonorsTop = 0;
                            }

                            $showHonors.css("top", showHonorsTop + "px");
                        }, 15);
                    }
                }, 100);
            }
        );
    }

    $scope.getHonor();

    //跳转到详情页面
    $scope.toSeckillGoodDetail = function (good_id) {
        window.location.href = "./index.php?c=SeckillGoodDetail&a=toSeckillGoodDetailView&g=" + good_id;
    }

    $scope.getTimeInterval = function () {
        $http({
            url: "./index.php?c=Seckill&a=getTimeInterval",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.tiArr = data;

                $(function () {
                    $scope.timeQuantum = new TimeQuantum("#timeQuantum", $scope.timeSelectNow);

                    $("#timeQuantum").children("input").eq(0).click(function () {

                        if ($scope.timeSelectNow > 0) {
                            $scope.timeSelectNow--;
                            $scope.timeQuantumNow = parseInt($scope.timeSelectNow) + 1;

                            $scope.timeSelectChange();
                        }
                    })

                    $(".timeQuantumTab").each(function () {
                        $(this).click(function () {
                            $scope.timeSelectNow = $(this).attr("idx");
                            $scope.timeQuantumNow = parseInt($scope.timeSelectNow) + 1;

                            $scope.timeSelectChange();
                        });
                    });

                    $("#timeQuantum").children("input").eq(1).click(function () {

                        if ($scope.timeSelectNow < 8) {
                            $scope.timeSelectNow++;
                            $scope.timeQuantumNow = parseInt($scope.timeSelectNow) + 1;

                            $scope.timeSelectChange();
                        }
                    })
                });
            }
        );
    }

    $scope.getTimeIntervalNow = function () {
        $http({
            url: "./index.php?c=Seckill&a=getTimeIntervalNow",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                if (data == "noSeckill") {
                    $scope.timeSelectNow = 0;
                    $scope.timeQuantumNow = 1;
                } else {
                    $scope.timeSelectNow = data;
                    $scope.timeQuantumNow = parseInt(data) + 1;
                }

                $scope.getTimeInterval();
                $scope.timeSelectChange();
            }
        );
    }

    $scope.getTimeIntervalNow();

    $scope.getBackTime = function () {
        $http({
            url: "./index.php?c=Seckill&a=getBackTime",
            method: "post",
            data: {
                timeQuantumNow: $scope.timeQuantumNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.btRes = data;

                $scope.backTime.changeTime(data.time);
            }
        );
    }

    $scope.timeSelectChange = function () {
        $scope.pageNow = 0;

        $scope.getBackTime();
        $scope.getGoodNum();
        $scope.getGood();
    }
});