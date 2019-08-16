const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) return message.channel.send("Không thể tìm thấy người dùng này");
	    let reason = args.join(" ").slice(22);
	
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!kUser) return message.channel.send("Không thể tìm thấy người dùng này!");
		let kReason = args.join(" ").slice(22);
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bạn không có quyền để làm điều này");
		if(kUser.hasPermission("MANAGE_MESSAGES"))return message.channel.send("Người này không thể kick!");
		
		let kickEmbed = new Discord.RichEmbed()
		.setDescription("Đuổi người dùng ra khỏi Server")
		.setColor("#00ff00")
		.addField("Đuổi người dùng", `${kUser} với ID: ${kUser.id}`)
		.addField("Đã bị đuổi bởi", `<@${message.author.id}> với ID: ${message.author.id}`)
		.addField("Bị đuổi vào", message.channel)
		.addField("Thời gian", message.createAt)
		.addField("Lí Do", kReason);
		
		let kickChannel = message.guild.channels.find(`name`, "reports");
		if(!kickChannel) return message.channel.send("Đây không phải là kênh Kick.");
		
		message.guild.member(kUser).kick(kReason);
		kickChannel.send(kickEmbed);
		
}

module.exports.help = {
	name: "kick"
}