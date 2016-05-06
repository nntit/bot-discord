var options = require("../options.json");
var sql = require("./sql.js").sql;
var sql = new sql();
var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('./data');

function chatbot(client) {
	client.Dispatcher.on("MESSAGE_CREATE", e => {
		
		if (isChii(e.message)) {

			console.log(e.message);
			if (e.message.author.id == options.Idowner) {
			}

			if (e.message.content.indexOf("ping") >= 0){
				e.message.channel.sendMessage("<@"+options.Idowner+">");
			}
		}
	});
}

session("sql");

function isChii(e) {
	var callb = e.content.substring(0, 9).toUpperCase();
	if (e.content.substring(0, 21).indexOf(options.id) >= 0 || callb.indexOf("CHII") == 0 || callb.indexOf("CHII-CHAN") == 0) {
		return true;
	}else{
		return false;
	}
}

function session(id) {


	var db = new sqlite3.Database('./data');
	db.serialize(function() {
		db.each("SELECT id FROM session", function(err, row) {
			console.log(row.id);
		});
		//db.run("UPDATE session SET time = ? WHERE id = ?", Date.now(), id);
		db.run("INSERT INTO session(id,time) VALUES (?,?)", id, Date.now());
		db.each("SELECT id FROM session", function(err, row) {
			console.log(row.id);
		});
		// db.run("INSERT INTO session VALUES $id,$date", {
		// 	$id: id,
		// 	$date: Date.now()
		// });
	});
	db.close();
	/*

	var row = sql.sqlout("SELECT * FROM session");
	log

	sql.sql("");
	*/
}


// function Isowner(id) {
// 	if (e.message.author.id = options.Idowner) {
// 		return true
// 	}
// 	else{
// 		return false
// 	}		
// }

exports.chatbot = chatbot;