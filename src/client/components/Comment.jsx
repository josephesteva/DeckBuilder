import React from 'react'

function Comment({ comment, userId }) {
  // console.log(comment)
  return (
    <>
      <div style={{ border: "solid black .1em", margin: ".5em" }} key={comment.id} >
        <p> {comment.content}</p>
        <p> Posted by {comment.user.username} on {comment.date.slice(0, 10)}</p>
        <button>Edit comment</button>
      </div>
    </>
  )
}

export default Comment