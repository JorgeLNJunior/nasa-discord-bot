import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction } from 'discord.js';
import { container } from 'tsyringe';

import { ApodApi } from '../api/apod.api';
import { UrlHelper } from '../helpers/url.helper';


export const apodCommand = {
  data: new SlashCommandBuilder()
    .setName('apod')
    .setDescription('NASA APOD - Astronomy Picture of the Day'),
  async execute(interaction: Interaction) {
    if (!interaction.isCommand()) return;

    interaction.deferReply();

    const api = container.resolve(ApodApi);

    const apod = await api.find();
    if (apod.media_type === 'video') apod.url = UrlHelper.parseVideoUrl(apod.url);

    await interaction.editReply(
      `**APOD** ${apod.date}\n` +
      `**Title**: ${apod.title}\n` +
      `**Explanation**: ${apod.explanation}\n` +
      `**copyright**: ${apod.copyright}\n` +
      `${apod.url}`,
    );
  },
};
