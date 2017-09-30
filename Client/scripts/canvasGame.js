function CanvasGame(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.balls = [];
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.nowX;
    this.nowY;
    this.colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];
    this.colorsNow = [];
    this.angle1;
    this.angle2;
    this.angle3;
    this.angle4;
    this.angle5;
    this.judgement = false;
    this.count = 0;
    this.total = 0;
    this.avr = 0;

    this.canvas.onmousemove = function(e) {
        this.nowX = e.offsetX;
        this.nowY = e.offsetY;

        if (this.nowY > this.height - this.width / 100 * 4) {
            this.nowY = this.height - this.width / 100 * 4;
        }
    }.bind(this);

    this.changeColors();

    this.canvas.onclick = function(e) {
        if (!this.judgement) {
            this.judgement = true;
        }

        if (this.judgement) {
            this.count += 1;
        }


        var speed1 = Math.sqrt((this.nowX - this.width / 10 * 1) * (this.nowX - this.width / 10 * 1) + (this.height - this.width / 100 * 4 - this.nowY) * (this.height - this.width / 100 * 4 - this.nowY));

        var aBall = {
            color: this.colors[this.colorsNow[0]],
            x: this.width / 10 * 1 + this.width / 100 * 10 * Math.cos(this.angle1),
            y: this.height - this.width / 100 * 4 - this.width / 100 * 10 * Math.sin(this.angle1),
            vx: speed1 * Math.cos(this.angle1) * 0.025,
            vy: speed1 * Math.sin(this.angle1) * 0.025,
            ay: 0.15
        }

        this.balls.push(aBall);



        var speed2 = Math.sqrt((this.nowX - this.width / 10 * 3) * (this.nowX - this.width / 10 * 3) + (this.height - this.width / 100 * 4 - this.nowY) * (this.height - this.width / 100 * 4 - this.nowY));

        var aBall = {
            color: this.colors[this.colorsNow[1]],
            x: this.width / 10 * 3 + this.width / 100 * 10 * Math.cos(this.angle2),
            y: this.height - this.width / 100 * 4 - this.width / 100 * 10 * Math.sin(this.angle2),
            vx: speed2 * Math.cos(this.angle2) * 0.025,
            vy: speed2 * Math.sin(this.angle2) * 0.025,
            ay: 0.15
        }

        this.balls.push(aBall);



        var speed3 = Math.sqrt((this.nowX - this.width / 10 * 5) * (this.nowX - this.width / 10 * 5) + (this.height - this.width / 100 * 4 - this.nowY) * (this.height - this.width / 100 * 4 - this.nowY));

        var aBall = {
            color: this.colors[this.colorsNow[2]],
            x: this.width / 10 * 5 + this.width / 100 * 10 * Math.cos(this.angle3),
            y: this.height - this.width / 100 * 4 - this.width / 100 * 10 * Math.sin(this.angle3),
            vx: speed3 * Math.cos(this.angle3) * 0.025,
            vy: speed3 * Math.sin(this.angle3) * 0.025,
            ay: 0.15
        }

        this.balls.push(aBall);



        var speed4 = Math.sqrt((this.nowX - this.width / 10 * 7) * (this.nowX - this.width / 10 * 7) + (this.height - this.width / 100 * 4 - this.nowY) * (this.height - this.width / 100 * 4 - this.nowY));

        var aBall = {
            color: this.colors[this.colorsNow[3]],
            x: this.width / 10 * 7 + this.width / 100 * 10 * Math.cos(this.angle4),
            y: this.height - this.width / 100 * 4 - this.width / 100 * 10 * Math.sin(this.angle4),
            vx: speed4 * Math.cos(this.angle4) * 0.025,
            vy: speed4 * Math.sin(this.angle4) * 0.025,
            ay: 0.15
        }

        this.balls.push(aBall);



        var speed5 = Math.sqrt((this.nowX - this.width / 10 * 9) * (this.nowX - this.width / 10 * 9) + (this.height - this.width / 100 * 4 - this.nowY) * (this.height - this.width / 100 * 4 - this.nowY));

        var aBall = {
            color: this.colors[this.colorsNow[4]],
            x: this.width / 10 * 9 + this.width / 100 * 10 * Math.cos(this.angle5),
            y: this.height - this.width / 100 * 4 - this.width / 100 * 10 * Math.sin(this.angle5),
            vx: speed5 * Math.cos(this.angle5) * 0.025,
            vy: speed5 * Math.sin(this.angle5) * 0.025,
            ay: 0.15
        }

        this.balls.push(aBall);

        this.changeColors();
    }.bind(this)

    setInterval(function() {
        this.drawCannon();
        this.apm();
    }.bind(this), 20);
}

