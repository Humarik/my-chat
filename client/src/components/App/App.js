import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import MessageInput from '../Input/MessageInput';
import Message from '../Message/Message';
import Requests from '../../requests/requests';
import Popup from '../Popup/Popup';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const requests = new Requests();
const socket = requests.connectionSocket('https://chat-hurma.herokuapp.com/');

function getSomething(state, obj) {
  return [...state, obj]
};

function App() {
  const [state, dispatch] = useReducer(getSomething, []);
  const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('userName')) || {isName: false, name: ''} );

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
      <Header userName={userName} setUserName={setUserName}/>
      {!userName.isName && <Popup setName={setUserName}/>}
      <div className='container'>
        <div className='container-chat'>
          <ul className='chat-list'>
            {state.map((message, index) => (
              <Message key={index} message={message} socketId={socket.id} name={userName.name}/>
            ))}
          </ul>
        </div>
        <MessageInput socket={socket} name={userName.name}/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
