import 'reflect-metadata';
import './container';

import { Client } from 'discord.js';
import { container, injectable } from 'tsyringe';

import { commands } from './commands';
import { CommandDeployer } from './commands/CommandDeployer';
import { EnvService } from './config/EnvService';

@injectable()
class AppStarter {
  constructor(
    private client: Client,
    private commandDeployer: CommandDeployer,
    private envService: EnvService,
  ) {}

  async run() {
    this.client.commands = commands;
    await this.commandDeployer.deploy();

    this.client.once('ready', () => console.log('Ready'));

    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const command = this.client.commands.get(interaction.commandName);

      command.execute(interaction);
    });

    this.client.login(this.envService.get<string>('BOT_TOKEN'));
  }
}

const app = container.resolve(AppStarter);
app.run();
