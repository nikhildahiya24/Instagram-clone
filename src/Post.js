import React, { useEffect, useState } from "react";
import "./Post.css";
import { db } from "./firebase";
import Avatar from "@mui/material/Avatar";
import firebase from "firebase/compat/app";
function Post(props) {
  const {user, postId, username, caption, imgUrl } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc)=>doc.data()))
        });
       
    };
     return () => {
       unsubscribe();
     };
  },[postId]);
  const postComment=(event)=>{
     event.preventDefault();

   db.collection("posts").doc(postId).collection("comments").add({
     text: comment,
     username: user.displayName,
     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
   });
setComment('');
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--goETGOXU--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/x3x5w638kkixi9s3h3vw.gi"
        />
        <h3>{username}</h3>
      </div>
      <img src={imgUrl} alt="" className="post__image" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

     <div className="post__comments">
      {comments.map((comm)=><p><strong>{comm.username}</strong> {comm.text}</p>)}
      
     </div>
     {user && (

      <form className="post__commentBox">
        <input
         className="post__comment"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        />
        <button
          className="post__button"
          type="submit"
          disabled={!comment}
          onClick={postComment}
        >Post</button>
        </form>
     )}
    </div>
  );
}

export default Post;
