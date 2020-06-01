import React, {useEffect, useReducer} from 'react';
import './App.css';
import MessageInput from './components/Input/MessageInput';
import Message from './components/Message/Message';
import Requests from './requests/requests';

const requests = new Requests();
const socket = requests.connectionSocket('https://chat-hurma.herokuapp.com/');

function getSomething(state, obj) {
  return [...state, obj]
};

function App() {
  const [state, dispatch] = useReducer(getSomething, []);

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
    <div className='container'>
      <div className='container-chat'>
        <ul className='chat-list'>
          {state.map((message, index) => (
            <Message key={index} message={message} socketId={socket.id}/>
          ))}
        </ul>
      </div>
      <MessageInput socket={socket}/>
    </div>
  );
}

export default App;
