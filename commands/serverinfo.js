const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	    let reason = args.join(" ").slice(22);
	
	let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setDescription("Thông Tin Server")
		.setColor ("#00ff00")
		.setThumbnail(sicon)
		.addField("Tên Server", message.guild.name)
		.addField("Được tạo vào", message.guild.createdAt)
		.addField("Bạn đã tham gia vào", message.member.joinedAt)
		.addField("Tổng số Members", message.guild.memberCount);
		
		return message.channel.send(serverembed);
		
		}
		
		module.exports.help = {
	name: "serverinfo"
}