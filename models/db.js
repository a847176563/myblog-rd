
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    //连接数据库名
    database: 'myblog'
});


module.exports = {
    query:
        function (sql, values) {
            return new Promise((resolve, reject) => {
                pool.getConnection(function (err, connection) {
                    if (err) {
                        reject(err);
                    } else {
                        connection.query(sql, values, function (error, results) {
                            //释放连接 连接池
                            connection.release();
                            if (error) {
                                reject(error);
                            } else {
                                resolve(results);
                            }
                        }
                        );
                    }
                });
            })

        }
    }