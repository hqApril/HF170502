function fsubmit() {
    var data = new FormData($('#goodForm')[0]);

    $.ajax({
        url: './index.php?c=Main&a=addImg',
        type: 'POST',
        data: data,
        dataType: 'text',
        cache: false,
        processData: false,
        contentType: false,
        success: function (ret) {
            if (ret['isSuccess']) {
                var result = '';
                result += '<img src="' + ret['images'] + '" width="300">';
                $('#imgPreview').html(result);
            } else {
                //alert('提交失败');

            }
        },
        error: function (req, res) {
            console.log(res);
        }
    });
}

function imagePreview(input) {
    var files = input.files; // 假设 "preview" 是将要展示图片的 div
    var preview = $("#imgPreview");
    for (var i = 0; i < files.length; i++) { //预览新添加的图片
        var file = files[i];
        var imageType = / ^image\//;
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        img.style.width = "300px";
        preview.append(img);
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}