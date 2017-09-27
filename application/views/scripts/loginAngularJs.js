var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {


    $scope.srcUrl = "./framework/libraries/Captcha.class.php";

    $scope.flushCode = function() {
        $scope.srcUrl = "./framework/libraries/Captcha.class.php?c=" + Math.random();
    }

    $scope.login = function() {
        $http({
            method: "post",
            url: "index.php?c=Login&a=login",
            data: {
                employeeId: $scope.loginId,
                employeePwd: $scope.loginPwd
            }
        }).then(
            function(res) {
                console.log(res.data);
            },
            function() {

            }
        );
    }
});