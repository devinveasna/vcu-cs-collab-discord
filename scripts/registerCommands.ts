import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Latency check'),
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Create a help thread')
    .addStringOption(o => o.setName('course').setDescription('e.g., CS-250').setRequired(true))
    .addStringOption(o => o.setName('title').setDescription('Short problem title').setRequired(true)),
].map(c => c.toJSON());

const appId = process.env.DISCORD_APP_ID!;
const guildId = process.env.DEV_GUILD_ID!;
const token = process.env.DISCORD_TOKEN!;

(async () => {
  const rest = new REST({ version: '10' }).setToken(token);
  try {
    console.log('⏫ Registering guild commands…');
    await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commands });
    console.log('✅ Commands registered');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
