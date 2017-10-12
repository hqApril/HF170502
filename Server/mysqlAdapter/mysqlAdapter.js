//mysql适配器

function MysqlAdapter() {
    this.mysql = require("mysql");
    this.client = this.mysql.createConnection({
        user: "root",
        password: "12345678"
    });

    this.client.connect();
    this.client.query("use hf170502");
}

MysqlAdapter.prototype.select = function (query, callback) {
    this.client.query(query, function(err, res, fields) {
        callback(res);
    });
}



module.exports = new MysqlAdapter();

