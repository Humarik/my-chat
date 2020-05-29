import React from 'react';
import './messageInput.css';

function MessageInput ({socket, dataMessage, setDataMessage}) {
    const craeteMessage = (e) => {
        if(e.keyCode !== 13) return;

        const inputMessage = document.querySelector('.message-input');
        const body = {
            id: dataMessage.id,
            messages: [
                ...dataMessage.messages, 
                {id: dataMessage.id, msg: inputMessage.value}
            ]
        }
        socket.emit('sendMessage', body);
        
        setDataMessage(body);
        inputMessage.value = '';
    }

    return(
        <input className='message-input' onKeyDown={craeteMessage}/>
    )
};

export default MessageInput;