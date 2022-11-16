export default function createMetaObject(schema) {
    return class MetaObject {
        constructor(params) {
            Object.keys(params)
                .forEach((name) => {
                    const value = params[name];

                    this[name] = value;
                });

            let missedParams = [];

            Object.keys(schema)
                .forEach((name) => {
                    if (typeof params[name] === 'undefined') {
                        missedParams = [
                            ...missedParams,
                            name,
                        ];
                    }
                });

            if (missedParams.length > 0) {
                throw new Error(`Required parameters (${missedParams.join(', ')}) were missed.`);
            }
        }
    };
}
