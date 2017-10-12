function RedisAdapter() {    //redis适配器
    this.redis = require("redis");
    this.client = this.redis.createClient();
}

RedisAdapter.prototype.setOne = function(key, value) {    //写入一个数据
    this.client.set(key, JSON.stringify(value));
};

RedisAdapter.prototype.getOne = function(key, callback) {    //读取一个数据
    this.client.get(key, function(err, res) {
        if (res == null) {
            callback("failed");
        } else {
            callback(res);
        }
    })
};

module.exports = new RedisAdapter();
