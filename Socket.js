const WebSocket = require('ws');

class Socket {
  constructor(server) {
    this.webSocketServer = new WebSocket.Server({ server })

    this.webSocketServer.on('listening', () => {
      console.log('socket listen');
    })

    this.webSocketServer.on('connection', (webSocketClient) => {
      console.log('new connection');
    })
  }

  send(msg) {
    this.webSocketServer.clients.forEach(client => client.send(msg));
  }
}

module.exports = Socket;