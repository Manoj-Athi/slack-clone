import { useState } from 'react';
import axios from 'axios';
import slackLogo from '../../images/slack_logo.svg'
import googleLogo from '../../images/google_icon.svg'
import './auth.css'

const Auth = () => {

    const [ switchSignup, setSwitchSignup ] = useState(true)
    const [ email, setEmail ] = useState(true)
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState('')

    const handleSwitch = () => {
        setSwitchSignup(false)
    }

    const handleGoogleSubmit = (e) => {
        e.preventDefault()
        window.open('http://localhost:5000/auth/google', '_self');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        if(!email){
            setError('Oops, you haven\'t entered an email')
        }else if( !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) ){
            setError('Oops, you have entered an invalid email')
        }else{
            const { data } = await axios.post('http://localhost:5000/auth/email', { email }, { withCredentials: true})
            if(data?.status === 'SUCCESS'){
                setMessage(data?.message)
            }else if(data?.status === 'FAILURE'){
                setError(data?.message)
            }
        }
    }

    return (
    <div className='auth-container'>
        <header className='auth-header'>
            <div></div>
            <div><img src={slackLogo} alt="Slack Icon" width='130'/></div>
            {
                switchSignup === true && (
                <aside className='auth-aside'>
                    <p>New to Slack?</p>
                    <button onClick={handleSwitch}>Create an account</button>
                </aside>
                )
            }
        </header>
        <section className='auth-section'>
            <h1>{ switchSignup ? 'Sign in to Slack' : 'First, enter your email' }</h1>
            <p>We suggest using the email address you use at work.</p>
            { switchSignup &&
                <form onSubmit={handleGoogleSubmit}>
                    <button type='submit' className='google-btn'>
                        <img src={googleLogo} alt="google logo" width="20"/>
                        <p>Sign in with Google</p>
                    </button>
                </form>
            }
            { switchSignup &&
                <div className='or-container'>
                    <hr />
                    <p>OR</p>
                    <hr />
                </div>
            }
            <form onSubmit={handleSubmit} className='auth-form'>
                <input type="email" placeholder='name@work-email.com' className='auth-mail' onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="submit" value={switchSignup ? 'Sign In with Email' : 'Sign Up with Email'} className='auth-submit-btn'/>
                {
                    !switchSignup && (
                        <div>
                            <input type="checkbox" />
                            <label style={{paddingLeft:"10px"}}>It’s okay to send me emails about Slack.</label>
                        </div>
                    )
                }
            </form>
            { error && <div className='form-error'>{error}</div> }
            { message && <div className='form-message'>{message}</div> }
            {
                switchSignup ? (
                    <p className='section-p'>We’ll email you a magic code for a password-free<br />sign in. Or you can sign in manually instead.</p>
                ) : (
                    <p style={{color: 'rgb(92 90 92)' }}>By continuing, you’re agreeing to our Customer Terms<br /> of Service, Privacy Policy, and Cookie Policy.</p>
                )
            }
        </section>
        <footer className='footer-container'>
            <p>Privacy & Terms</p>
            <p>Contact Us</p>
            <p>Change region</p>
        </footer>
    </div>
    );
};

export default Auth;
