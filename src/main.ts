import { REST } from '@discordjs/rest';
import { Client, Intents } from 'discord.js';

import { CommandDeployer } from './commands/CommandDeployer';
import { EnvService } from './config/EnvService';

class AppStarter {
  constructor(
    private client: Client,
    private commandDeployer: CommandDeployer,
    private envService: EnvService,
  ) {}

  async run() {
    await this.commandDeployer.deploy();

    this.client.once('ready', () => console.log('Ready'));
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      if (commandName === 'ping') {
        await interaction.reply('Pong!');
      }
    });

    this.client.login(this.envService.get<string>('BOT_TOKEN'));
  }
}

new AppStarter(
  new Client({ intents: Intents.FLAGS.GUILDS }),
  new CommandDeployer(new REST({ version: '9' }), new EnvService()),
  new EnvService(),
).run();
