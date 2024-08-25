module.exports = {
  apps: [
    {
      name: "madata-api",
      cwd: "/var/pm2/apps/madata-api",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        DATABASE_URL: "",
      },
    },
  ],
};
