//客服聊天页面插件
var chatForService = new ChatForService("#content");

//正则验证表达式
function isNull(str) { //检验输入是否为空
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}

//新建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //获取当前登录客服
    $scope.getServiceNow = function () {
        $http({
            method: "get",
            url: "index.php?c=Main&a=getServiceNow"
        }).then(
            function (res) {
                var data = res.data;

                $scope.serviceNow = data;

                $scope.flashServiceLogin();
            }
        );
    }

    $scope.getServiceNow();

    //刷新在ws服务器中的信息
    $scope.flashServiceLogin = function () {
        var obj = {
            type: "flashServiceLogin",
            sender: "service",
            receiver: "server",
            content: {
                id: $scope.serviceNow
            }
        }

        client.send(JSON.stringify(obj));
    }
})