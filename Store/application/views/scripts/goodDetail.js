//菜单切换挂事件
var $btnList = $("#btnList");
var $aboutGoods = $("#aboutGoods");

for (var i = 0; i < $btnList.children().length; i++) {
    $btnList.children().eq(i).attr("idx", i);
    $btnList.children().eq(i).click(function () {
        $aboutGoods.children().eq($(this).attr("idx")).show();
        $aboutGoods.children().eq($(this).attr("idx")).siblings().hide();
        $(this).attr("class", "btnSelected");
        $(this).siblings().attr("class", "btnUnselected");

        setTimeout(function () {
            $("#aboutGoods").css("height", (parseInt($aboutGoods.children().eq($(this).attr("idx")).height()) + 80) + "px");
        }.bind(this), 10);
    });
}