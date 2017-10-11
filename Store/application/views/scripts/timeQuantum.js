//秒杀控件封装

function TimeQuantum(id, nowTime) {
    this.$id = $(id);
    this.$id.addClass("timeQuantum");
    var len = this.$id.children("ul").eq(0).children().length;
    var selected = 0;

    var $input1 = $("<input type='button' value='&lt;'>");
    $input1.click(function() {
        if (parseInt($div2.css("left")) < 405) {
            var count = 0;
            selected--;

            var timer = setInterval(function() {
                count += 5;
                $input1.attr("disabled", true);
                $input2.attr("disabled", true);

                if (count >= 136) {
                    clearInterval(timer);
                    $input1.removeAttr("disabled");
                    $input2.removeAttr("disabled");
                } else {
                    $div2.css("left", (parseInt($div2.css("left")) + 5) + "px");
                }
            }, 5)
        }
    });

    var $input2 = $("<input type='button' value='&gt;'>");
    $input2.click(function() {
        if (parseInt($div1.children().eq(0).css("width")) - 135 + parseInt($div2.css("left")) > 405) {
            var count = 0;
            selected++;

            var timer = setInterval(function() {
                count += 5;
                $input1.attr("disabled", true);
                $input2.attr("disabled", true);

                if (count >= 136) {
                    clearInterval(timer);
                    $input1.removeAttr("disabled");
                    $input2.removeAttr("disabled");
                } else {
                    $div2.css("left", (parseInt($div2.css("left")) - 5) + "px");
                }
            }, 5)
        }
    });

    var $div1 = $("<div id='timeQuantumDiv1'></div>");
    var $div2 = $("<div></div>");

    for (var i = 0; i < len; i++) {
        var $div = $("<div class='timeQuantumTab'  timeQuantumId=" + this.$id.children("ul").eq(0).children().eq(i).attr("time_quantum_id") + ">" + this.$id.children("ul").eq(0).children().eq(i).html() + "</div>");
        $div.attr("idx", i);
        $div.click(function() {
            selected = $(this).attr("idx");
            var count = 0;
            var add = (405 - parseInt($(this).attr("idx")) * 135 - parseInt($div2.css("left")));

            var timer = setInterval(function() {
                count += add / 27;

                $div2.css("left", (parseInt($div2.css("left")) + add / 27) + "px");

                if (count >= add && count > 0 || count <= add && count < 0)
                    clearInterval(timer);

            }.bind(this), 5);
        });
        $div.appendTo($div2);
    }

    $input1.appendTo(this.$id);
    $div1.appendTo(this.$id);
    $input2.appendTo(this.$id);

    //初始化样式
    selected = nowTime;
    $div2.css("left", (405 - selected * 135) + "px");
    $div2.css("width", len * 135 + "px");
    $div2.children().eq(len - 1).css("border", "none");
    $div2.appendTo($("#timeQuantumDiv1"));

    this.$id.children('ul').remove();

    TimeQuantum.prototype.getSelectedOrder = function() {
        return selected;
    };
}
