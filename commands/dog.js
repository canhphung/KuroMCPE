const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {
	
	let {body} = await superagent
	.get(`https://random.dog/woof.json`);
	
	let dogembed = new Discord.RichEmbed()
	.setColor("#00ff00")
	.setTitle("Chú chó random sẽ xuất hiện tại đây 👇")
	.setImage(body.url)
	.setDescription("Nguồn: random.dog");
	message.channel.send(dogembed);
	
	
}

module.exports.help = {
	name: "concho"
}