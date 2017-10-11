//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.classifyNow = 0;
    $scope.pageNow = 0;

    //获取当前登录用户信息
    $scope.getLoginNow = function () {
        $http({
            url: "./index.php?c=Main&a=getLoginNow",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.loginNow = data;
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
        }, function () {
            alert("未知错误");
        });
    }

    $scope.getHonor();

    //跳转到详情页面
    $scope.toGoodDetail = function (good_id) {
        window.location.href = "./index.php?c=goodDetail&a=toGoodDetailView&g=" + good_id;
    }












    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    $scope.timeQuantumNow = 4;
    $scope.timeSelectNow = 3;

    $scope.getTimeInterval = function () {
        $http({
            url: "./index.php?c=Seckill&a=getTimeInterval",
        }).then(
            function (res) {
                var data = res.data;

                $scope.tiArr = data;

                $(function () {
                    $scope.timeQuantum = new TimeQuantum("#timeQuantum", $scope.timeSelectNow);

                    $("#timeQuantum").children("input").eq(0).click(function () {

                        if ($scope.timeSelectNow > 0) {
                            $scope.timeSelectNow--;
                            $scope.timeQuantumNow = $scope.timeSelectNow + 1;
                        }
                    })

                    $(".timeQuantumTab").each(function () {
                        $(this).click(function () {
                            $scope.timeSelectNow = $(this).attr("idx");
                            $scope.timeQuantumNow = $scope.timeSelectNow + 1;
                        });
                    });

                    $("#timeQuantum").children("input").eq(1).click(function () {

                        if ($scope.timeSelectNow < 8) {
                            $scope.timeSelectNow++;
                            $scope.timeQuantumNow = $scope.timeSelectNow + 1;
                        }
                    })
                });
            },
            function () {

            }
        );
    }

    $scope.getTimeIntervalNow = function() {
        $http({
            url: "./index.php?c=Seckill&a=getTimeIntervalNow",
        }).then(
            function(res) {
                var data = res.data;

                if (data == "noSeckill") {
                    $scope.timeSelectNow = 0;
                    $scope.timeQuantumNow = 1;
                } else {
                    $scope.timeSelectNow = data;
                    $scope.timeQuantumNow = data + 1; 
                }
                
                $scope.getTimeInterval();
            },
            function() {

            }
        );
    }

    $scope.getTimeIntervalNow();

    $scope.getBackTime = function() {
        a
    }
});