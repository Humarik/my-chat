import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import MessageInput from '../Input/MessageInput';
import Message from '../Message/Message';
import Requests from '../../requests/requests';
import Popup from '../Popup/Popup';

const requests = new Requests();
const socket = requests.connectionSocket('https://chat-hurma.herokuapp.com/');

function getSomething(state, obj) {
  return [...state, obj]
};

function App() {
  const [state, dispatch] = useReducer(getSomething, []);
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('sendMessage', data => {
      dispatch(data)
    })
  }, []);

  useEffect(() => {
    const chatBody = document.querySelector('.container-chat');
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [state])

  return (
    <>
      {!name && <Popup setName={setName} />}
      <div className='container'>
        <div className='container-chat'>
          <ul className='chat-list'>
            {state.map((message, index) => (
              <Message key={index} message={message} socketId={socket.id} name={name}/>
            ))}
          </ul>
        </div>
        <MessageInput socket={socket} name={name}/>
      </div>
    </>
  );
}

export default App;
