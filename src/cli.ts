import { Command } from 'commander';
import { configPath } from './config.js';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { cachePath } from './cache.js';

const { version, description } = $package;

const program = new Command();

if(!existsSync(cachePath)) {
	mkdirSync(cachePath, { recursive: true });
}

if(!existsSync(configPath)) {
	writeFileSync(configPath, '{}');
}

program
	.name('mcpm')
	.description(description)
	.version(version)
	.option('-m, --mc', 'Which Minecraft version to use')
	.option('-p, --pack <name>', 'Which modpack to use')
	.option('-l, --loader <loader>', 'Which mod loader to use');

import config from './commands/config.js';
program
	.command('config')
	.alias('i')
	.description('Change configuration options')
	.argument('<key>', 'Which option to change')
	.argument('[value]', 'The value for the option. If not provided, the option will be read.')
	.action(config);

import install from './commands/install.js';
program
	.command('install')
	.alias('i')
	.description('Install a Minecraft mod or modpack')
	.argument('<mod>', 'mod or modpack')
	.action(install);

import use from './commands/use.js';
program
	.command('use')
	.description('Use/load a Minecraft version, mod, or modpack')
	.argument('[mod]', 'MC mod')
	.action(use);

program.parse();
