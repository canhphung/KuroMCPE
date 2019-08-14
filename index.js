const botconfig = require("./botconfig.json")

const Discord = require('discord.js');

const bot = new Discord.Client();


bot.on("ready", async ()  => {
	console.log(`${bot.user.username} Đã Hoạt Động!`);
	bot.user.setActivity("KuroMCPE" ,{type: "WATCHING"})
})
bot.login('NjExMDgyMDM4NTgxMTMzMzE5.XVO8vw.WUUqbni6U9kl5hxR6xiueEKSPcc');

