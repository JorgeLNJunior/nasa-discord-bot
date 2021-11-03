import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { Interaction } from 'discord.js';

import { ApodApi } from '../api/apod.api';
import { EnvService } from '../config/EnvService';


export const apodCommand = {
  data: new SlashCommandBuilder()
    .setName('apod')
    .setDescription('Today APOD'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const apod = await new ApodApi(new EnvService(), axios.create()).find();

    await interaction.reply(
      `**APOD** ${apod.date}\n` +
      `**Title**: ${apod.title}\n` +
      `**Explanation**: ${apod.explanation}\n` +
      `**copyright**: ${apod.copyright}\n` +
      `${apod.url}`,
    );
  },
};
