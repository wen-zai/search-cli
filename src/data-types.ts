export interface Ticket {
  _id: string;
  url: string;
  external_id: string;
  created_at: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  tags: string[];
  has_incidents: boolean;
  due_at: string;
  via: string;
}

export interface User {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  alias: string;
  created_at: string;
  active: boolean;
  verified: boolean;
  shared: boolean;
  locale: string;
  timezone: string;
  last_login_at: string;
  email: string;
  phone: string;
  signature: string;
  organization_id: number;
  tags: string[];
  suspended: boolean;
  role: string;
}

export interface Organization {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}

export interface DataStore {
  users: User[];
  tickets: Ticket[];
  organizations: Organization[];
}

export const dataStore: DataStore = {
  users: require("../dataset/users.json"),
  tickets: require("../dataset/tickets.json"),
  organizations: require("../dataset/organizations.json"),
};

function convertOrganizationToMapById(sourceArray: Organization[]) {
  const map: Map<number, Organization> = new Map();
  for (const arrayElement of sourceArray) {
    map.set(arrayElement._id, arrayElement);
  }
  return map;
}


function convertArrayToMapByOrganizationId(sourceArray: any[]) {
  const map: Map<number, Ticket[] | User[]> = new Map();
  for (const arrayElement of sourceArray) {
    const existingElement = map.get(arrayElement.organization_id);
    if (existingElement) {
      existingElement.push(arrayElement);
      map.set(arrayElement.organization_id, existingElement);
    } else {
      map.set(arrayElement.organization_id, [arrayElement]);
    }
  }
  return map;
}

// convert organizations to map by its id
// convert users and tickets to map by organization id
export const organizationsMap = convertOrganizationToMapById(dataStore.organizations);
export const ticketsMapByOrganizationId = convertArrayToMapByOrganizationId(dataStore.tickets);
export const usersMapByOrganizationId = convertArrayToMapByOrganizationId(dataStore.users);


export enum SearchType {
  Organizations = "organizations",
  Tickets = "tickets",
  Users = "users",
}

