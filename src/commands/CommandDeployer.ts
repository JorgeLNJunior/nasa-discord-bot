import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { EnvService } from '../config/EnvService';

export class CommandDeployer {
  constructor(private rest: REST, private envService: EnvService) {}

  async deploy() {
    try {
      const CLIENT_ID = this.envService.get<string>('CLIENT_ID');
      const GUILD_ID = this.envService.get<string>('GUILD_ID');

      const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Pong'),
      ].map(command => command.toJSON());

      this.rest.setToken(this.envService.get<string>('BOT_TOKEN'));

      await this.rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
      console.log('Successfully registered application commands');
    }
    catch (error) {
      console.log(error);
    }
  }
}
