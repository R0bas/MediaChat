import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Media } from "../../../domain/entities/Media";
import {
  MediachatOptions,
  PositionX,
  PositionY,
} from "../../../domain/entities/MediaChat";
import { SendMediaChat } from "../../socket/SendMediaChat";
import { CreateMediaChat } from "../../../application/usecases/CreateMediaChat";
import { io } from "../../../app";
import { Author } from "../../../domain/entities/Author";
import { formatReply,isInstagramPhotoUrl } from "../utils";

export const data = new SlashCommandBuilder()
  .setName("sendurl")
  .setDescription("Send a url")
  .addStringOption((option) =>
    option.setRequired(true).setName("url").setDescription("Url to send")
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
  .addUserOption((option) =>
    option.setName("user").setDescription("Envoyer à un utilisateur")
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const url = interaction.options.getString("url");
  await interaction.deferReply();

  if (!url) {
    await interaction.reply("No url provided.");
    return;
  }

  const cobaltResult = await fetch(
    process.env.COBALT_URL || "",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ url }),
    }
  )
  const cobaltJson = (await cobaltResult.json()) as { status: string; picker?: { url: string }[]; url?: string };
  let newUrl;
  if (cobaltJson.status === "picker") {
    newUrl = cobaltJson.picker && cobaltJson.picker[0] ? cobaltJson.picker[0].url : undefined;
  }
  if (cobaltJson.status === "tunnel") {
    newUrl = cobaltJson.url
  }
  if (cobaltJson.status === "redirect") {
    newUrl = cobaltJson.url
  }

  const media: Media = {
    type: isInstagramPhotoUrl(url) ? "image": "video",
    url: newUrl as string,
    id: url,
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
    target: interaction.options.getUser("user")?.username || "all",
    target_id: interaction.options.getUser("user")?.id || "",
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
   const newMediaChat = await createMediaChat.execute(
      author,
      duration,
      media,
      interaction.options.getString("text") || "",
      mediaChatOptions
    );
    await interaction.editReply(
      formatReply(
        author,
        mediaChatOptions,
        interaction.options.getString("text"),
        newMediaChat.media?.url || interaction.options.getString("url")
      )
    );
  }
    catch (error) {
        console.error(error);
        await interaction.followUp("An error occurred while sending the media chat.");
    }
};
