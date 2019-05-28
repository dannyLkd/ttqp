var mysql=require("mysql");  

var dbClient = module.exports;

var _pool;

dbClient.init = function(app) {
	if (!!_pool){
		return dbClient;
	} else {
		// NND.init(app);
		// sqlclient.insert = NND.query;
		// sqlclient.update = NND.query;
		// sqlclient.delete = NND.query;
		// sqlclient.query = NND.query;
        // return sqlclient;
        
        _pool = mysql.createPool({  
            host: config.HOST,
            user: config.USER,
            password: config.PSWD,
            database: config.DB,
            port: config.PORT,
        });

	}
};