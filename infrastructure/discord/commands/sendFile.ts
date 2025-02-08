import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Media } from "../../../domain/entities/Media";
import { getFileContentType } from "../utils";
import {
  MediachatOptions,
  PositionX,
  PositionY,
} from "../../../domain/entities/MediaChat";
import { SendMediaChat } from "../../socket/SendMediaChat";
import { CreateMediaChat } from "../../../application/usecases/CreateMediaChat";
import { io } from "../../../app";
import { Author } from "../../../domain/entities/Author";

export const data = new SlashCommandBuilder()
  .setName("sendfile")
  .setDescription("Send a file to the channel")
  .addAttachmentOption((option) =>
    option.setRequired(true).setName("file").setDescription("File to send")
  )
  .addStringOption((option) =>
    option.setName("positionx").setDescription("left / center / right")
  )
  .addStringOption((option) =>
    option.setName("positiony").setDescription("top / center / bottom")
  )
  .addStringOption((option) =>
    option.setName("text").setDescription("add text")
  )
  .addStringOption((option) =>
    option.setName("text_positionx").setDescription("center")
  )
  .addStringOption((option) =>
    option.setName("text_positiony").setDescription("top / center / bottom")
  )
  .addStringOption((option) =>
    option.setName("text_color").setDescription("Code hexa de la couleur")
  )
  .addStringOption((option) =>
    option.setName("text_font").setDescription("font")
  )
  .addIntegerOption((option) =>
    option.setName("text_font_size").setDescription("font size")
  )
  .addNumberOption((option) =>
    option.setName("duration").setDescription("durée d'affichage du média")
  )
  .addBooleanOption((option) =>
    option.setName("anonymous").setDescription("true / false")
  )
  /*   .addIntegerOption((option) =>
    option
      .setName("timestamp")
      .setDescription("A partir de quand la vidéo doit être jouée")
  ) */
  /*  .addBooleanOption((option) =>
    option.setName("muted").setDescription("true / false")
  ) */
  /*   .addBooleanOption((option) =>
    option.setName("greenscreen").setDescription("true / false")
  ) */
  .addUserOption((option) =>
    option.setName("user").setDescription("Envoyer à un utilisateur")
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const file = interaction.options.getAttachment("file");

  if (!file) {
    await interaction.reply("No file provided.");
    return;
  }

  const media: Media = {
    type: getFileContentType(file.contentType || ""),
    url: file.url,
    id: file.id,
  };

  const mediaChatOptions: MediachatOptions = {
    file: {
      positionX: (interaction.options.getString("positionx") ||
        "center") as unknown as PositionX,
      positionY: (interaction.options.getString("positiony") ||
        "center") as unknown as PositionY,
    },
    text: {
      positionX: (interaction.options.getString("positionx") ||
        "center") as unknown as PositionX,
      positionY: (interaction.options.getString("positiony") ||
        "center") as unknown as PositionY,
      color: interaction.options.getString("text_color") || "#000000",
      fontSize: interaction.options.getInteger("text_font_size") || 16,
      fontFamily: interaction.options.getString("text_font") || "Arial",
    },
    hideAuthor: interaction.options.getBoolean("anonymous") || false,
  };
  const sendMediaChat = new SendMediaChat(io);
  const createMediaChat = new CreateMediaChat(sendMediaChat);
  const author: Author = {
    id: interaction.user.id,
    name: interaction.user.username,
    image: interaction.user.avatarURL() || "",
  };
  let duration = interaction.options.getNumber("duration") || null;
  if (!duration && media.type === "image") {
    duration = 5;
  }
 try {
   await createMediaChat.execute(
      author,
      duration,
      media,
      interaction.options.getString("text") || "",
      mediaChatOptions
    );
    await interaction.reply("Media sent.");
  }
    catch (error) {
        console.error(error);
        await interaction.reply("An error occurred.");
    }
};
