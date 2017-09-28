var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.getInfo = function () {
        $http({
            url: "./index.php?c=Main&a=getInfo",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                $scope.userName = data[0].employee_name;
                $scope.userRole = data[0].role_name;
                $scope.srcUrl = data[0].employee_img;
            },
            function (res) {
                console.log("res");
            }
        );
    }

    $scope.getInfo();

    $scope.getMenu = function () {
        $http({
            url: "./index.php?c=Main&a=getMenu",
            method: "get"
        }).then(
            function (res) {

            },
            function () {

            }
        );
    }

    $scope.exitLogin = function () {
        $http({
            url: "./index.php?c=Main&a=exitLogin",
            method: "get"
        }).then(
            function (res) {
                alert("成功退出");

                window.location.href = "./index.php";
            },
            function () {
                alert("退出发生未知错误");
            }
        );
    }
});