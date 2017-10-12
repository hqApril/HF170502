//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.classifyNow = 0;
    $scope.pageNow = 0;
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
            },
            function (res) {
                alert("未知错误");
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
            },
            function () {
                alert("未知错误");
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
            },
            function () {
                alert("未知错误");
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
            url: "./index.php?c=Main&a=getGood",
            method: "post",
            data: {
                classifyId: $scope.classifyNow,
                pageNow: $scope.pageNow
            }
        }).then(function (res) {
            var data = res.data;

            $scope.goodArr = data;
        }, function () {
            alert("未知错误");
        });
    }

    $scope.getGood();

    //获取商品数量
    $scope.getGoodNum = function () {
        $http({
            url: "./index.php?c=Main&a=getGoodNum",
            method: "post",
            data: {
                classifyId: $scope.classifyNow
            }
        }).then(
            function (res) {
                var data = res.data;

                var pageNum = Math.ceil(data / 4);

                $scope.inputArr = [];

                for (var i = 0; i < pageNum; i++) {
                    $scope.inputArr.push(i);
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.getGoodNum();

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
        }).then(function (res) {
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
        });
    }

    $scope.getHonor();

    //跳转到详情页面
    $scope.toGoodDetail = function (good_id) {
        window.location.href = "./index.php?c=goodDetail&a=toGoodDetailView&g=" + good_id;
    }
});