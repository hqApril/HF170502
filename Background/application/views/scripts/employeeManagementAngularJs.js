var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.changeAll = false;
    $scope.changeEmployeeIf = false;
    $scope.statusSelect = "使用";
    $scope.aRole = "1";
    $scope.addEmployeeIf = false;

    $scope.getEmployee = function () {
        $http({
            url: "./index.php?c=Main&a=getEmployee",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                for (var i = 0; i < data.length; i++) {
                    data[i].got = false;
                }

                $scope.employeeArr = data;
            },
            function () {

            }
        );
    }

    $scope.getEmployee();

    $scope.getRole = function () {
        $http({
            url: "./index.php?c=Main&a=getRole",
            method: "get"
        }).then(
            function (res) {
                var data = res.data;

                $scope.roleArr = data;

            },
            function () {
                alert("未知错误");
            }
            );
    }

    $scope.getRole();

    $scope.changeAllFunc = function () {
        if ($scope.changeAll) {
            for (var i = 0; i < $scope.employeeArr.length; i++) {
                $scope.employeeArr[i].got = true;
            }
        } else {
            for (var i = 0; i < $scope.employeeArr.length; i++) {
                $scope.employeeArr[i].got = false;
            }
        }
    }

    $scope.changeSelect = function () {
        $scope.changeAll = false;

        for (var i = 0; i < $scope.employeeArr.length; i++) {
            $scope.employeeArr[i].got = false;
        }
    }

    $scope.changeStatus = function () {
        var arr = [];

        for (var i = 0; i < $scope.employeeArr.length; i++) {
            if ($scope.employeeArr[i].got) {
                arr.push($scope.employeeArr[i].employee_id);
            }
        }

        $http({
            url: "./index.php?c=Main&a=changeStatus",
            method: "post",
            data: {
                arr: arr,
                status: $scope.statusSelect == "使用" ? "锁定" : "使用"
            }
        }).then(
            function (res) {
                alert("修改 使用/锁定 成功");

                window.location.reload();
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.deleteEmployee = function (id) {
        $http({
            url: "./index.php?c=Main&a=deleteEmployee",
            method: "post",
            data: {
                id: id
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("删除成功");

                    window.location.reload();
                } else if (data == 1) {
                    alert("删除失败");
                } else {
                    alert("未知错误");
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.showChangeEmployeeIf = function (id) {
        $scope.changeEmployeeIf = !$scope.changeEmployeeIf;

        if ($scope.changeEmployeeIf) {
            $http({
                url: "./index.php?c=Main&a=getOneEmployee",
                method: "post",
                data: {
                    id: id
                }
            }).then(
                function (res) {
                    var data = res.data;

                    $scope.eId = data[0].employee_id;
                    $scope.eName = data[0].employee_name;
                    $scope.cRole = data[0].role_id;
                },
                function () {
                    alert("未知错误");
                }
            );
        }
    }

    $scope.changeEmployeeName = function () {
        $http({
            url: "./index.php?c=Main&a=changeEmployeeName",
            method: "post",
            data: {
                id: $scope.eId,
                name: $scope.eName
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("修改成功");

                    window.location.reload();
                } else if (data == 1) {
                    alert("修改失败");
                } else {
                    alert("未知错误");
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.changeEmployeePwd = function () {
        $http({
            url: "./index.php?c=Main&a=changeEmployeePwd",
            method: "post",
            data: {
                id: $scope.eId,
                pwd: $scope.ePwd
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("修改成功");

                    window.location.reload();
                } else if (data == 1) {
                    alert("修改失败");
                } else {
                    alert("未知错误");
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.changeEmployeeRole = function () {
        $http({
            url: "./index.php?c=Main&a=changeEmployeeRole",
            method: "post",
            data: {
                id: $scope.eId,
                roleId: $scope.cRole
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("修改成功");

                    window.location.reload();
                } else if (data == 1) {
                    alert("修改失败");
                } else {
                    alert("未知错误");
                }
            },
            function () {
                alert("未知错误");
            }
        );
    }

    $scope.showAddEmployeeIf = function() {
        $scope.addEmployeeIf = !$scope.addEmployeeIf;
    }

    $scope.addEmployee = function() {
        $http({
            url: "./index.php?c=Main&a=addEmployee",
            method: "post",
            data: {
                id: $scope.aId,
                name: $scope.aName,
                pwd: $scope.aPwd,
                roleId: $scope.aRole
            }
        }).then(
            function (res) {
                var data = res.data;

                if (data == 0) {
                    alert("该用户名已存在");
                } else if (data == 1) {
                    alert("添加成功");

                    window.location.reload();
                } else if (data == 2) {
                    alert("插入失败");
                } else {
                    alert("未知错误");
                }
            },
            function () {
                alert("未知错误");
            }
            );
    }
});