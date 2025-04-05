import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { io } from "../../../app";

export const data = new SlashCommandBuilder()
    .setName("whoup")
    .setDescription("Who is using the bot?")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const usersList = Array.from(io.sockets.adapter.rooms.entries())
        .filter(([key]) => !io.sockets.sockets.has(key))
        .map(([key]) => key);
    let discordResponse ="";
    if (usersList.length === 0) {
        discordResponse = "Aucun utilisateur n'est actuellement connecté.";
      }
      
      if (usersList.length === 1) {
        discordResponse = `${usersList[0]} est actuellement connecté.`;
      }
      
      const lastUser = usersList[usersList.length - 1];
      const otherUsers = usersList.slice(0, -1).join(', ');
      
      discordResponse = `${otherUsers} et ${lastUser} sont actuellement connectés.`;

    await interaction.deferReply();
    await interaction.editReply(`${discordResponse}`);
}


