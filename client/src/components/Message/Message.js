import React from 'react';
import './message.css';

function Message({message, socketId}) {

    return(
      <>
        {
            socketId === message.id 
            ?
            <li className='message-container my' id={message.id}>
                <h7 className='you'>Вы</h7>
                <span className='message-text'>{message.msg}</span>
                <div className='dateMassege'>
                        {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </div>
            </li>
            :
            <li className='message-container' id={message.id} >
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