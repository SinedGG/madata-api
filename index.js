require("dotenv").config();
const fs = require("fs");
const fastify = require("fastify")({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

fastify.register(require("@fastify/cors"), {
  origin: "*",
});
fastify.register(require("@fastify/static"), {
  root: __dirname + "/public",
});

global.$ = __dirname;

registerRouters($ + "/api");
function registerRouters(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = directory + "/" + file;
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      registerRouters(filePath);
    } else if (file == "router.js") {
      const router = require(filePath);
      var prefix = filePath
        .replace($ + "/api", "")
        .replace(".js", "")
        .replace("router", "");
      if (prefix.endsWith("/")) prefix = prefix.slice(0, -1);
      console.log(prefix);
      fastify.register(router, { prefix: prefix });
    }
  });
}

/*
fastify.get("/", (request, reply) => {
  return { hello: "world" };
});
*/
fastify.listen({
  port: 3000,
  host: "0.0.0.0",
  listenTextResolver: (address) => {
    return `Server is listening at ${address}`;
  },
});
