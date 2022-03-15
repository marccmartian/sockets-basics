const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente DESconectado", socket.id);
  });

  // RECEPCIONA del cliente (escucha)
  socket.on("send-message-client", (payload, callback) => {
    // console.log(payload);

    // EMITE desde el Server a los clientes
    // broadcast, emite a todos los clientes, excepto al emisor mismo
    socket.broadcast.emit("send-message-server", payload);

    // este callback es para hacer Feedback del server,
    // por ejemplo para indicar si algo salio bien, similar a las respuestas de un rest api
    // solo se le muestra al cliente que emitio
    const message = "respuesta del server, sólo para ti";
    callback(message);
  });
};

module.exports = {
  socketController,
};
