import React, { useContext, useRef, useState } from 'react';
import { UserContext } from './context/userContext';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [validation, setValidation] = useState('')

    const { toggleModals, modalState, signUp } = useContext(UserContext);

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
        if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation('6 characters minimum');
            return
        }
        if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation('passwords do not match')
            return
        }

        try {

            const cred = await signUp(inputs.current[0].value, inputs.current[1].value);
            formRef.current.reset();

            setValidation('');
            console.log(cred);
            closeModal()
            navigate('/private/private-home')
        } catch (error) {
            console.dir(error);
            if (error.code === 'auth/email-already-in-use') {
                setValidation('user already exists')
            } else if (error.code === 'auth/invalid-email') {
                setValidation('email is invalid')
            }
        }
    }

    const closeModal = () => {
        setValidation('');
        toggleModals('close');
    }

    return (
        <>
            {
                modalState.signUpModal && (
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
                                                <label htmlFor="signUpEmail" className='form-label'>Email address</label>
                                                <input type="email" name="email" id="signUpEmail" required className="form-control" ref={addInputs} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="signUpPwd" className='form-label'>Password</label>
                                                <input type="password" name="pwd" id="signUpPwd" className='form-control' required ref={addInputs} />
                                            </div>
                                        </form>
                                        <div className="mb-3">
                                            <label htmlFor="repeatPwd" className='form-label'>Repeat Password</label>
                                            <input type="password" name="repeatPwd" id="repeatPwd" className='form-control' required ref={addInputs} />
                                        </div>
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
