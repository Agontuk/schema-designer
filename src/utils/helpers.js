/**
 * @flow
 */
export function isFractionType(type: string): boolean { // eslint-disable-line
    const fractionType = ['decimal', 'double', 'float'];

    return fractionType.indexOf(type) !== -1;
}
