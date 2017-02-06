/**
 * Function for shallow comparison between two objects
 * https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
 */
const hasOwn = Object.prototype.hasOwnProperty;

function shallowEqual(a, b) { // eslint-disable-line flowtype/require-parameter-type
    if (a === b) {
        return true;
    }

    let countA = 0;
    let countB = 0;

    for (const key in a) { // eslint-disable-line no-restricted-syntax
        if (hasOwn.call(a, key) && a[key] !== b[key]) {
            return false;
        }

        countA += 1;
    }

    for (const key in b) { // eslint-disable-line no-restricted-syntax
        if (hasOwn.call(b, key)) {
            countB += 1;
        }
    }

    return countA === countB;
}

export default shallowEqual;
