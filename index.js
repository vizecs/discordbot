const Discord = require('discord.js');
const { prefix, token, giphytoken } = require('./config.json');
const client = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphytoken)

client.once('ready', () => {
    console.log(`Bot is ready. Logged in as ${client.user.tag}!`)
    client.user.setActivity("v.help | vented.000webhostapp.com", {type: "PLAYING"});
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'new-members');
    if (!channel)
        return;

    channel.send(`Welcome to the server, ${member}`);
})

client.on('message', message => {
    // console.log(message.content); reference
    // message.channel.send("Kick"); reference

    if (message.author.bot)
        return;

    if (message.channel.type == "dm")
        return;

    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.content.startsWith(`${prefix}users`)) {
            console.log("users command enabled");
            var member_count = message.guild.memberCount;
            message.channel.send(`You have ${member_count} members in your server`);
            console.log("users command disabled");
        }
    }

    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
        if (message.content.startsWith(`${prefix}kick`)) {
            let member = message.mentions.members.first();
            console.log("kick command enabled");

            member.kick().then((member) => {
                giphy.search('gifs', {"q" : "anime bye"}) 
                    .then((response) => {
                        var totalreponses = response.data.length;
                        var responseindex = Math.floor((Math.random() * 10) + 1) % totalreponses;
                        var responsefinal = response.data[responseindex];

                        message.channel.send(":wave: " + member.displayName + " has been kicked from the server", {
                            files: [responsefinal.images.fixed_height.url]
                        })
                    }).catch(() => {
                        message.channel.send('Error!');
                    })
            })

            console.log("kick command disabled");
        }
    
        if (message.content.startsWith(`${prefix}ban`)) {
            let member = message.mentions.members.first();
            console.log("ban command enabled");

            member.ban().then((member) => {
                giphy.search('gifs', {"q" : "anime bye"}) 
                    .then((response) => {
                        var totalreponses = response.data.length;
                        var responseindex = Math.floor((Math.random() * 10) + 1) % totalreponses;
                        var responsefinal = response.data[responseindex];

                        message.channel.send(":wave: " + member.displayName + " has been banned from the server", {
                            files: [responsefinal.images.fixed_height.url]
                        })
                    }).catch(() => {
                        message.channel.send('Error!');
                    })
            })

            console.log("ban command disabled");
        }
    }

    if (message.content.startsWith(`${prefix}help`)) {
        const Embed = new Discord.RichEmbed()
            .setTitle("Help Command")
            .setColor(0xFFFFFF)
            .setAuthor("Bot made by vented")
            .setDescription(`Prefix: v.\n \nUser Commands:\n howgay (this just gets a random number and displays it in the current channel)\n avatar (sends a url of your discord pfp and displays it in the current channel)\n \nAdmin Commands:\n kick <mention a user> (kicks the mentioned person from the server)\n ban <mention a user> (bans the mentioned person from the server)`);

            console.log("help command enabled");
        message.channel.send(Embed);
        console.log("help command disabled");
    }

    if (message.content.startsWith(`${prefix}avatar`)) {
        console.log("avatar command enabled");
        message.channel.send(`${message.author.avatarURL}`);
        console.log("avatar command disabled");
    }

    if (message.content.startsWith(`${prefix}howgay`)) {
        console.log("howgay command enabled");
        var percent = Math.floor((Math.random() * 100));
        message.channel.send(`${message.author}, you are ${percent}% gay`);
        console.log("howgay command disabled");
    }
})

client.login(process.env.token);
