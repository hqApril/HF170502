//新建angularJs应用程序
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    //数据初始化
    $scope.typeSelect = "秒杀";
    $scope.timeSelect = "1";
    $scope.classifySelect = "1";
    $scope.originalPrice = 0;
    $scope.discountPrice = 0;

    //添加商品函数
    $scope.addGood = function () {
        $http({
            url: "./index.php?c=Main&a=addGood",
            method: "post",
            data: {
                postType: $scope.typeSelect,
                goodName: $scope.goodName,
                timeSelect: $scope.timeSelect,
                classifySelect: $scope.classifySelect,
                originalPrice: $scope.originalPrice,
                discountPrice: $scope.discountPrice,
                rest: $scope.rest,
                limit: $scope.limit,
                summary: $scope.summary
            }
        }).then(
            function (res) {
                fsubmit(res.data[0].last_id); //提交图片

                alert("商品添加成功");
            },
            function () {
                alert("未知错误");
            }
        );
    }

    //图片预览
    $scope.imagePreview = function (input) {
        var files = input.files;
        // 假设 "preview" 是将要展示图片的 div
        var preview = $("imgPreview");

        for (var i = 0; i < files.length; i++) { //预览新添加的图片
            var file = files[i];
            var imageType = /^image\//;

            if (!imageType.test(file.type)) {
                alert("请选择图片类型上传");
                continue;
            }

            var img = document.createElement("img");

            img.classList.add("obj");
            img.file = file;
            img.style.width = "100px";

            preview.appendChild(img);

            var reader = new FileReader();
            
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
                };
            })(img);

            reader.readAsDataURL(file);
        }
    }
});