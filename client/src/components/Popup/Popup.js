import React from 'react';
import './popup.css';

function Popup({setUserInfo, userInfo}) {
    const enterName = (e) => {
        if(e.keyCode !== 13 || !e.target.value.trim()) return;
        
        const copyUserName = Object.assign({}, userInfo);
        copyUserName.isName = true;
        copyUserName.name = e.target.value.trim();

        localStorage.setItem(
            'userName', 
            JSON.stringify(copyUserName)
        );

        setUserInfo(copyUserName);
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