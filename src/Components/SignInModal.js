import React, { useContext, useRef, useState } from 'react';
import { UserContext } from './context/userContext';
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
    const [validation, setValidation] = useState('')

    const { toggleModals, modalState, signIn } = useContext(UserContext);

    const navigate = useNavigate();

    const inputs = useRef([]);
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            await signIn(inputs.current[0].value, inputs.current[1].value);

            setValidation('');
            closeModal()
            navigate('/private/private-home')
        } catch {
            setValidation('Problem with login')
        }
    }

    const closeModal = () => {
        setValidation('');
        toggleModals('close');
    }

    return (
        <>
            {
                modalState.signInModal && (
                    <div className='position-fixed top-0 vw-100 vh-100'>
                        <div className='w-100 h-100 bg-dark bg-opacity-75'
                            onClick={closeModal}
                        >
                        </div>
                        <div
                            className='position-absolute top-50 start-50 translate-middle bg-light'
                            style={{ minWidth: 400 }}
                        >
                            <div className='modal-dialog p-3'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className="modal-title">Sign up</h5>
                                        <button className="btn-close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="sign-up-form" onSubmit={handleForm} ref={formRef}>
                                            <div className="mb-3">
                                                <label htmlFor="signInEmail" className='form-label'>Email address</label>
                                                <input type="email" name="email" id="signInEmail" required className="form-control" ref={addInputs} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="signInPwd" className='form-label'>Password</label>
                                                <input type="password" name="pwd" id="signInPwd" className='form-control' required ref={addInputs} />
                                            </div>
                                        </form>
                                    </div>
                                    <p className="text-danger mt-1">{validation}</p>
                                    <button className="btn btn-primary" type='submit' onClick={handleForm}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </>
    )
}
