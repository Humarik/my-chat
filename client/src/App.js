import React, {useEffect, useState} from 'react';
import './App.css';
import MessageInput from './components/Input/MessageInput';
import Message from './components/Message/Message';
import Requests from './requests/requests';

const requests = new Requests();

function App() {
  const [socketId, setSocketId] = useState('');
  const [socket, setSocket] = useState({});
  const [dataMessage, setDataMessage] = useState({
    id: '',
    messages: [],
  });

  useEffect(() => {
    setSocket(requests.connectionSocket('http://localhost:5000'));
  }, []);

  useEffect(() => {
    if(!socket.on) return;
    socket.on('connection', id => {
      setSocketId(id);
      setDataMessage({
        id: id,
        messages: [],
      });
    });
  },[socket]);

  useEffect(() => {
    if(!socket.on) return;

    socket.on('sendMessage', ({id, messages}) => {
      setDataMessage({
        id: dataMessage.id,
        messages: [...dataMessage.messages, {id, msg: messages[messages.length - 1].msg}]
      });
    });
  }, [dataMessage])

  return (
    <div className='container'>
      <div className='container-chat'>
        {dataMessage.messages.map((message, index) => (
          <Message key={index} message={message} socketId={socketId}/>
        ))}
      </div>
      <MessageInput socket={socket} dataMessage={dataMessage} setDataMessage={setDataMessage}/>
    </div>
  );
}

export default App;
