import { DataStore, dataStore, Organization, User, Ticket, organizationsMap, SearchType, 
    ticketsMapByOrganizationId, usersMapByOrganizationId } from './data-types';
import { isArray } from 'util';
import chalk from "chalk";
require("console.table");
import { isStringEqualCaseInsensitive, isArrayIncludeElementCaseInsensitive, printResult } from './utils';




export default function search(searchType: SearchType, searchField: string, searchContent: string) {
    const results = [];
    // full-value search
    for (const dataElement of dataStore[searchType]) {
        const fieldValue = (dataElement as any)[searchField];
        //  case-insentive string match 
        if (typeof fieldValue === "string" && isStringEqualCaseInsensitive(fieldValue, searchContent)) {
            results.push(dataElement);
        } else if (isArray(fieldValue) && isArrayIncludeElementCaseInsensitive(fieldValue, searchContent)) {
            results.push(dataElement);
        } else if (typeof fieldValue === "number" && fieldValue === Number(searchContent)) {
            results.push(dataElement);
        } else if (typeof fieldValue === "boolean" && fieldValue === Boolean(searchContent)) {
            results.push(dataElement);
        }
    }

    printResult(searchType, results);
    for (const resultElement of results) {
// tslint:disable-next-line: no-console
        console.log(chalk.blue.bold(`search results of relavant entities for ${searchType} with id: 
        ${resultElement._id}:`));
        searchRelavantEntities(searchType, resultElement);

    }
    return results;
}

// Get relavant Users and Tickets entities from the map created based on organization_id 
// Get relavant organization entities from the map created based on its id 
export function searchRelavantEntities(searchType: SearchType, 
    result: Organization | User | Ticket): Partial<DataStore> {
    let organizationId;
    let organization;
    let tickets;
    let users;
    switch (searchType) {
        case SearchType.Users:
            organizationId = (result as User).organization_id;
            organization = organizationsMap.get(organizationId) as Organization;
            tickets = ticketsMapByOrganizationId.get(organizationId) as Ticket[];
            printResult(SearchType.Organizations, organization);
            printResult(SearchType.Tickets, tickets);
            return { ...{ organizations: [organization] }, ...{ tickets } }
        case SearchType.Tickets:
            organizationId = (result as Ticket).organization_id;
            organization = organizationsMap.get(organizationId) as Organization;
            users = usersMapByOrganizationId.get(organizationId) as User[];
            printResult(SearchType.Organizations, organization);
            printResult(SearchType.Users, users);
            return { ...{ organizations: [organization] }, ...{ users } }
        case SearchType.Organizations:
            organizationId = (result as Organization)._id;
            tickets = ticketsMapByOrganizationId.get(organizationId) as Ticket[];
            users = usersMapByOrganizationId.get(organizationId) as User[];
            printResult(SearchType.Tickets, tickets);
            printResult(SearchType.Users, users);
            return { tickets, users };
    }
}

