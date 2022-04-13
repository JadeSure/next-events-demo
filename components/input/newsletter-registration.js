import classes from './newsletter-registration.module.css';
import {useRef, useContext} from 'react'

import {NotificationContext} from '../../store/notification-context'

function NewsletterRegistration() {
  const emailRef = useRef()
  const notificationCtx = useContext(NotificationContext)


  function registrationHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter..',
      status: 'pending'
    })

    // fetch user input (state or refs)
    fetch('/api/newsletter', {
      method: 'POST', 
      body: JSON.stringify({email: emailRef.current.value}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data =>{
      console.log(data);
      notificationCtx.showNotification({
        title: 'Success!', 
        message: 'Successfully registered for newsletter',
        status: 'success'
      })
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error!', 
        message: error.message || 'sth went wrong', 
        status: 'error'
      })
    })

    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
