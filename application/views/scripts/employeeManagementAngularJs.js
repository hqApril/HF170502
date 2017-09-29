var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $scope.changeAll = false;
    $scope.statusSelect = "使用";

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
});