//新建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //数据初始化
    $scope.addRoleIf = false;
    $scope.changeRoleIf = false;
    $scope.changeRolePowerIf = false;

    //获取角色列表
    $scope.getRole = function () {
        $http({
            url: "./index.php?c=Main&a=getRole",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;
                $scope.roleArr = data;
            }
        );
    }

    $scope.getRole();

    //获取权限列表
    $scope.getPower = function () {
        $http({
            url: "./index.php?c=Main&a=getPower",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                for (var i = 0; i < data.length; i++) {
                    data[i].got = false;
                }

                $scope.powerArr = data;
            }
        );
    }

    $scope.getPower();

    //添加角色
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
            }
        );
    }

    //删除角色
    $scope.deleteRole = function (id) {
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
            }
        );
    }

    //显示修改角色页面
    $scope.showChangeRoleIf = function (id, name, describe) {
        $scope.changeRoleId = id;
        $scope.cName = name;
        $scope.cDescribe = describe;
        $scope.changeRoleIf = !$scope.changeRoleIf;
    }

    //修改角色信息
    $scope.changeRole = function () {
        $http({
            url: "./index.php?c=Main&a=changeRole",
            method: "post",
            data: {
                id: $scope.changeRoleId,
                name: $scope.cName,
                describe: $scope.cDescribe
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("该角色名已存在，更改失败");
                } else if (data == 1) {
                    alert("更改成功");

                    window.location.reload();
                } else if (data == 2) {
                    alert("更改失败");
                }
            }
        );
    }

    //显示修改角色权限页面
    $scope.showChangeRolePowerIf = function (id) {
        $scope.changeRolePowerIf = !$scope.changeRolePowerIf;
        $scope.changeRolePowerId = id;

        if ($scope.changeRolePowerIf == true) {
            $http({
                url: "./index.php?c=Main&a=getRolePower",
                method: "post",
                data: {
                    id: id
                }
            }).then(
                function (res) {
                    var data = res.data;

                    for (var i = 0; i < $scope.powerArr.length; i++) {
                        $scope.powerArr[i].got = false;
                    }

                    for (var i = 0; i < data.length; i++) {
                        $scope.powerArr[data[i].menu_id - 1].got = true;
                    }
                }
            );
        }
    }

    //修改角色权限
    $scope.changeRolePower = function () {
        var arr = [];

        for (var i = 0; i < $scope.powerArr.length; i++) {
            if ($scope.powerArr[i].got == true) {
                arr.push($scope.powerArr[i].menu_id);
            }
        }

        $http({
            url: "./index.php?c=Main&a=changeRolePower",
            method: "post",
            data: {
                id: $scope.changeRolePowerId,
                arr: arr
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 1) {
                    alert("修改成功");

                    window.location.reload();
                } else {
                    alert("修改失败");
                }
            }
        );
    }
})