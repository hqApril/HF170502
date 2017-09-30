// 封装图片轮播的插件

function BannerSlider(id, btn1, btn2, dot, width, arr) {
    this.$id = $(id);
    this.$btn1 = $(btn1);
    this.$btn2 = $(btn2);
    this.$dot = $(dot);
    this.width = width;
    this.timer1;
    this.timer2;
    this.arr = arr;
    this.selectNow = 0;
    this.left = -this.width;

    this.$btn1.click(function() {
        this.previousPage();
    }.bind(this));

    this.$btn2.click(function() {
        this.nextPage();
    }.bind(this));

    this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.arr.length - 1]);
    this.$id.children().eq(0).children().eq(1).attr("src", this.arr[0]);
    this.$id.children().eq(0).children().eq(2).attr("src", this.arr[1]);
}

//下一页的方法
BannerSlider.prototype.nextPage = function() {
    this.$btn1.attr("disabled", true);
    this.$btn2.attr("disabled", true);

    if (this.timer1 != undefined)
        clearInterval(this.timer1);

    this.timer1 = setInterval(function() {
        this.left -= 10;
        this.$id.children().eq(0).css('left', this.left + "px");

        if (this.$id.children().eq(0).css('left') == -this.width * 2 + "px") {
            this.selectNow++;
            this.left = -this.width;
            clearInterval(this.timer1);
            this.$id.children().eq(0).css('left', -this.width + "px");
            this.$btn1.removeAttr("disabled");
            this.$btn2.removeAttr("disabled");

            if (this.selectNow == this.arr.length - 1) {
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.selectNow - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[0]);
            } else if (this.selectNow == this.arr.length) {
                this.selectNow = 0;
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.arr.length - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[this.selectNow + 1]);
            } else {
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.selectNow - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[this.selectNow + 1]);
            }
            this.$id.children().eq(0).children().eq(1).attr("src", this.arr[this.selectNow]);
            this.changeDotStyle();
        }
    }.bind(this), 5);
};

//上一页的方法
BannerSlider.prototype.previousPage = function() {
    this.$btn1.attr("disabled", true);
    this.$btn2.attr("disabled", true);
    this.timer1 = setInterval(function() {
        this.left += 10;
        this.$id.children().eq(0).css('left', this.left + "px");

        if (this.$id.children().eq(0).css('left') == "0px") {
            this.selectNow--;
            this.left = -this.width;
            clearInterval(this.timer1);
            this.$id.children().eq(0).css('left', -this.width + "px");
            this.$btn1.removeAttr("disabled");
            this.$btn2.removeAttr("disabled");

            if (this.selectNow == 0) {
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.arr.length - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[this.selectNow + 1]);
            } else if (this.selectNow < 0) {
                this.selectNow = this.arr.length - 1;
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.selectNow - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[0]);
            } else {
                this.$id.children().eq(0).children().eq(0).attr("src", this.arr[this.selectNow - 1]);
                this.$id.children().eq(0).children().eq(2).attr("src", this.arr[this.selectNow + 1]);
            }
            this.$id.children().eq(0).children().eq(1).attr("src", this.arr[this.selectNow]);
            this.changeDotStyle();
        }
    }.bind(this), 5);
};

//添加圆点的方法
BannerSlider.prototype.addDot = function(style1, style2) {
    var _this = this;
    this.style1 = style1;
    this.style2 = style2;

    for (var i = 0; i < this.arr.length; i++) {
        $div = $("<div></div>");
        $div.attr("order", i);
        $div.mouseover(function() {
            _this.selectNow = parseInt($(this).attr("order"));

            if (_this.selectNow == _this.arr.length - 1) {
                _this.$id.children().eq(0).children().eq(0).attr("src", _this.arr[_this.selectNow - 1]);
                _this.$id.children().eq(0).children().eq(2).attr("src", _this.arr[0]);
            } else if (_this.selectNow == 0) {
                _this.$id.children().eq(0).children().eq(0).attr("src", _this.arr[_this.arr.length - 1]);
                _this.$id.children().eq(0).children().eq(2).attr("src", _this.arr[_this.selectNow + 1]);
            } else {
                _this.$id.children().eq(0).children().eq(0).attr("src", _this.arr[_this.selectNow - 1]);
                _this.$id.children().eq(0).children().eq(2).attr("src", _this.arr[_this.selectNow + 1]);
            }
            _this.$id.children().eq(0).children().eq(1).attr("src", _this.arr[_this.selectNow]);
            _this.changeDotStyle();
        });
        $div.appendTo(this.$dot);
    }

    this.changeDotStyle();
};

//修改圆点样式
BannerSlider.prototype.changeDotStyle = function() {
    this.$dot.children().removeClass();
    this.$dot.children().addClass(this.style1);
    this.$dot.children().eq(this.selectNow).addClass(this.style2);
}

//自动轮播的方法
BannerSlider.prototype.autoSlider = function() {
    if (this.timer2 != undefined)
        clearInterval(this.timer2);

    this.timer2 = setInterval(function() {
        this.nextPage();
    }.bind(this), 2000);

    this.$btn1.mouseover(function() {
        clearInterval(this.timer2);
    }.bind(this));

    this.$btn1.mouseout(function() {
        this.timer2 = setInterval(function() {
            this.nextPage();
        }.bind(this), 2000);
    }.bind(this));

    this.$btn2.mouseover(function() {
        clearInterval(this.timer2);
    }.bind(this));

    this.$btn2.mouseout(function() {
        this.timer2 = setInterval(function() {
            this.nextPage();
        }.bind(this), 2000);
    }.bind(this));

    this.$dot.children().mouseover(function() {
        clearInterval(this.timer2);
    }.bind(this));

    this.$dot.children().mouseout(function() {
        this.timer2 = setInterval(function() {
            this.nextPage();
        }.bind(this), 2000);
    }.bind(this));
};
