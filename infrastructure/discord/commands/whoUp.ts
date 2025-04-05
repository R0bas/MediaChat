import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { io } from "../../../app";

export const data = new SlashCommandBuilder()
    .setName("whosup")
    .setDescription("Who is using the bot?")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const usersList = Array.from(io.sockets.adapter.rooms.entries())
        .filter(([key]) => !io.sockets.sockets.has(key))
        .map(([key]) => key);
    let discordResponse ="";
    if (usersList.length === 0) {
        discordResponse = "No user connected.";
      }
      
      if (usersList.length === 1) {
        discordResponse = `Only ${usersList[0]} is connected.`;
      }
      
      const lastUser = usersList[usersList.length - 1];
      const otherUsers = usersList.slice(0, -1).join(', ');
      
      discordResponse = `${otherUsers} and ${lastUser} are connected.`;

    await interaction.deferReply();
    await interaction.editReply(`${discordResponse}`);
}


