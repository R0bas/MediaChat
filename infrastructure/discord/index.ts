import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import path from "path";
import fs from "fs";

class Command {
  data!: SlashCommandBuilder;
  execute!: CallableFunction;
}
class ClientWithCommands extends Client {
  commands!: Collection<string, Command>;
}

const client: ClientWithCommands = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
}) as ClientWithCommands;

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs
  .readdirSync(foldersPath)
  .filter((file) => file.endsWith(".js"));

(async () => {
  for (const folder of commandFolders) {
    const filePath = path.join(foldersPath, folder);
    const command: Command = await import(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
})();
const deployCommands = async () => {
  const commands = client.commands.map((command) => command.data.toJSON());
  if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_GUILD_ID) {
    throw new Error("No Discord token, client ID, or guild ID found in environment variables.");
  }
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN); await rest.put(
  Routes.applicationGuildCommands(
    process.env.DISCORD_CLIENT_ID,
    process.env.DISCORD_GUILD_ID
  ),
  { body: commands }
);

};
client.once(Events.ClientReady, (readyClient) => {
   deployCommands();
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = (interaction.client as ClientWithCommands).commands.get(
    interaction.commandName
  );

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

export default client;
