//新建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http, $element) {
    //获取用户信息
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
                alert("未知错误");
            }
        );
    }

    $scope.getInfo();

    //获取菜单列表
    $scope.getMenu = function () {
        $http({
            url: "./index.php?c=Main&a=getMenu",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                $scope.menuArr = data;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].menu_fid != 0) {
                        break;
                    }
                }

                $scope.iframeUrl = data[i].url;
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.getMenu();

    //退出登录
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

    //父菜单点击隐藏子菜单
    $scope.fMenuClick = function (event) {
        $(event.target).next().toggle(200);
    }

    //子菜单点击修改iframe地址
    $scope.sMenuClick = function (url) {
        $scope.iframeUrl = url;
    }
});