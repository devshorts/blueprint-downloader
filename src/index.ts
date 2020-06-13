#!/usr/bin/env node

import { download } from "./runner";

const { Command } = require('commander');
const program = new Command();

program
  .option('-m, --m3u <name>', 'm3u file')
  .option('-n, --name <name>', 'output file of video')

interface Program {
  m3u: string
  name: string
}

program.parse(process.argv)

const args = program as Program

if(!args.name || !args.m3u) {
  program.help()
  process.exit(0)
}

download({ outputName: args.name, url: args.m3u})


