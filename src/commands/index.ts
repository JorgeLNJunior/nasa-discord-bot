import { Collection } from 'discord.js';

import { apodCommand } from './apod';

const commands = new Collection();

commands.set(apodCommand.data.name, apodCommand);

export { commands };
