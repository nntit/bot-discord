var Discordie = require("discordie");
var client = new Discordie();
var options = require("./options.json");

client.connect({
  token: options.token
});

client.Dispatcher.on("GATEWAY_READY", e => {
  console.log("Connected as: " + client.User.username);
});


var modules_master = require("./modules/master.js")
modules_master.chatbot(client);