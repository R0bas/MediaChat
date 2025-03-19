import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { SendMediaChat } from "../../socket/SendMediaChat";
import { CreateMediaChat } from "../../../application/usecases/CreateMediaChat";
import { io } from "../../../app";
import { Author } from "../../../domain/entities/Author";
import {
  MediachatOptions,
  PositionX,
  PositionY,
} from "../../../domain/entities/MediaChat";

export const data = new SlashCommandBuilder()
  .setName("sendtext")
  .setDescription("Envoyer un texte")
  .addStringOption((option) =>
    option.setRequired(true).setName("text").setDescription("add text")
  )
  .addStringOption((option) =>
    option.setName("positionx").setDescription("left / center / right")
  )
  .addStringOption((option) =>
    option.setName("positiony").setDescription("top / center / bottom")
  )
  .addStringOption((option) =>
    option.setName("color").setDescription("Code hexa de la couleur")
  )
  .addNumberOption((option) =>
    option.setName("duration").setDescription("durée d'affichage du texte")
  )
  .addStringOption((option) => option.setName("font").setDescription("font"))
  .addIntegerOption((option) =>
    option.setName("font_size").setDescription("font size")
  )
  .addUserOption((option) =>
    option.setName("user").setDescription("Envoyer à un utilisateur")
  );
export const execute = async (interaction: ChatInputCommandInteraction) => {
  const text = interaction.options.getString("text");
  if (!text) {
    await interaction.reply("No text provided.");
    return;
  }

  const author: Author = {
    id: interaction.user.id,
    name: interaction.user.username,
    image: interaction.user.avatarURL() || "",
  };

  const mediaChatOptions = {
    text: {
      positionX: (interaction.options.getString("positionx") ||
        "center") as unknown as PositionX,
      positionY: (interaction.options.getString("positionx") ||
        "bottom") as unknown as PositionY,
      color: interaction.options.getString("color") || "#ffffff",
      fontSize: interaction.options.getString("font_size") || 24,
      fontFamily: interaction.options.getString("font") || "Arial",
    },
    target: interaction.options.getUser("user")?.username || "all",
  } as MediachatOptions;
  const sendMediaChat = new SendMediaChat(io);
  const createMediaChat = new CreateMediaChat(sendMediaChat);
  try {
    await createMediaChat.execute(
      author,
      interaction.options.getNumber("duration") || 5,
      undefined,
      interaction.options.getString("text") || "",
      mediaChatOptions
    );
    await interaction.reply(
      `<@${author.id}> sent \`\`${text}\`\` to ${
        mediaChatOptions.target === "all"
          ? "everyone"
          : `<@${interaction.options.getUser("user")?.id}>`
      }`
    );
  } catch (error) {
    console.error(error);
    await interaction.reply("An error occurred.");
  }
};
