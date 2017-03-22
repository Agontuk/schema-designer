/**
 * @flow
 */
export function isFractionType(type: string): boolean {
    const fractionType = ['decimal', 'double', 'float'];

    return fractionType.indexOf(type) !== -1;
}

export function getInitialState() {
    // Check if state is stored in localStorage
    const localData = window.localStorage.getItem('schema');

    if (localData) {
        try {
            const jsonData = JSON.parse(localData);

            return jsonData;
        } catch (error) {
            // Invalid JSON data, clear localStorage
            window.localStorage.removeItem('schema');

            console.log('Unable to parse json data from' // eslint-disable-line no-console
                + ' localStorage, starting from scratch');

            return {};
        }
    }

    return {};
}
