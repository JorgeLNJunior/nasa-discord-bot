import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { Interaction } from 'discord.js';

import { ApodApi } from '../api/apod.api';
import { EnvService } from '../config/EnvService';
import { UrlHelper } from '../helpers/url.helper';


export const apodCommand = {
  data: new SlashCommandBuilder()
    .setName('apod')
    .setDescription('NASA APOD - Astronomy Picture of the Day'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    const apod = await new ApodApi(new EnvService(), axios.create()).find();
    if (apod.media_type === 'video') apod.url = UrlHelper.parseVideoUrl(apod.url);

    await interaction.reply(
      `**APOD** ${apod.date}\n` +
      `**Title**: ${apod.title}\n` +
      `**Explanation**: ${apod.explanation}\n` +
      `**copyright**: ${apod.copyright}\n` +
      `${apod.url}`,
    );
  },
};
