import React, { useState, useEffect } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import './App.css';
import { db, auth } from './firebase';
import Post from './Post/Post';
import Header from './Header/Header'



function App() {

  const [posts, setPosts] = useState([]);
  const [username] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        //user has loggedIn
        console.log(authUser);
        setUser(authUser);

      } else {
        // user has logged out
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);


  return (
    <div className="app">

      <div>
        <Header user={user} />
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({ id, post }) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>

        <div className="app__postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/CDVbOUwF95Q/?utm_source=ig_web_button_share_sheet'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
        
      </div>
    </div>
  );
}

export default App;
