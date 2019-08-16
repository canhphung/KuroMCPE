const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) return message.channel.send("Không thể tìm thấy người dùng này");
	    let reason = args.join(" ").slice(22);
	
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!bUser) return message.channel.send("Không thể tìm thấy người dùng này!");
		let bReason = args.join(" ").slice(22);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bạn không có quyền để làm điều này");
		if(bUser.hasPermission("MANAGE_MESSAGES"))return message.channel.send("Người này không thể ban!");
		
		let banEmbed = new Discord.RichEmbed()
		.setDescription("Cấm người dùng khỏi Server")
		.setColor("#00ff00")
		.addField("Cấm người dùng", `${bUser} với ID: ${bUser.id}`)
		.addField("Đã bị cấm bởi", `<@${message.author.id}> với ID: ${message.author.id}`)
		.addField("Bị cấm vào", message.channel)
		.addField("Thời gian", message.createAt)
		.addField("Lí Do", bReason);
		
		let banChannel = message.guild.channels.find(`name`, "reports");
		if(!banChannel) return message.channel.send("Đây không phải là kênh Ban.");
		
		message.guild.member(bUser).ban(bReason);
		banChannel.send(banEmbed);
		
		}
		
		module.exports.help = {
	name: "ban"
}
