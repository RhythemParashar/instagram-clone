import React, { useState } from 'react';
import './Header.css';
import Avatar from '@material-ui/core/Avatar';
import { Button, Input } from '@material-ui/core';
import { auth } from '../firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from '../ImageUpload/ImageUpload'

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function Header( { user } ) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalStyle] = useState(getModalStyle);
    const [imageUpload, setImageUpload] = useState(false); 

    const signIn = (event) => {
        event.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message));
    

        setEmail('');
        setPassword('');
        setOpenSignIn(false);
    }

    const signUp = (event) => {
        event.preventDefault();
    
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) => alert(error.message));

        setEmail('');
        setPassword('');
        setOpen(false); 
    }


    return (
        
        <div className="header">

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img
                            className="app__headerImage"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                        />
                    </center>
                    <form className="app__signup">
                        <Input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>


            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <center>
                        <img
                            className="app__headerImage"
                            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                            alt=""
                        />
                    </center>
                    <form className="app__signup"> 
                        <Input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={imageUpload}
                onClose={() => setImageUpload(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="imageupload__modal"
            >
                <div>
                    { user && (
                        <ImageUpload username={user.displayName} />
                    ) 
                    }
                </div>
            </Modal>

            <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
            />
            {user && (
                    <Button onClick={ () => setImageUpload(true)}>Upload</Button>
                ) 
            }

            {
                user ? (
                <div className="header__left">
                    <Avatar
                        className="post__avatar"
                        alt={user.displayName}
                        src="/static/images/avatar/1.jpg"            
                    />
                    <h3 className="header__user">{user.displayName}</h3>
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                </div>
                ) : (
                <div className="header__loginContainer">
                    <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
                
                )
            }
        </div>
    )
}

export default Header
