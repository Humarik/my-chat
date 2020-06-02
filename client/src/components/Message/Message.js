import React from 'react';
import './message.css';

function Message({message, socketId, name}) {

    return(
      <>
        {
            socketId === message.id 
            ?
            <li className='message-container my' id={message.id}>
                <div className='you'>{name}</div>
                <span className='message-text'>{message.msg}</span>
                <div className='dateMassege'>
                        {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </div>
            </li>
            :
            <li className='message-container' id={message.id} >
                <div className='you'>{message.name}</div>
                <span className='message-text'>{message.msg}</span>
                <div className='dateMassege'>
                    {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </div>
            </li>
        }
      </>
    )
}

export default Message;