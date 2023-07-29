const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { ENVURL, roleCheck } = require('../../vars.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('flush')
        .setDescription('flush chat'),
    async execute(interaction) {

        if(roleCheck(interaction)) return;

        const req = await axios.post(ENVURL + "/flush", {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const user = interaction.member.user;
        return interaction.reply("```" + user.username + " à flush le chat !```");
    },
};
