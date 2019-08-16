const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot,message,args) => {
	
	//!warn @doeshan <reason>
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Bạn không có quền để làm điều này!");
	let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
	if(!wUser) return message.reply("không thể tìm họ");
	if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("that waaaay to kewl");
	let reason = args.join(" ").slice(22);
	
	if(!warn[wUser.id]) warns[wUser.id] = {
		warns: 0
	};
	
	warns[wUser.id].warns++;
	
	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.log(err);
	});
	
	let warnEmbed = new Discord.RichEmbed()
	.setDescription("Cảnh Báo")
	.setAuthor(message.author.username)
	.setColor("#00ff00")
	.addField("Cảnh báo người dùng", `<@${wUser.tag}>`)
	.addField("Cảnh báo tại", message.channel)
	.addField("Số lần cảnh báo", warns[wUser.id].warns)
	.addField("Lí do", reason);
	
	
	let warnchannel = message.guild.channels.find(`name`, "report");
	if(!warnchannel) return message.reply("Không thể tìm thấy kênh");
	
	warnchannel.send(warnEmbed);
	
	if(warns[wUser.id].warns == 2){
		let muterole = message.guild.role.find(`name`, "muted");
		if(!muterole) return message.reply("Bạn cần phải tạo rank muted trước đã.");
		
		let mutetime = "10s";
		await(wUser.addRole(muterole.id));
		message.channel.send(`${wUser.tag} đã bị mute`);
		
		setTimeout(function(){
			wUser.removeRole(muterole.id)
			message.channel.reply(`bạn đã được bỏ mute.`)
		})
  }
	if(warns[wUser.id].warns == 5){
	   message.guild.member(wUser).ban(reason);
	   message.channel.send(`${wUser.tag} đã bị cấm khỏi máy chủ.`)
		
	}
	
}

module.exports.help = {
	name: "warn"
}
