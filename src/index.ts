#!/usr/bin/env node
import chalk from "chalk";
import figlet from 'figlet';
import program from "commander";
import search from './search';
import { dataStore, SearchType, DataStore} from "./data-types";
import { splitArguments } from "./utils";
import { isUndefined } from "util";

console.log(
  chalk.red(
    figlet.textSync("search-cli", { horizontalLayout: "full" })
  )
);

program
  .version("0.0.1")
  .description("a simple search cli")
  .option("-u, --user <field value pair>", "search users by passing an entry (field,value)")
  .option("-t, --tickets <field value pair>", "search tickets by passing an entry (field,value)")
  .option("-o, --organizations <field value pair>", "search organizations by passing an entry (field,value)")
  .parse(process.argv);

function isValidInputArguments<T extends keyof DataStore>(searchType: T, field: string, value: string) {
  if (isUndefined(field) || isUndefined(value)) {
    throw Error('field or value is not given properly');
  }
  if (!dataStore[searchType][0].hasOwnProperty(field)) {
    throw Error('input field is not found.');
  }
}

if (program.user) {
  const { field, value } = splitArguments(program.user)
  isValidInputArguments(SearchType.Users, field, value);
  search(SearchType.Users, field, value);
}

if (program.tickets) {
  const { field, value } = splitArguments(program.tickets)
  isValidInputArguments(SearchType.Tickets, field, value);
  search(SearchType.Tickets, field, value);
}

if (program.organizations) {
  const { field, value } = splitArguments(program.organizations)
  isValidInputArguments(SearchType.Organizations, field, value);
  search(SearchType.Organizations, field, value);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}