module.exports = {
    apps: [
      {
        name: "wallboard-endpoint-api",
        script: "./webreport-api-https.js",
        env_production: {
          NODE_ENV: "production",
        },
        env_development: {
          NODE_ENV: "development",
        },
      },
    ],
  }; 