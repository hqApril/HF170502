//引入适配器
function ServiceDAO(dbAdapterName, redisAdapterName) {
    this.dbAdapterName = dbAdapterName == undefined ? "../dbAdapter" : dbAdapterName;
    this.redisAdapterName = redisAdapterName == undefined ? "../redisAdapter" : redisAdapterName;

    this.dbAdapter = require(this.dbAdapterName);
    this.redisAdapter = require(this.redisAdapterName);
}

//客服登录
//传入登录id、登录密码
//用回调函数处理得到的数据
ServiceDAO.prototype.serviceLogin = function(id, pwd, callback) {
    var sql = "select service_id, nickname from Services where service_id = ? and service_pwd = ?;";

    this.dbAdapter.select(sql, [id, pwd], function(res) {
        callback(res);
    });
};

//刷新登录信息
//传入更新的id
//用回调函数处理得到的数据
ServiceDAO.prototype.freshLoginInfo = function(id, callback) {
    var sql = "select service_id, nickname from Services where service_id = ?;";

    this.dbAdapter.select(sql, [id], function(res) {
        callback(res);
    });
};









module.exports = new ServiceDAO();
