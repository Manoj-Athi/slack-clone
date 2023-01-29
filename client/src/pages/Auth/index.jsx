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

    // return (
    // <div className='auth-container flex items-center justify-center p-12'>
    //     <div className='mx-auto w-full max-w-[550px]'>
    //         <header className='auth-header'>
    //             <div><img src={slackLogo} alt="Slack Icon" width='130'/></div>
    //             {
    //                 switchSignup === true && (
    //                 <aside className='auth-aside'>
    //                     <p>New to Slack?</p>
    //                     <button onClick={handleSwitch}>Create an account</button>
    //                 </aside>
    //                 )
    //             }
    //         </header>
    //         <section className='auth-section'>
    //             <h1>{ switchSignup ? 'Sign in to Slack' : 'First, enter your email' }</h1>
    //             { switchSignup &&
    //                 <form onSubmit={handleGoogleSubmit}>
    //                     <button type='submit' className='google-btn'>
    //                         <img src={googleLogo} alt="google logo" width="20"/>
    //                         <p>Sign in with Google</p>
    //                     </button>
    //                 </form>
    //             }
    //             { switchSignup &&
    //                 <div className='or-container'>
    //                     <hr />
    //                     <p>OR</p>
    //                     <hr />
    //                 </div>
    //             }
    //             <form onSubmit={handleSubmit} className='auth-form'>
    //                 <input type="email" placeholder='name@work-email.com' className='auth-mail' onChange={(e) => setEmail(e.target.value)} /><br />
    //                 <input type="submit" value={switchSignup ? 'Sign In with Email' : 'Sign Up with Email'} className='auth-submit-btn'/>
    //                 {
    //                     !switchSignup && (
    //                         <div>
    //                             <input type="checkbox" />
    //                             <label style={{paddingLeft:"10px"}}>It’s okay to send me emails about Slack.</label>
    //                         </div>
    //                     )
    //                 }
    //             </form>
    //             { error && <div className='form-error'>{error}</div> }
    //             { message && <div className='form-message'>{message}</div> }
    //         </section>
    //     </div>
    // </div>
    // );

    return (
        <div className='auth-container flex flex-col items-center justify-center p-12'>
            <img src={slackLogo} alt="Slack Icon" width='130'/>
            <h1 className='m-3 text-4xl block font-bold'>Sign in</h1>
            <div className="mx-auto w-full max-w-[400px]">
                <form onSubmit={handleGoogleSubmit} className="mt-3 mb-3">
                    <button type='submit' className="flex items-center justify-center w-full hover:shadow-form rounded-md bg-white py-3 px-8 text-base border border-[#4a154be6] font-semibold text-white outline-none hover:shadow-md">
                        <img src={googleLogo} alt="google logo" width="20"/>
                        <p className='ml-3 mr-3 block text-base font-bold text-black'>Sign in with Google</p>
                    </button>
                </form>
                <div className='flex items-center mt-1 mb-1'>
                    <hr className='w-[200px] border-[#ddd]'/>
                    <p className='text-semibold text-xl ml-2 mr-2'>or</p>
                    <hr className='w-[200px] border-[#ddd]'/>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='name@work-email.com' onChange={(e) => setEmail(e.target.value)} 
                        className="w-full mt-3 mb-3 rounded-md border border-[#4a154be6] bg-white py-3 px-6 text-base font-medium text-[#4a154be6] outline-none focus:border-[#4a154be6] focus:shadow-md"/><br />
                    <input type="submit" value={switchSignup ? 'Sign In with Email' : 'Sign Up with Email'} 
                    className="w-full mt-3 mb-3 hover:shadow-form rounded-md bg-[#4a154be6] py-3 px-8 text-base font-semibold text-white outline-none hover:shadow-lg"/>
                </form>
                { error && <div className='form-error'>{error}</div> }
                { message && <div className='form-message'>{message}</div> }
            </div>
        </div>
    );
};

export default Auth;
