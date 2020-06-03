import React from 'react';
import './header.css'

function Header ({userName, setUserName}) {
    const rename = () => {
        setUserName({isName: false, name: userName.name});
    }

    return (
        <div className='header'>
            <div className='header-content'>
                <div className='main-title'>
                    <h1>Chat-Hurma</h1>
                </div>
                <div className='header-user-info' title='Изменить имя' onClick={rename}>
                    <div className='user-name-container'>
                        <span className='user-name'>{`${userName.name}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header