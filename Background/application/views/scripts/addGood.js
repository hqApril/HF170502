//添加商品时提交商品图片
function fsubmit(id) {
    var formData = new FormData($('#goodForm')[0]);

    $.ajax({
        url: './index.php?c=Main&a=addImg&id=' + id,
        type: 'POST',
        data: formData,
        dataType: 'text',
        cache: false,
        processData: false,
        contentType: false,
        success: function (res) {

        },
        error: function (req, res) {

        }
    });
}

//图片预览
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

        preview.empty();
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