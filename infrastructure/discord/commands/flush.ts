import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { io } from "../../../app";

export const data = new SlashCommandBuilder()
    .setName("flush")
    .setDescription("Flush the queue")
    .setDefaultPermission(false);


    export const execute = async (interaction: ChatInputCommandInteraction) => {
        io.emit('flush');
        await interaction.reply("Queue... flushed... 😳 ");
    }