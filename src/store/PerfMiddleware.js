import Perf from 'react-addons-perf';

const PerfMiddleware = () => (next) => (action) => {
    const key = `performance:${ action.type }`;
    Perf.start();

    // will re-render the application with new state
    const result = next(action);

    Perf.stop();

    console.group(key); // eslint-disable-line no-console

    console.info('wasted'); // eslint-disable-line no-console
    Perf.printWasted();

    console.groupEnd(key); // eslint-disable-line no-console

    return result;
};

export default PerfMiddleware;
