const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // configuracion de websocket (doc)
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};
    this.middlewares();
    this.routes();

    // eventos de sockets
    this.sockets();
  }

  routes() {
    // this.app.use(this.paths.auth, require("../routes/auth"));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  // es el 'server' quien se va a levantar, no el app
  listen() {
    this.server.listen(this.port, () =>
      console.log(`Server running in port ${this.port}`)
    );
  }
}

module.exports = Server;
