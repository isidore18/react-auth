import React, { useContext } from 'react';
import { UserContext } from './context/userContext';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';


export default function Navbar() {
    const { toggleModals } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            alert("could'nt logout, check and retry")
        }
    }

    return (
        <nav className='navbar navbar-light bg-light px-4'>
            <Link to="/" className='navbar-brand'>AuthJS</Link>
            <div>
                <button className='btn btn-primary' onClick={() => toggleModals('signUp')} >
                    Sign Up
                </button>
                <button className='btn btn-primary ms-2' onClick={() => toggleModals('signIn')} >
                    Sign In
                </button>
                <button className='btn btn-danger ms-2' onClick={logout}>
                    Log Out
                </button>
            </div>
        </nav>
    )
}
