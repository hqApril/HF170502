//倒计时插件
//id为需要插入的div的id,格式("#id"),endtime为倒计时结束时间，格式为到1970-1-1的毫秒数
//div宽高比例为3/11 以宽度为基准

function BackTime(id, start_time, end_time) {
    this.$id = $(id);
    this.width = this.$id.width();
    this.height = this.width * 3 / 11;
    this.startTime = start_time;
    this.endTime = end_time;
    this.mileSeconds = this.endTime - this.startTime;
    this.seconds1;
    this.seconds2;
    this.minutes1;
    this.minutes2;
    this.hours1;
    this.hours2;
    this.timer;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.$id.append(this.canvas);
    this.ctx.font = 0.8 * this.height + "px Arial";
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.run();
}

BackTime.prototype.run = function() {
    if (this.timer != undefined) {
        clearInterval(this.timer);
    }

    this.timer = setInterval(function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.mileSeconds -= 1000;

        if (this.mileSeconds <= 0) {
            this.mileSeconds = 0;
            clearInterval(this.timer);
        }

        this.timeCount();
        this.drawBackGround();
        this.fillClock();
    }.bind(this), 1000);
};

//计算需要显示的数字
BackTime.prototype.timeCount = function() {
    this.seconds2 = parseInt(this.mileSeconds / 1000);
    this.hours2 = parseInt(this.seconds2 / 3600);
    this.seconds2 %= 3600;
    this.minutes2 = parseInt(this.seconds2 / 60);
    this.seconds2 %= 60;

    if (this.seconds2 / 10 < 1) {
        this.seconds1 = 0;
    } else {
        this.seconds1 = parseInt(this.seconds2 / 10);
        this.seconds2 %= 10;
    }

    if (this.minutes2 / 10 < 1) {
        this.minutes1 = 0;
    } else {
        this.minutes1 = parseInt(this.minutes2 / 10);
        this.minutes2 %= 10;
    }

    if (this.hours2 / 10 < 1) {
        this.hours1 = 0;
    } else {
        this.hours1 = parseInt(this.hours2 / 10);
        this.hours2 %= 10;
    }
};

//加入背景
BackTime.prototype.drawBackGround = function() {
    this.ctx.fillStyle = "black";

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 18, 0);
    this.ctx.lineTo(this.width / 18 * 17, 0);
    this.ctx.arcTo(this.width, 0, this.width, this.width / 18, this.width / 18);
    this.ctx.lineTo(this.width, this.width * 43 / 198);
    this.ctx.arcTo(this.width, this.height, this.width / 18 * 17, this.height, this.width / 18);
    this.ctx.lineTo(this.width / 18, this.height);
    this.ctx.arcTo(0, this.height, 0, this.width * 43 / 198, this.width / 18);
    this.ctx.lineTo(0, this.width / 18);
    this.ctx.arcTo(0, 0, this.width / 18, 0, this.width / 18);
    this.ctx.closePath();
    this.ctx.fill();
};

//将计算出的数字添加到画布上
BackTime.prototype.fillClock = function() {
    this.ctx.fillStyle = "white";

    this.ctx.beginPath();
    this.ctx.fillText(this.hours1, this.width / 18 * 2, this.height / 2);

    this.ctx.beginPath();
    this.ctx.fillText(this.hours2, this.width / 18 * 4, this.height / 2);

    this.ctx.beginPath();
    this.ctx.fillText("：", this.width / 18 * 6, this.height * 3 / 7);

    this.ctx.beginPath();
    this.ctx.fillText(this.minutes1, this.width / 18 * 8, this.height / 2);

    this.ctx.beginPath();
    this.ctx.fillText(this.minutes2, this.width / 18 * 10, this.height / 2);

    this.ctx.beginPath();
    this.ctx.fillText("：", this.width / 18 * 12, this.height * 3 / 7);

    this.ctx.beginPath();
    this.ctx.fillText(this.seconds1, this.width / 18 * 14, this.height / 2);

    this.ctx.beginPath();
    this.ctx.fillText(this.seconds2, this.width / 18 * 16, this.height / 2);
};

//动态修改倒计时的时间
BackTime.prototype.changeTime = function(mile_seconds) {
    this.mileSeconds = mile_seconds;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.timeCount();
    this.drawBackGround();
    this.fillClock();

    this.run();
};
