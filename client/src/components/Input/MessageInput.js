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
        <textarea className='message-input' onKeyDown={(e) => {
            const inputMessage = document.querySelector('.message-input');
            inputMessage.style.height = 'auto';
            inputMessage.style.height = inputMessage.scrollHeight + 'px';
            craeteMessage(e);
        }} placeholder='Введите свое сообщение'/>
    )
};

export default MessageInput;