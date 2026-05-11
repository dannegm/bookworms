module.exports = {
    apps: [
        {
            name: 'bucket',
            script: 'server.js',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
