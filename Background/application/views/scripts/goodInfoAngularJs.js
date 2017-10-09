var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.classifySelect = "0";
    $scope.statusSelect = "0";
    $scope.pageNow = 0;
    $scope.showDetail = false;
    $scope.changeDetail = false;

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
            },
            function () {
                alert("未知错误");
            }
        );
    }

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

                console.log($scope.goodArr);
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.infoChange = function () {
        $scope.getGoodNum();

        $scope.pageNow = 0;

        $scope.showGood();
    }

    $scope.infoChange();

    $scope.pageNowFunc = function (i) {
        $scope.pageNow = i;
        $scope.showGood();
    }

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
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.showGoodDetail = function (id) {
        $scope.showDetail = !$scope.showDetail;
        $scope.changeDetail = false;

        if ($scope.showDetail) {
            $scope.oneGoodDetail(id);
        }
    }

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
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.changeDetailIf = function (id) {
        $scope.changeDetail = !$scope.changeDetail;
        $scope.showDetail = false;

        if ($scope.changeDetail) {
            $scope.oneGoodDetail(id);
        }
    }

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
            },
            function () {
                alert("未知错误");
            }
        );
    }
});