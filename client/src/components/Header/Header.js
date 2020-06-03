import React from 'react';
import './header.css'

function Header ({name}) {
    return (
        <div className='header'>
            <div className='header-content'>
                <div className='main-title'>
                    <h1>Chat-Hurma</h1>
                </div>
                <div className='header-user-info'>
                    <div className='user-name-container'>
                        <span className='user-name'>{`${name}`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header