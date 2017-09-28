var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.addRoleIf = false;

    $scope.getRole = function () {
        $http({
            url: "./index.php?c=Main&a=getRole",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                $scope.roleArr = data;
            },
            function (res) {

            }
        );
    }

    $scope.getRole();

    $scope.addRole = function () {
        $http({
            url: "./index.php?c=Main&a=addRole",
            method: "post",
            data: {
                name: $scope.name,
                describe: $scope.describe
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("该角色已存在");
                } else if (data == 1) {
                    alert("添加成功");

                    window.location.reload();
                } else if (data == 2) {
                    alert("插入失败");
                }
            },
            function (res) {
                alert("未知错误");
            }
        );
    }

    $scope.deleteRole = function(id) {
        $http({
            url: "./index.php?c=Main&a=deleteRole",
            method: "post",
            data: {
                id: id
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("该角色已分配员工，无法删除");
                } else if (data == 1) {
                    alert("删除成功");

                    window.location.reload();
                } else if (data == 2) {
                    alert("删除失败");
                }
            },
            function (res) {
                alert("未知错误");
            }
            );
    }
})