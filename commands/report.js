const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!rUser) return message.channel.send("Không thể tìm thấy người dùng này");
	    let reason = args.join(" ").slice(22);
	
	let reportEmbed = new Discord.RichEmbed()
	.setDescription("Tố cáo người dùng khác có vi phạm")
	.setColor("#00ff00")
	.addField("Tố cáo người dùng", `${rUser} với ID: ${rUser.id}`)
	.addField("Tố cáo bởi", `${message.author} với ID: ${message.author.id}`)
	.addField("Kênh", message.channel)
    .addField("Tố cáo vào", message.createAt)
    .addField("Lí do", reason);
	
	let reportschannel = message.guild.channels.find(`name`, "reports");
	if(!reportschannel) return message.channel.send("Đây không phải kênh report.");
	
	
	message.delete().catch(O_o=> {});
	reportschannel.send(reportEmbed);
	
}

module.exports.help = {
	name: "report"
}