import { useState, useEffect, useContext} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

import Notification from '../notification/notification'

import {NotificationContext} from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext)
  

  useEffect (()=>{
    if(showComments){
      fetch('/api/comments/' + eventId )
      .then(response => response.json())
      .then(data => {
        setComments(data.comments)
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: `${commentData.email}, ${commentData.name}`,
      message: 'Conmments is publishing',
      status: 'pending'
    })
    
    // send data to API
    fetch('/api/comments/'+eventId, {
      method: 'POST',
      body: JSON.stringify({commentData}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      notificationCtx.showNotification({
        title: `${commentData.email}, ${commentData.name}`,
        message: 'Conmments is published',
        status: 'success'
      })
      // console.log(comments, 666666);
    setComments([...comments, data.comment])
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error!', 
        message: error.message || 'sth went wrong', 
        status: 'error'
      })
    })

  }


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
      {/* {notificationCtx.notification && <Notification />} */}
    </section>
  );
}

export default Comments;
