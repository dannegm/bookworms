export const onChange = setter => event => {
    setter(event.target.value);
};

export const retry = async (promiseFunc, { retries = 5, delay = 0 } = {}) => {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await promiseFunc();
            return [result, null];
        } catch (error) {
            if (i === retries - 1) {
                console.log(`Reaching limit of retrys, failing...`);
                return [null, error];
            }
            if (delay > 0) {
                console.log(`Fails, waiting ${delay} secs to retry...`);
                await new Promise(resolve => {
                    console.log(`Retrying...`);
                    setTimeout(resolve, delay);
                });
            }
        }
    }
};
