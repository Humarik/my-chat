import React from 'react';
import './header.css'

function Header ({userInfo, setUserInfo}) {
    const rename = () => {
        setUserInfo({isName: false, name: userInfo.name, id: userInfo.id});
    }

    return (
        <div className='header'>
            <div className='header-content'>
                <div className='main-title'>
                    <h1>Chat-Hurma</h1>
                </div>
                <div className='header-user-info' title='Изменить имя' onClick={rename}>
                    <div className='user-name-container'>
                        <span className='user-name'>{`${userInfo.name}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header