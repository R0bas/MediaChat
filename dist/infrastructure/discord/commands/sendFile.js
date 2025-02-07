"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../utils");
const SendMediaChat_1 = require("../../socket/SendMediaChat");
const CreateMediaChat_1 = require("../../../application/usecases/CreateMediaChat");
const app_1 = require("../../../app");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName("sendfile")
    .setDescription("Send a file to the channel")
    .addAttachmentOption((option) => option.setRequired(true).setName("file").setDescription("File to send"))
    .addStringOption((option) => option.setName("positionx").setDescription("left / center / right"))
    .addStringOption((option) => option.setName("positiony").setDescription("top / center / bottom"))
    .addStringOption((option) => option.setName("text").setDescription("add text"))
    .addStringOption((option) => option.setName("text_positionx").setDescription("center"))
    .addStringOption((option) => option.setName("text_positiony").setDescription("top / center / bottom"))
    .addStringOption((option) => option.setName("text_color").setDescription("Code hexa de la couleur"))
    .addStringOption((option) => option.setName("text_font").setDescription("font"))
    .addIntegerOption((option) => option.setName("text_font_size").setDescription("font size"))
    .addNumberOption((option) => option.setName("duration").setDescription("durée d'affichage du média"))
    .addBooleanOption((option) => option.setName("anonymous").setDescription("true / false"))
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
    .addUserOption((option) => option.setName("user").setDescription("Envoyer à un utilisateur"));
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const file = interaction.options.getAttachment("file");
    console.log(file);
    if (!file) {
        yield interaction.reply("No file provided.");
        return;
    }
    const media = {
        type: (0, utils_1.getFileContentType)(file.contentType || ""),
        url: file.url,
        id: file.id,
    };
    const mediaChatOptions = {
        file: {
            positionX: (interaction.options.getString("positionx") ||
                "center"),
            positionY: (interaction.options.getString("positiony") ||
                "center"),
        },
        text: {
            positionX: (interaction.options.getString("positionx") ||
                "center"),
            positionY: (interaction.options.getString("positiony") ||
                "center"),
            color: interaction.options.getString("text_color") || "#000000",
            fontSize: interaction.options.getInteger("text_font_size") || 16,
            fontFamily: interaction.options.getString("text_font") || "Arial",
        },
        hideAuthor: interaction.options.getBoolean("anonymous") || false,
    };
    const sendMediaChat = new SendMediaChat_1.SendMediaChat(app_1.io);
    const createMediaChat = new CreateMediaChat_1.CreateMediaChat(sendMediaChat);
    const author = {
        id: interaction.user.id,
        name: interaction.user.username,
        image: interaction.user.avatarURL() || "",
    };
    let duration = interaction.options.getNumber("duration") || null;
    if (!duration && media.type === "image") {
        duration = 5;
    }
    try {
        yield createMediaChat.execute(author, duration, media, interaction.options.getString("text") || "", mediaChatOptions);
        yield interaction.reply("Media sent.");
    }
    catch (error) {
        console.error(error);
        yield interaction.reply("An error occurred.");
    }
});
exports.execute = execute;
//# sourceMappingURL=sendFile.js.map