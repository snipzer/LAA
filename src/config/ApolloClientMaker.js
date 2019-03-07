const httpie = require('httpie');
const { default: ApolloClient } = require('apollo-boost');

class ApolloClientMaker {
    static getClient(logger) {
        return new Promise((resolve, reject) => {
            try {
                logger.info('Creating apollo client for gitHub...');
                const client = new ApolloClient({
                    uri: `https://api.github.com/graphql?access_token=${process.env.GITHUB_OAUTH}`,
                    fetch: async (uri, options) => {
                        const { method } = options;
                        options.family = 4;
                        options.headers = {
                            ...options.headers,
                            'User-Agent': process.env.GITHUB_ID
                        };
                        const res = await httpie.send(method, uri, options);
                        return {
                            text: async () => JSON.stringify(res.data),
                            json: async () => res.data,
                        };
                    },
                });
                resolve(client);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ApolloClientMaker;