CanvasGame.prototype.drawCannon = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "#284e5f";
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.width / 10 * 1, this.height - this.width / 100 * 4);
    if (this.width / 10 > this.nowX) {
        this.angle1 = Math.PI - Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.width / 10 * 1 - this.nowX));
    } else {
        this.angle1 = Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.nowX - this.width / 10 * 1));
    }

    this.ctx.rotate(-this.angle1);
    this.ctx.fillStyle = this.colors[this.colorsNow[0]];
    this.ctx.arc(this.width / 100 * 10, 0, this.width / 100 * 0.8, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#284e5f";
    this.ctx.fillRect(0, -this.width / 100 * 1, this.width / 100 * 10, this.width / 100 * 2);

    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.width / 10 * 3, this.height - this.width / 100 * 4);
    if (this.width / 10 * 3 > this.nowX) {
        this.angle2 = Math.PI - Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.width / 10 * 3 - this.nowX));
    } else {
        this.angle2 = Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.nowX - this.width / 10 * 3));
    }

    this.ctx.rotate(-this.angle2);
    this.ctx.fillStyle = this.colors[this.colorsNow[1]];
    this.ctx.arc(this.width / 100 * 10, 0, this.width / 100 * 0.8, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#284e5f";
    this.ctx.fillRect(0, -this.width / 100 * 1, this.width / 100 * 10, this.width / 100 * 2);

    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.width / 10 * 5, this.height - this.width / 100 * 4);
    if (this.width / 10 * 5 > this.nowX) {
        this.angle3 = Math.PI - Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.width / 10 * 5 - this.nowX));
    } else {
        this.angle3 = Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.nowX - this.width / 10 * 5));
    }

    this.ctx.rotate(-this.angle3);
    this.ctx.fillStyle = this.colors[this.colorsNow[2]];
    this.ctx.arc(this.width / 100 * 10, 0, this.width / 100 * 0.8, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#284e5f";
    this.ctx.fillRect(0, -this.width / 100 * 1, this.width / 100 * 10, this.width / 100 * 2);

    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.width / 10 * 7, this.height - this.width / 100 * 4);
    if (this.width / 10 * 7 > this.nowX) {
        this.angle4 = Math.PI - Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.width / 10 * 7 - this.nowX));
    } else {
        this.angle4 = Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.nowX - this.width / 10 * 7));
    }

    this.ctx.rotate(-this.angle4);
    this.ctx.fillStyle = this.colors[this.colorsNow[3]];
    this.ctx.arc(this.width / 100 * 10, 0, this.width / 100 * 0.8, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#284e5f";
    this.ctx.fillRect(0, -this.width / 100 * 1, this.width / 100 * 10, this.width / 100 * 2);

    this.ctx.restore();

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.width / 10 * 9, this.height - this.width / 100 * 4);
    if (this.width / 10 * 9 > this.nowX) {
        this.angle5 = Math.PI - Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.width / 10 * 9 - this.nowX));
    } else {
        this.angle5 = Math.atan((this.height - this.width / 100 * 4 - this.nowY) / (this.nowX - this.width / 10 * 9));
    }

    this.ctx.rotate(-this.angle5);
    this.ctx.fillStyle = this.colors[this.colorsNow[4]];
    this.ctx.arc(this.width / 100 * 10, 0, this.width / 100 * 0.8, 0, Math.PI * 2, true);
    this.ctx.fill();
    this.ctx.fillStyle = "#284e5f";
    this.ctx.fillRect(0, -this.width / 100 * 1, this.width / 100 * 10, this.width / 100 * 2);

    this.ctx.restore();

    this.ctx.fillStyle = "#284e5f";
    this.ctx.beginPath();
    this.ctx.arc(this.width / 10 * 1, this.height - this.width / 100 * 4, this.width / 100 * 3, 0, Math.PI * 2, true);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.width / 10 * 3, this.height - this.width / 100 * 4, this.width / 100 * 3, 0, Math.PI * 2, true);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.width / 10 * 5, this.height - this.width / 100 * 4, this.width / 100 * 3, 0, Math.PI * 2, true);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.width / 10 * 7, this.height - this.width / 100 * 4, this.width / 100 * 3, 0, Math.PI * 2, true);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(this.width / 10 * 9, this.height - this.width / 100 * 4, this.width / 100 * 3, 0, Math.PI * 2, true);
    this.ctx.fill();

    this.ctx.fillStyle = "#284e5f";
    this.ctx.beginPath();
    this.ctx.fillRect(this.width / 10 * 1 - this.width * 35 / 1000, this.height - this.width / 100, this.width * 7 / 100, this.width / 100);

    this.ctx.beginPath();
    this.ctx.fillRect(this.width / 10 * 3 - this.width * 35 / 1000, this.height - this.width / 100, this.width * 7 / 100, this.width / 100);

    this.ctx.beginPath();
    this.ctx.fillRect(this.width / 10 * 5 - this.width * 35 / 1000, this.height - this.width / 100, this.width * 7 / 100, this.width / 100);

    this.ctx.beginPath();
    this.ctx.fillRect(this.width / 10 * 7 - this.width * 35 / 1000, this.height - this.width / 100, this.width * 7 / 100, this.width / 100);

    this.ctx.beginPath();
    this.ctx.fillRect(this.width / 10 * 9 - this.width * 35 / 1000, this.height - this.width / 100, this.width * 7 / 100, this.width / 100);


    this.ctx.fillStyle = "#2d89af";
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 10 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 - this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 + this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 + this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 10 * 3 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 3 - this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 3 + this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 3 + this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 3 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 10 * 5 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 5 - this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 5 + this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 5 + this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 5 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 10 * 7 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 7 - this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 7 + this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 7 + this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 7 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 10 * 9 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 9 - this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 9 + this.width / 1000 * 15, this.height - this.width / 100 * 4);
    this.ctx.lineTo(this.width / 10 * 9 + this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.lineTo(this.width / 10 * 9 - this.width / 1000 * 30, this.height - this.width / 100);
    this.ctx.fill();

    this.updateBalls();
    for (var i = 0; i < this.balls.length; i++) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.balls[i].color;
        this.ctx.arc(this.balls[i].x, this.balls[i].y, this.width / 100 * 0.8, 0, 2 * Math.PI, true);
        this.ctx.fill();
    }
};

