module.exports = {
  apps: [
    {
      name: "madata-api",
      cwd: "/home/ubuntu/pm/madata-api",
      script: "index.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",

      env: {
        DATABASE_URL: "",
      },
    },
  ],
};
