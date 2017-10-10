//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //初始化数据
    $scope.srcUrl = "./framework/libraries/Captcha.class.php";

    //用户注册
    $scope.register = function () {
        $http({
            method: "post",
            url: "index.php?c=Register&a=register",
            data: {
                id: $scope.registerId,
                pwd: $scope.registerPwd,
                mailbox: $scope.registerEmail
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data) {
                    alert("注册成功");

                    window.location.href = "./index.php";
                } else {
                    alert("注册失败");
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    //跳转到登录页面
    $scope.toLogin = function () {
        window.location.href = "./index.php";
    }

    //验证注册重名
    $scope.checkRegisterName = function () {
        $scope.checkName = 0;

        if ($scope.registerId == null) {
            $scope.checkName = 1;
        } else {
            var pattern = /^[a-zA-Z0-9_-]+$/;

            if (pattern.test($scope.registerId)) {
                $http({
                    url: "./index.php?c=Register&a=checkRegisterName",
                    method: "post",
                    data: {
                        id: $scope.registerId
                    }
                }).then(
                    function (res) {
                        var data = res.data;

                        if (data == 1) {
                            $scope.checkName = 3;
                        } else {
                            $scope.checkName = 4;
                        }
                    },
                    function (res) {

                    }
                );
            } else {
                $scope.checkName = 2;
            }

        }
    }

    //验证注册密码
    $scope.checkRegisterPwd = function() {
        $scope.checkPwd = 0;

        if ($scope.registerPwd == null) {
            $scope.checkPwd = 1;
        } else {

            var pattern = /^[a-zA-Z0-9_-]+$/;

            if (pattern.test($scope.registerPwd)) {
                $scope.checkPwd = 3;
            } else {
                $scope.checkPwd = 2;
            }
        }
    }

    //验证二次密码
    $scope.checkConfirmPwd = function() {
        $scope.checkConfirm = 0;

        if ($scope.checkConfirmPwd == null) {
            $scope.checkConfirm = 1; 
        } else if ($scope.registerPwd != $scope.confirmPwd) {
            $scope.checkConfirm = 2;
        } else {
            $scope.checkConfirm = 3;
        }
    }

    //验证邮箱
    $scope.checkMailBox = function() {
        $scope.checkMail = 0;

        if ($scope.registerEmail == null) {
            $scope.checkMail = 1;
        } else{
            var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (pattern.test($scope.registerEmail)) {
                $scope.checkMail = 3;
            } else {
                $scope.checkMail = 2;
            }
        }
    }

    //跳转到商城
    $scope.toStore = function () {
        window.location.href = "./index.php?c=Main&a=toMainView";
    }
});