CanvasGame.prototype.updateBalls = function() {
    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].x += this.balls[i].vx;
        this.balls[i].vy -= this.balls[i].ay;
        this.balls[i].y -= this.balls[i].vy;

        if (this.balls[i].y > this.height - this.width / 100 * 0.8) {
            this.balls[i].y = this.height - this.width / 100 * 0.8
            this.balls[i].vy = -this.balls[i].vy * 0.75;
        }
    }

    var count = 0;
    for (var i = 0; i < this.balls.length; i++) {
        if (this.balls[i].x < this.width + this.width / 100 * 0.8 && this.balls[i].x > - this.width / 100 * 0.8) {
            this.balls[count++] = this.balls[i];
        }
    }

    while (this.balls.length > count) {
        this.balls.pop();
    }
};

CanvasGame.prototype.changeColors = function () {
    this.colorsNow.splice(0, this.colorsNow.length);

    for (var i = 0; i < 5; i++) {
        var num = parseInt(Math.random() * 10);
        while (num == 10) {
            num = parseInt(Math.random() * 10);
        }

        this.colorsNow.push(num);
    }
};

CanvasGame.prototype.apm = function () {
    this.ctx.font ="800 " + .070 * this.width + 'px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';



    if (this.judgement) {
        this.total += 20;

        this.avr = this.count / this.total * 1000;
    } else {
        this.ctx.fillText("点击开始游戏", this.width / 2, this.height / 2);
    }


    this.ctx.font ="800 " + .030 * this.width + 'px Arial';
    this.ctx.fillText("当前APM", this.width / 2, this.height / 8);
    this.ctx.fillText(this.avr.toFixed(2), this.width / 2, this.height / 4);
};

CanvasGame.prototype.reset = function () {
    this.judgement = false;
    this.count = 0;
    this.total = 0;
    this.avr = 0;
};
