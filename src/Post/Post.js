import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from 'firebase';
import Comment from '../Comment/Comment.js';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ThumbUp } from '@material-ui/icons'
import { Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const options = [
    'delete'
];

const ITEM_HEIGHT = 48;

function Post({ postId, user, username, caption, imageUrl }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const deletePost = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId).delete()
        .then(() => {
            console.log('successfully deleted the post');
        })
        .catch((error) => alert(error.message));
        setAnchorEl(null);
    };

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        comment: doc.data()
                    })));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);


    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    

    return (
        <div className="post">
            {/* Header -> avatar + username */}
            <div className="post__header">
                <div className="post__avatarleft">
                    <Avatar
                        className="post__avatar"
                        alt={username}
                        src="/static/images/avatar/1.jpg"            
                    />
                </div>
                <div className="post__usernamemiddle">
                    <h3>{username}</h3>
                </div>
                { user && user.displayName===username && (
                    <div className="post__menuright">
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                            }}
                        >
                            {options.map((option) => (
                            <MenuItem key={option} selected={option === 'Pyxis'} onClick={deletePost}>
                                {option}
                            </MenuItem>
                            ))}
                        </Menu>
                    </div>
                )}
                
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="img"
            />
            {/* Image */}

            <div className="post__icon">
                <Button>
                    <ThumbUp />
                </Button>
                <Button className="post__commentbutton">
                    <FontAwesomeIcon className="icon" icon={faComment} />
                </Button>
            </div>
            
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
            {/* username + caption */}

            <div className="post__comments">
                {
                    comments.map(({id, comment}) => (
                        <Comment postId={postId} commentId={id} user={user} username={comment.username} text={comment.text} />
                    ))
                }              
            </div>

            { user && (
                <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={ (e) => setComment(e.target.value) }
                    />

                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>

            )}

            
        </div>
    )
}

export default Post

