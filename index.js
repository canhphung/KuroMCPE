const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const fs = require("fs");
const superagent = require("superagent");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

if(err) console.log(err);

let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
console.log("Không thể tìm thấy lệnh.");
return;
 }
 
 jsfile.forEach((f, i) =>{
let props = require (`./commands/${f}`);
console.log(`${f} hoạt động!`);
bot.commands.set(props.help.name, props);
});
 
});


bot.on("ready", async ()  => {  
console.log(`${bot.user.username} Đã hoạt động ở ${bot.guilds.size} máy chủ!`);

bot.user.setActivity("Cảnh Phùng", {type: "PLAYING"});

//bot.user.setGame("on SourceCade!");
  
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	
	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot, message,args);

});

bot.login(botconfig.token);
