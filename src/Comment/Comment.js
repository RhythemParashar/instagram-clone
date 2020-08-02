import React from 'react';
import { db } from '../firebase';
import './Comment.css';

function Comments( { postId, commentId, user, username, text } ) {

    const deleteComment = (event) => {
        event.preventDefault();
        
        db.collection('posts').doc(postId).collection('comments').doc(commentId).delete()
        .then(() => {
            console.log('Successfully deleted');
        })
        .catch((error) => alert(error.message));
    }

    return (
        <div className="comment">
            <div className="comment__username">
                <p><strong>{username}</strong></p>
            </div>
            <div className="comment__text">
                <p>{text}</p>
            </div> 
            { user && user.displayName===username && (
                <div className="comment__button">
                    <button 
                        className="comment__deletebutton"
                        type="submit"
                        onClick={deleteComment}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default Comments
