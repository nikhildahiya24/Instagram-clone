import Post from "./Post";
import "./App.css";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";

import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name,setName]=useState('');
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);

        
        setUser(authUser);
        setName(authUser.displayName);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  },[user]);
  useEffect(() => {
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
      
      setOpen(false);
     
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
      setSignIn(false);
      
    
  };
 
   
      
      
  
  return (
    <div className="app">
      <Modal open={open} onClose={handleClose}>
        <div style={style}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1"
                alt=""
                className="app__headerImage"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={signUp}>SignUp</Button>
          </form>
        </div>
      </Modal>
      <Modal open={openSignIn} onClose={() => setSignIn(false)}>
        <div style={style}>
          <form className="app__signup">
            <center>
              <img
                src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1"
                alt=""
                className="app__headerImage"
              />
            </center>

            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={signIn}>Log In</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https://www.dafont.com/forum/attach/orig/7/3/737566.png?1"
          alt=""
          className="app__headerImage"
        />
        {user ? (
          <div>
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <h2>{name}</h2>
          </div>
        ) : (
          <div className="app__logincontainer">
            <Button onClick={() => setSignIn(true)}>SignIn</Button>
            <Button onClick={() => handleOpen()}>SignUp</Button>
          </div>
        )}
      </div>
      <div className="app_posts">
        <div className="app_postLeft">
          {posts.map(({ id, post }) => {
            return (
              <Post
              user={user}
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imgUrl={post.imgUrl}
              />
            );
          })}
        </div>
        <div className="app_postRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/Zw9o4/"
            clientAccessToken="123|456"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={(err) => {}}
          />
        </div>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName}></ImageUpload>
      ) : (
        <div className="post__footer">Login to upload</div>
      )}
    </div>
  );
}

export default App;
