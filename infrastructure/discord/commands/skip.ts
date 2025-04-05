import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { io } from "../../../app";

export const data = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the current media chat")
    .setDefaultPermission(false);


    export const execute = async (interaction: ChatInputCommandInteraction) => {
        io.emit('skip');
        await interaction.reply("Skibidi Skipped 🚽🧌");
    }