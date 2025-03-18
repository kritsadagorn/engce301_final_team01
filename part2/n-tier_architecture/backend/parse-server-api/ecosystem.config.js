module.exports = {
    apps: [
      {
        name: "wallboard-parse-server",
        script: "./api-wallboard-https.js",
        env_production: {
          NODE_ENV: "production",
        },
        env_development: {
          NODE_ENV: "development",
        },
      },
    ],
  };