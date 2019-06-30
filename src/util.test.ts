import 'jest';
import { isStringEqualCaseInsensitive, isArrayIncludeElementCaseInsensitive } from './utils';

describe(('utils'), () => {

    it('can check if string is equal while case is insensitive', () => {
        expect(isStringEqualCaseInsensitive('wew', 'WEw')).toBeTruthy;
        expect(isStringEqualCaseInsensitive('wew', 'WEws')).toBeFalsy;
    });

    it('can check if an array contains a certain element while case is insensitive', () => {
        expect(isArrayIncludeElementCaseInsensitive(['asd', 'fg', 'ks'], 'Ks')).toBeTruthy;
        expect(isArrayIncludeElementCaseInsensitive(['asd', 'fg', 'ks'], 'aww')).toBeFalsy;
    });

});
