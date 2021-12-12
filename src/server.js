const http = require("http");
const router = require("./router");
const server = http.createServer(router);

server.listen(7003, () => console.log(`Listening at http://localhost:7003`));
