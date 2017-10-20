module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'api',
            script: './server/index.js',
            watch: true,
            //ignore_watch : ["./server/node_modules", "./server/logs"]
            ignore_watch : ["node_modules", "logs"]
        },

        // Second application
        {
            name: 'watcherman',
            script: './watcherman/index.js',
            watch: true,
            //ignore_watch : ["./watcherman/node_modules", "./watcherman/logs"]
            ignore_watch : ["node_modules", "logs"]
        }
    ]
};
