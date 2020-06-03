import React from 'react';
import './popup.css';

function Popup({setName}) {
    const enterName = (e) => {
        if(e.keyCode !== 13 || !e.target.value.trim()) return;

        localStorage.setItem(
            'userName', 
            JSON.stringify({isName: true, name: e.target.value.trim()})
        );
        setName({isName: true, name: e.target.value.trim()});
        e.target.value = '';
    };

    return(
        <div className='popup-wrapper'>
            <div className='popup-container'>
                <div className='popup-content'>
                    <input autoFocus={true} onKeyDown={enterName} maxLength='15' className='name-input' placeholder='Укажите ваше имя'></input>
                </div>
            </div>
        </div>
    )
}

export default Popup;