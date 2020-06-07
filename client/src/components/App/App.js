import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import MessageInput from '../Input/MessageInput';
import Message from '../Message/Message';
import Requests from '../../requests/requests';
import Popup from '../Popup/Popup';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import UserList from '../UserList/UserList';

const requests = new Requests();
const socket = requests.connectionSocket('https://chat-hurma.herokuapp.com/');
// const socket = requests.connectionSocket('http://localhost:5000');

function getSomething(state, obj) {
  return [...state, obj]
};

function App() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(getSomething, []);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userName')) || {isName: false, name: '', id: Date.now()} );

  useEffect(() => {
    socket.on('sendMessage', data => {
      dispatch(data)
    })
  }, []);

  useEffect(() => {
    const chatBody = document.querySelector('.chat-content');
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [state])

  useEffect(() => {
    if(!userInfo.isName) {
      
    }else{
      console.log(userInfo);
      socket.emit('users', userInfo);
    }
  }, [userInfo])

  useEffect(() => {
    socket.on('users', (data) => {
      setData(data)
      console.log(data);
    })
  }, [])

  useEffect(() => {
    socket.on('disconnect', (data) => {
      setData(data)
    })
  }, [])

  return (
    <>
      <Header userInfo={userInfo} setUserInfo={setUserInfo}/>
      {!userInfo.isName && <Popup userInfo={userInfo} setUserInfo={setUserInfo}/>}
      <div className='container'>
        <div className='container-chat'>
          <div className='chat-content'>
            <ul className='chat-list'>
              {state.map((message, index) => (
                <Message key={index} message={message} socketId={socket.id} name={userInfo.name}/>
              ))}
            </ul>
          </div>
          <MessageInput socket={socket} name={userInfo.name}/>
        </div>
        <UserList data={data}/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
