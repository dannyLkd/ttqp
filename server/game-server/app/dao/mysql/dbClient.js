var mysql=require("mysql");  

var dbClient = module.exports;

var _pool;

var NND = {};

/*
 * Init sql connection pool
 * @param {Object} app The app for the server.
 */
NND.init = function(app){
	_pool = require('./dao-pool').createMysqlPool(app);
	var mysqlConfig = app.get('mysql');        
	_pool = mysql.createPool({  
		host: mysqlConfig.host,
		user: mysqlConfig.user,
		password: mysqlConfig.password,
		database: mysqlConfig.database,
		port: mysqlConfig.port
	});	
};

dbClient.init = function(app) {
	if (!!_pool){
		return dbClient;
	} else {
		NND.init(app);
		dbClient.insert = NND.query;
		dbClient.update = NND.query;
		dbClient.delete = NND.query;
		dbClient.query = NND.query;
        return dbClient;
		// var mysqlConfig = app.get('mysql');        
        // _pool = mysql.createPool({  
        //     host: mysqlConfig.host,
        //     user: mysqlConfig.user,
        //     password: mysqlConfig.password,
        //     database: mysqlConfig.database,
        //     port: mysqlConfig.port
        // });
	}
};

NND.query = function(sql,callback){  
    _pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};