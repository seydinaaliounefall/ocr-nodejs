const app = require("./app");

const server = () =>
  app.listen(process.env.PORT, () => {
    console.info(
      `Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} environment`
    );
  });

server();
