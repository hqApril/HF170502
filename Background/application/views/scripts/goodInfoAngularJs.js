//新建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //数据初始化
    $scope.classifySelect = "0";
    $scope.statusSelect = "0";
    $scope.pageNow = 0;
    $scope.showDetail = false;
    $scope.changeDetail = false;

    //获取商品数量
    $scope.getGoodNum = function () {
        $http({
            url: "./index.php?c=Main&a=getGoodNum",
            method: "post",
            data: {
                classifyId: $scope.classifySelect,
                goodStatus: $scope.statusSelect,
                inquireInfo: $scope.inquireInfo
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.pageNum = Math.ceil(data / 4);

                var arr = [];

                for (var i = 0; i < $scope.pageNum; i++) {
                    arr.push(i);
                }

                $scope.inputArr = arr;
            }
        );
    }

    //获取当前页商品信息
    $scope.showGood = function () {
        $http({
            url: "./index.php?c=Main&a=showGood",
            method: "post",
            data: {
                classifyId: $scope.classifySelect,
                goodStatus: $scope.statusSelect,
                inquireInfo: $scope.inquireInfo,
                pageNow: $scope.pageNow
            }
        }).then(
            function (res) {
                var data = res.data;

                $scope.goodArr = data;
            }
        );
    }

    //当前类别发生改变时获取对应商品
    $scope.infoChange = function () {
        $scope.getGoodNum();

        $scope.pageNow = 0;

        $scope.showGood();
    }

    $scope.infoChange();

    //修改当前页码
    $scope.pageNowFunc = function (i) {
        $scope.pageNow = i;
        $scope.showGood();
    }

    //修改商品状态
    $scope.changeGoodStatus = function (id) {
        $http({
            url: "./index.php?c=Main&a=changeGoodStatus",
            method: "post",
            data: {
                id: id
            }
        }).then(
            function (res) {
                alert("状态修改成功");

                $scope.infoChange();
            }
        );
    }

    //商品详情页面显示
    $scope.showGoodDetail = function (id) {
        $scope.showDetail = !$scope.showDetail;
        $scope.changeDetail = false;

        if ($scope.showDetail) {
            $scope.oneGoodDetail(id);
        }
    }

    //获取某一商品详情
    $scope.oneGoodDetail = function (id) {
        $http({
            url: "./index.php?c=Main&a=getOneGood",
            method: "post",
            data: {
                id: id
            }
        }).then(
            function (res) {
                var data = res.data[0];

                $scope.gId = data.good_id;
                $scope.gName = data.good_name;
                $scope.gOriginalPrice = parseFloat(data.original_price);
                $scope.gDiscountPrice = parseFloat(data.discount_price);
                $scope.gLimit = parseInt(data.good_limit);
                $scope.gRest = parseInt(data.good_rest);
                $scope.gPostType = data.post_type;
                $scope.gStatus = data.good_status;
                $scope.gClassifyName = data.classify_name;
                $scope.gSummary = data.good_summary;
                $scope.gPostTime = data.post_time;
            }
        );
    }

    //显示详情页面
    $scope.changeDetailIf = function (id) {
        $scope.changeDetail = !$scope.changeDetail;
        $scope.showDetail = false;

        if ($scope.changeDetail) {
            $scope.oneGoodDetail(id);
        }
    }

    //修改商品信息
    $scope.changeDetailFunc = function () {
        $http({
            url: "./index.php?c=Main&a=changeDetail",
            method: "post",
            data: {
                id: $scope.gId,
                goodName: $scope.gName,
                originalPrice: $scope.gOriginalPrice,
                discountPrice: $scope.gDiscountPrice,
                goodRest: $scope.gRest,
                goodLimit: $scope.gLimit,
                goodSummary: $scope.gSummary
            }
        }).then(
            function (res) {
                $scope.changeDetail = false;

                alert("修改成功");

                $scope.infoChange();
            }
        );
    }
});