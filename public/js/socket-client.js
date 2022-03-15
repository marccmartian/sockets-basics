// Aqui esta la configuración y comunicación del websocket con el servidor

const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const txtMessage = document.querySelector("#txtMessage");
const btnSubmit = document.querySelector("#btnSubmit");

const socket = io();

socket.on("connect", () => {
  // console.log("conectado");
  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  // console.log("desconectado");

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

// EMITE desde el cliente al server
btnSubmit.addEventListener("click", () => {
  const message = txtMessage.value;
  const payload = {
    id: "123abc",
    message,
    date: new Date().getTime(),
  };

  // el ultimo param es el callback para respuesta del server al cliente que emite
  socket.emit("send-message-client", payload, (id) => {
    console.log("Desde el server", id);
  });
});

// ESCUCHA al server
socket.on("send-message-server", (payload) => {
  console.log(payload);
});
