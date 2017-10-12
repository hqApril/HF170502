//个人中心页面js

//菜单切换效果
var $menu = $("#menu");
var $menuDetails = $("#menuDetails");

for (var i = 0; i < $menu.children().length; i++) {
    $menu.children().eq(i).attr("order", i);
}

$menu.children().each(function () {
    $(this).click(function () {
        $(this).attr("class", "menuSelected");
        $(this).siblings().attr("class", "menuUnselected");
        $menuDetails.children().eq($(this).attr("order")).show();
        $menuDetails.children().eq($(this).attr("order")).siblings().hide();
    })
})

//点击账户充值弹出窗口
$("input[value='账户充值']").click(function () {
    $("#transMask").show();
    $("#recharge").show();
});

//关闭充值界面
$("#recharge").children("input[value='X']").click(function () {
    $("#transMask").hide();
    $("#recharge").hide();
});

//已支付和未支付菜单切换
$("input[value='未支付']").click(function () {
    $("#nopayOl").show();
    $("#payedOl").hide();
    $("#olNoPayPageBtn").show();
    $("#olPayedPageBtn").hide();
});

$("input[value='已支付']").click(function () {
    $("#nopayOl").hide();
    $("#payedOl").show();
    $("#olNoPayPageBtn").hide();
    $("#olPayedPageBtn").show();
});