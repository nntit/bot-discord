const options = require("./options.json");
const avatar = require("./avatar.json");
const Eris = require("eris");

// var bot = new Eris(options.token);

var bot = new Eris.CommandClient(options.token, {}, {
    prefix: "-",
	description:"Chobit",
	owner:"Nguyễn Ngọc Thanh(nnt1289,nntit,gilver,... )"
});

var modules_Command = require("./modules/Command.js");
modules_Command.chatbot(bot);
var modules_todo = require("./modules/todo.js");
modules_todo.chatbot(bot);


bot.on("ready", () => {
	//random avata
	/*
    setInterval(function(){
    	var ava = "avatar"+Math.floor((Math.random()*(Object.keys(avatar).length-1))+1);
    	bot.editSelf({avatar:avatar[ava], username:"Chii"});
    	console.log(ava);
    }, 21600000);
	*/
    console.log("Ready!");
});

var apc = "";
bot.on("messageCreate", (msg) => {
	if (msg.author.id == options.Idowner) {
		if(msg.content.substring(0, 6) === "-avata") {
        	if (msg.content.substring(7, 8) == "r") {
        		var ava = "avatar"+Math.floor((Math.random()*Object.keys(avatar).length-1)+1);
        		bot.editSelf({avatar:avatar[ava], username:"Chii"});
        		bot.createMessage(msg.channel.id, ava);
        	}else{
        		if (Number.isInteger(parseInt(msg.content.substring(7)))) {
        			if (parseInt(msg.content.substring(7))<Object.keys(avatar).length && parseInt(msg.content.substring(7))>=0) {
						bot.editSelf({avatar:avatar["avatar"+msg.content.substring(7)], username:"Chii"});
        			}
        		}
        	}
    	}
    	if (msg.content.substring(0, 6) === "!clear") {
    		if (msg.content.substring(7) === "") {
    			bot.getMessages()
    		}
    	}
	}


	if(msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
	}
});
bot.connect();

