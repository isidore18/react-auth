import React, { useContext } from 'react';
import { UserContext } from '../Components/context/userContext';

export default function Home() {

    const { currentUser } = useContext(UserContext)

    return (
        <div className='container p-5'>
            <h1 className='display-3 text-light'>
                {currentUser ? 'welcome man' : 'Hi, sign up or sign in'}
            </h1>
        </div>
    )
}
