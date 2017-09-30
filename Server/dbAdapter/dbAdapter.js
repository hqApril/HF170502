//sqlite3适配器

function DbAdapter(dbName) { //引入模块
    this.dbName = dbName == undefined ? "./HF170502.db" : dbName;
    this.sqlite3 = require("sqlite3");
    this.db = new this.sqlite3.Database(this.dbName);
}

DbAdapter.prototype.select = function(sql, params, callback) {    //sqlite3的all命令
    this.db.all(sql, params, function(err, res) {
        if (err == null) {
            callback(res);
        } else {
            callback("failed");
        }
    })
};

DbAdapter.prototype.run = function(sql, params, callback) {    //run命令
    this.db.run(sql, params, function(err) {
        callback(err);
    })
};

DbAdapter.prototype.select1 = function(sql, params, i, callback) {    //引入参数的all命令
    this.db.all(sql, params, function(err, res) {
        if (err == null) {
            callback(i, res);
        } else {
            callback(i, "failed");
        }
    })
};

module.exports = new DbAdapter();
