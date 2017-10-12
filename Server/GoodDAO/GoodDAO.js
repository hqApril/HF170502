function GoodDAO(mysqlAdapterName, redisAdapterName) { //引入适配器
    this.mysqlAdapterName = mysqlAdapterName == undefined ? "../mysqlAdapter" : mysqlAdapterName;
    this.redisAdapterName = redisAdapterName == undefined ? "../redisAdapter" : redisAdapterName;

    this.mysqlAdapter = require(this.mysqlAdapterName);
    this.redisAdapter = require(this.redisAdapterName);
}

//从数据库中搬运数据到redis中
GoodDAO.prototype.setReisData = function () {
    setInterval(function () {
        var query = "select * from user";

        this.mysqlAdapter.select(query, function (res) {
            for (var i = 0; i < res.length; i++) {
                this.redisAdapter.setOne('user:' + res[i].user_id, res[i]);
            }
        }.bind(this));

        var query1 = "select * from good";

        this.mysqlAdapter.select(query1, function (res) {
            for (var i = 0; i < res.length; i++) {
                this.redisAdapter.setOne('good:' + res[i].good_id, res[i]);
            }
        }.bind(this));

        var query2 = "select * from time_interval";

        this.mysqlAdapter.select(query2, function (res) {
            for (var i = 0; i < res.length; i++) {
                this.redisAdapter.setOne('ti:' + res[i].time_interval_id, res[i]);
            }
        }.bind(this));

        var query3 = "select * from address";

        this.mysqlAdapter.select(query3, function (res) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].is_default == 1) {
                    this.redisAdapter.setOne('address:' + res[i].user_id, res[i]);
                }

            }
        }.bind(this));

        var query4 = "select * from order_list";

        this.mysqlAdapter.select(query4, function (res) {
            this.redisAdapter.setOne('orderList', res);
        }.bind(this));
    }.bind(this), 500);
};

//秒杀时检查是否存在地址
GoodDAO.prototype.checkAddress = function (userId, callback) {
    this.redisAdapter.getOne("address:" + userId, function (res) {
        if (res == "failed") {
            callback(0);
        } else {
            callback(1);
        }
    });
};

//秒杀时检查当前
GoodDAO.prototype.checkTimeQuantum = function (goodId, callback) {
    this.redisAdapter.getOne("good:" + goodId, function (res) {
        var val = JSON.parse(res);
        var timeIntervalId = val.time_interval_id;

        this.redisAdapter.getOne("ti:" + timeIntervalId, function (res1) {
            var val1 = JSON.parse(res1);
            var start = val1.time_start;
            var end = val1.time_end;
            var date = new Date();
            var startTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + start + ":" + "00:00");
            var endTime = Date.parse(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + end + ":" + "00:00");
            var now = date.getTime();

            if (startTime <= now && endTime > now) {
                callback(1);
            } else {
                callback(0);
            }
        });

    }.bind(this));
};

//秒杀时检查库存
GoodDAO.prototype.checkRest = function (goodId, callback) {
    this.redisAdapter.getOne("good:" + goodId, function (res) {
        var val = JSON.parse(res);

        if (res.good_rest == 0) {
            callback(0);
        } else {
            callback(1);
        }
    });
};

//秒杀时检查是否已秒杀过
GoodDAO.prototype.checkOrderList = function (userId, goodId, callback) {
    this.redisAdapter.getOne("orderList", function (res) {
        var val = JSON.parse(res);

        for (var i = 0; i < val.length; i++) {
            if (val[i].user_id == userId && val[i].good_id == goodId && (val[i].ol_status == 'payed' || val[i].ol_status == 'nopay')) {
                break;
            }
        }

        if (i != val.length) {
            callback(0);
        } else {
            callback(1);
        }
    });
};

//添加与客服的聊天记录
GoodDAO.prototype.addChatRecord = function (userId, content, source) {
    var query = "insert into chat_record values (null, '" + userId + "', '" + content + "', now(), '" + source + "')";

    this.mysqlAdapter.select(query, function (res) {

    });
};

module.exports = new GoodDAO();