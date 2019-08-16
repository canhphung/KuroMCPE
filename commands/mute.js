const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bạn không có quyền để làm điều này.");
  if(args[0] == "help"){
    message.reply("Sử dụng: !tempmute <người dùng> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Không thể tìm thấy người dùng này.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Không thể mute người này!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Vui lòng thêm thời gian và lý do.");
  
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("Bạn chưa thêm thời gian!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Xin chào! Bạn đang bị mute trong ${mutetime} vì vi phạm luật của chúng tôi!`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute thực hiện bởi ${message.author}`)
  .setColor("#00ff00")
  .addField("Mute người dùng", tomute)
  .addField("Muted ở", message.channel)
  .addField("Vào", message.createdAt)
  .addField("Thời gian", mutetime)
  .addField("Lí do", reason);

  let reportschannel = message.guild.channels.find(`name`, "reports");
  if(!reportschannel) return message.reply("Please create a incidents channel first!");
  reportschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> đã được bỏ mute!`);
  }, ms(mutetime));


//end of module
}
module.exports.help = {
  name: "mute"
}