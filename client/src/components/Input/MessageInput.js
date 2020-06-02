import React from 'react';
import './messageInput.css';

function MessageInput ({socket, name}) {
    const craeteMessage = (e) => {
        if(e.keyCode !== 13 || !e.target.value.trim()) return;

        e.preventDefault(); 
        const inputMessage = e.target;
        socket.emit('sendMessage', {id: socket.id, msg: inputMessage.value, name});
        inputMessage.value = '';
        inputMessage.style.cssText = 'height:36px';
    }

    return(
        <textarea className='message-input' onKeyDown={(e) => {
            const inputMessage = e.target;
            inputMessage.style.cssText = 'height:auto; padding:0';
            inputMessage.style.cssText = 'height:' + inputMessage.scrollHeight + 'px';
            craeteMessage(e);
        }} placeholder='Напишите сообщение...'/>
    )
};

export default MessageInput;