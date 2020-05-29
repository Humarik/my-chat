import React from 'react';
import './message.css';

function Message({message, socketId}) {

    return(
      <>
       { socketId === message.id 
        ?
            <div className='message-container my' id={message.id}>
                <span className='message-text'>{message.msg}</span>
                <div>Ты</div>
            </div>
        :
            <div className='message-container' id={message.id}>
                <span className='message-text'>{message.msg}</span>
            </div>
       }
      </>
    )
}

export default Message;