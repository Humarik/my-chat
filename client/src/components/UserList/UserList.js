import React from 'react';
import './userList.css';

function userList({data}) {
    return(
        <div className='user-list-container'>
            <h3 className='online'>Online</h3>
            <ul className='user-list'>
                {data.map((user, index) => <li className='user' key={index}>{user.name}</li>)}
            </ul>
        </div>
    )
}

export default userList;