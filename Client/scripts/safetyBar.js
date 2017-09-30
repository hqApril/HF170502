//防暴力刷新条插件

function SafetyBar(id, btn, length) {
    this.$id = $(id);
    this.$btn = $(btn);
    this.length = length;

    var startX = 0;
    var isDown = false;
    var $fdiv = $("<div class='safetyBarSDiv'></div>");
    var $sdiv1 = $("<div></div>");
    var $sdiv2 = $("<div></div>");

    $sdiv2.css("left", 0);
    this.$btn.attr("disabled", true);
    $fdiv.width((this.length + 50) + "px");

    $sdiv2.mousedown(function(e) {
        $(this).css("background-image", "url('images/btn_bd2.png')");
        isDown = true;
        startX = e.offsetX;
        e.preventDefault();
    });

    $sdiv2.mousemove(function(e) {
        if (isDown) {
            if (parseInt(e.target.style.left) >= 0 && parseInt(e.target.style.left) <= this.length) {
                e.target.style.left = (parseInt(e.target.style.left) + e.offsetX - startX) + "px";

                if (parseInt(e.target.style.left) < 0)
                    e.target.style.left = "0px";
                else if (parseInt(e.target.style.left) > this.length) {
                    e.target.style.left = this.length + "px";
                    $(e.target).unbind();
                    this.$btn.attr("disabled", false);
                }
                $sdiv1.css("width", e.target.style.left);
            }
        }
    }.bind(this))

    $sdiv2.mouseup(function() {
        $(this).css("background-image", "url('images/btn_bd1.png')");
        isDown = false;
    });

    $sdiv2.mouseleave(function() {
        $(this).css("background-image", "url('images/btn_bd1.png')");
        isDown = false;
    });

    $fdiv.prependTo(this.$id);
    $sdiv1.appendTo($fdiv);
    $sdiv2.appendTo($fdiv);
}
