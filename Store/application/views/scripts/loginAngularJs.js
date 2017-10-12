//创建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
    //初始化数据
    $scope.loginId = "hf170502";
    $scope.loginPwd = "12345678";
    $scope.srcUrl = "./framework/libraries/Captcha.class.php";

    //验证码刷新
    $scope.flushCode = function() {
        $scope.srcUrl = "./framework/libraries/Captcha.class.php?c=" + Math.random();
    }

    //用户登录
    $scope.login = function() {
        $http({
            method: "post",
            url: "index.php?c=Login&a=login",
            data: {
                userId: $scope.loginId,
                userPwd: $scope.loginPwd,
                loginCaptcha: $scope.loginCaptcha
            }
        }).then(
            function(res) {
                var data = res.data;

                if (data == 0) {
                    alert("验证码错误");
                } else if (data == 1) {
                    alert("登录成功");

                    window.location.href = "index.php?c=main&a=toMainView";
                } else if (data == 2) {
                    alert("账号已锁定，无法登录");
                } else if (data == 3) {
                    alert("账号或密码不对");
                } else {
                    alert("未知错误");
                }

                $scope.flushCode();
            }
        );
    }

    //跳转到注册页面
    $scope.toRegister = function () {
        window.location.href = "./index.php?c=Register&a=toRegisterView";
    }

    //跳转到商城
    $scope.toStore = function () {
        window.location.href = "./index.php?c=Main&a=toMainView";
    }
});