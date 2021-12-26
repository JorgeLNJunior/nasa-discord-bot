import { REST } from '@discordjs/rest';
import axios from 'axios';
import { Client, Intents } from 'discord.js';
import { container } from 'tsyringe';

import { CommandDeployer } from './commands/CommandDeployer';
import { EnvService } from './config/EnvService';

container.register('axios.instance', { useValue: axios.create() });
container.register(EnvService, { useClass: EnvService });
container.register(Client, { useValue: new Client({ intents: Intents.FLAGS.GUILDS }) });
container.register(CommandDeployer, {
  useValue: new CommandDeployer(
    new REST({ version: '9' }),
    new EnvService,
  ),
});
