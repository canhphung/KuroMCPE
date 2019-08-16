const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => { 
	    let reason = args.join(" ").slice(22);
	
	let bicon = bot.user.displayAvatarURL;
			let botembed = new Discord.RichEmbed()
			.setDescription("Thông Tin Về Bot")
			.setColor("#00ff00")
			.setThumbnail(bicon)
			.addField("Tên Bot", bot.user.username)
			.addField("Đã tạo vào", message.guild.createdAt);
			
			return message.channel.send(botembed);
			}
			
			module.exports.help = {
	name: "botinfo"
}