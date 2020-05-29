import openSocket from 'socket.io-client'

class Requests {
    connectionSocket(url) {
        return openSocket(url);
    }
}

export default Requests;