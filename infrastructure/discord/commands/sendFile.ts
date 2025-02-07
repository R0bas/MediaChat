import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

export default{
    data: new SlashCommandBuilder().setName("sendfile").setDescription("Send a file to the channel"),
    async execute(interaction: ChatInputCommandInteraction ) {
        await interaction.reply("This command is not implemented yet")
    }
}