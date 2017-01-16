const LocalstorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    // Save redux store data in localStorage
    window.localStorage.setItem('schema', JSON.stringify(store.getState()));

    return result;
};

export default LocalstorageMiddleware;
