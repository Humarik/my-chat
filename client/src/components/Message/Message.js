import React from 'react';
import './message.css';

function Message({message, socketId}) {

    return(
      <>
       { socketId === message.id 
        ?
            <div className='message-container my' id={message.id}>
                <span className='message-text'>{message.msg}</span>
                <div className='dateMassege'>
                    {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </div>
            </div>
        :
            <div className='message-container' id={message.id}>
                <span className='message-text'>{message.msg}</span>
                <div className='dateMassege'>
                    {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </div>
            </div>
       }
      </>
    )
}

export default Message;