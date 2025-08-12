import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once(Events.ClientReady, c => console.log(`✅ Logged in as ${c.user.tag}`));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: 'pong 🏓', ephemeral: true });
  }
  if (interaction.commandName === 'ask') {
    const course = interaction.options.getString('course', true);
    const title = interaction.options.getString('title', true);
    await interaction.reply({ content: `Creating thread for **${course}**: ${title}`, ephemeral: true });
    const parent = interaction.channel?.isTextBased() ? interaction.channel : null;
    if (parent && 'threads' in parent) {
      await parent.threads.create({ name: `[${course}] ${title}`, autoArchiveDuration: 1440 });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
