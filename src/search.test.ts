import 'jest';
import search, { searchRelavantEntities } from './search';
import { SearchType } from './data-types';

describe('search cli', () => {
    // search users 
    describe(('can search users with all relavent fields returned'), () => {
        // search user by name (string match)
        it('by passing user name', () => {
            const userId = search(SearchType.Users, 'name', 'Russo Vincent')[0]._id;
            expect(userId).toBe(22);
        });
        // search user by id (number match)
        it('by passing user id', () => {
            const userId = search(SearchType.Users, '_id', '27')[0]._id;
            expect(userId).toBe(27);
        });
        // search user by active type (boolean match)
        it('by passing user active type', () => {
            const resultLength = search(SearchType.Users, 'active', 'true').length;
            expect(resultLength).toBe(39);
        });
        // search user by tags (array match)
        it('by passing user tags', () => {
            const userId = search(SearchType.Users, 'tags', 'Chalfant')[0]._id;
            expect(userId).toBe(31);
        });
    });

    // search organizations 
    describe(('can search organizations with all relavent fields returned'), () => {
        // search organizations by name (string match)
        it('by passing organization name', () => {
            const organizationId = search(SearchType.Organizations, 'name', 'Nutralab')[0]._id;
            expect(organizationId).toBe(102);
        });
        // search organizations by id (number match)
        it('by passing organization id', () => {
            const organizationId = search(SearchType.Organizations, '_id', '114')[0]._id;
            expect(organizationId).toBe(114);
        });
        // search organizations by shared_tickets type (boolean match)
        it('by passing user shared_tickets type', () => {
            const resultLength = search(SearchType.Organizations, 'shared_tickets', 'true').length;
            expect(resultLength).toBe(10);
        });
        // search organizations by domain_names (array match)
        it('by passing user domain_names', () => {
            const organizationId = search(SearchType.Organizations, 'domain_names', 'otherway.com')[0]._id;
            expect(organizationId).toBe(118);
        });
    });

    // search tickets 
    describe(('can search tickets with all relavent fields returned'), () => {
        // search tickets by name (string match)
        it('by passing ticket subject name', () => {
            const ticketId = search(SearchType.Tickets, 'subject', 'A Nuisance in Equatorial Guinea')[0]._id;
            expect(ticketId).toBe("95870a6c-22bd-45c3-8d8e-b7f2c7d46b76");
        });
        // search tickets by id (number match)
        it('by passing ticket submitter_id', () => {
            const resultLength = search(SearchType.Tickets, 'submitter_id', '35').length;
            expect(resultLength).toBe(3);
        });
        // search tickets by has_incidents type (boolean match)
        it('by passing ticket has_incidents type', () => {
            const resultLength = search(SearchType.Tickets, 'has_incidents', 'true').length;
            expect(resultLength).toBe(99);
        });
        // search tickets by tags (array match)
        it('by passing  ticket tags', () => {
            const resultLength = search(SearchType.Tickets, 'tags', 'California').length;
            expect(resultLength).toBe(14);
        });
    });

    describe(('can search relavent entities'), () => {
        // return all relavent tickets and user entity when organization is searched 
        it('by organization being searched', () => {
            const organization = search(SearchType.Organizations, 'name', 'Nutralab')[0];
            const results = searchRelavantEntities(SearchType.Organizations, organization);
            expect(results && results.tickets && results.users).toBeDefined;
            if (results && results.tickets && results.users) {
                expect(results.tickets.length).toBe(8);
                expect(results.users.length).toBe(3);
            }
        });
        // return all relavent tickets and organization entity when user is searched 
        it('by user being searched', () => {
            const user = search(SearchType.Users, 'name', 'Russo Vincent')[0];
            const results = searchRelavantEntities(SearchType.Users, user);
            expect(results && results.tickets && results.organizations).toBeDefined;
            if (results && results.tickets && results.organizations) {
                expect(results.tickets.length).toBe(10);
                expect(results.organizations[0]._id).toBe(124);
            }
        });
        // return all relavent user and organization entity when ticket is searched 
        it('by tickets being searched', () => {
            const ticket = search(SearchType.Tickets, 'subject', 'A Nuisance in Equatorial Guinea')[0];
            const results = searchRelavantEntities(SearchType.Tickets, ticket);
            expect(results && results.organizations && results.users).toBeDefined;
            if (results && results.users && results.organizations) {
                expect(results.users.length).toBe(1);
                expect(results.organizations[0]._id).toBe(111);
            }
        });

    });

})