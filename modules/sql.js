    
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data');

var sql = function () {};

sql.prototype.sqlin = function(sql) {
	db.serialize(function() {
		db.run(sql);
	});
	db.close();	
};

sql.prototype.sqlout = function(sql) {
	var rows;
	db.serialize(function() {
		db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
			rows = row;
		});
	});
	db.close();
	return rows;
};

exports.sql = sql;