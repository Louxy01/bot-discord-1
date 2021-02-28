const Discord = require('discord.js');
const token = require("./token.json");
const bdd = require("./bdd.json");
const fs = require("fs");

const { TIMEOUT } = require('dns');

const bot = new Discord.Client();

// Bot en Ligne
bot.on("ready", async () => {  
    console.log("Le bot est en ligne. ✅")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("en cours de développement.");
    }, 100)
});

// Message de Bienvenue
bot.on("guildMemberAdd", member => {
    bot.channels.cache.get('814901055301091371').send(`Bienvenue sur le serveur ${member}!`);
    member.roles.add('815343823030583307');
    

})

// Clear
bot.on("message", message => {

    if(message.content.startsWith("!clear")){
    message.delete();
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.').then(sent => sent.delete({timeout: 5e3}))
            if(message.member.hasPermission('MANAGE_MESSAGES')){ 

                let args = message.content.trim().split(/ +/g);

            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous avez supprimé ${args[1]} message(s).`).then(sent => sent.delete({timeout: 5e3}))

                }
                else{
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`).then(sent => sent.delete({timeout: 5e3}))
                }
            }
            else{
                 message.channel.send(`Vous devez indiquer un nombre de messages à supprimer !`).then(sent => sent.delete({timeout: 5e3}))
            } 
        }
    }
})

// Commande !mb
bot.on("message", message => {
    if(message.content.startsWith("!mb")){
        message.delete()
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(message.content.length > 5){
                message_bienvenue = message.content.slice(4)
                console.log(message_bienvenue)
                bdd["message-bienevenue"] = message_bienvenue
                Savebdd()
            }
        }
    }
})

// Statut de bot on
bot.on("message", message => {

    if(message.content.startsWith("!staton")){
    message.delete()
    message.channel.send(new Discord.MessageEmbed()
        .setTitle('Statut du bot :')
        .setDescription('Le bot est en ligne. 🟢')
        .setColor('#33FF3D')
        .addField('Développé par :', 'Unknown_')
        .setTimestamp())}
})

// Statut du bot off
bot.on("message", message => {

    if(message.content.startsWith("!statoff")){
    message.delete()
    message.channel.send(new Discord.MessageEmbed()
        .setTitle('Statut du bot :')
        .setDescription('Le bot est déconnecté. 🔴')
        .setColor('#FF0000')
        .addField('Développé par :', 'Unknown_')
        .setTimestamp())}
})

// Statut du bot relancement
bot.on("message", message => {

    if(message.content.startsWith("!statreboot")){
    message.delete()
    message.channel.send(new Discord.MessageEmbed()
        .setTitle('Statut du bot :')
        .setDescription('Le bot est en cours de relancement. 🔵')
        .setColor('#0000FF')
        .addField('Développé par :', 'Unknown_')
        .setTimestamp())}
})


    

// Base de données
function Savebdd() {
    fs.writreFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue. ❌");
    });
}




bot.login(token.token);