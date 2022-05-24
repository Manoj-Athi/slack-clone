import { useState, useEffect } from 'react'

import slackLogo from '../../images/slack_logo.svg'
import gmailLogo from '../../images/gmail-logo.svg'
import outlookLogo from '../../images/outlook-logo.svg'
import styles from './confirmEmail.module.css'

const ConfirmEmail = () => {

    // const [input, setInput] = useState('')
    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const [input5, setInput5] = useState('')
    const [input6, setInput6] = useState('')
    const [error, setError] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        var input = input1 + input2 + input3 + input4 + input5 + input6
        if(input.length !== 6){
            setError('Enter 6 digits')
            alert(error)
        }else if((/d/g).test(input)){
            setError('Enter only numbers')
            alert(error)
        }else{
            // console.log(input)
            setError('')
        }
    }
    
    //----------------------- Alert error ------------------------//
    // const delay = 7000
    // let timer = null;

    // useEffect(() => {
    //     setTimer();
    // }, [error]);

    // function setTimer() {
    // // clear any existing timer
    // if (timer != null) {
    //     clearTimeout(timer)
    // }

    // timer = setTimeout(() => {
    //     setError('');
    //     timer = null;
    // }, delay);
    // }


  return (
    <div className={styles.container}>
        <header className={styles.container__header}>
            <img src={slackLogo} alt="Slack Icon" width='130'/>
        </header>
        <section className={styles.container__section}>
            <div className={styles.container__div__1}>
                <h1>Check your email for a code</h1>
                <p>We’ve sent a 6-digit code to wehvdnsj@rnsvdlk.com. The code expires shortly, so please<br /> enter it soon.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.container__form}>
                <div></div>
                <input type='text' minLength={1} maxLength={1} onChange={(e) => setInput1(e.target.value)}/>
                <input type='text' minLength={1} maxLength={1} onChange={(e) => setInput2(e.target.value)}/>
                <input type='text' minLength={1} maxLength={1} onChange={(e) => setInput3(e.target.value)}/>
                <span>-</span>
                <input type='text' minLength={1} maxLength='1' onChange={(e) => setInput4(e.target.value)}/>
                <input type='text' minLength={1} maxLength='1' onChange={(e) => setInput5(e.target.value)}/>
                <input type='text' minLength={1} maxLength='1' onChange={(e) => setInput6(e.target.value)}/>
                <input type="submit" style={{visibility: "hidden"}}/>
            </form>
            {/* { error && <p>{error}</p> } */}
            <div className={styles.container__div__3}>
                <a href='https://mail.google.com' target='_blank' rel="noreferrer">
                    <img src={gmailLogo} alt="Gmail logo" width='40'/>
                    <p>Open Gmail</p>
                </a>
                <a href='https://outlook.live.com' target='_blank' rel="noreferrer">
                    <img src={outlookLogo} alt="Outlook logo" width='50'/>
                    <p>Open Outlook</p>
                </a>
            </div>
            <div className={styles.container__div__4}>
                <p>Can’t find your code? Check your spam folder!</p>
            </div>
        </section>
        <footer className='footer-container'>
            <p>Privacy & Terms</p>
            <p>Contact Us</p>
        </footer>
    </div>
  )
}

export default ConfirmEmail