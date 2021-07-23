import React from 'react';

function Comments({ comments }) {
    let commentBox = comments.length > 0 && comments.map((arr, i) => (
        <div className={(i + 1) % 2 === 0 ? "comment-wrap light" : "comment-wrap"} key={arr.time}>
            <h3><strong>{arr.username}</strong> says:</h3>
            <p>{arr.comment.split('\n').map((x, i) => <React.Fragment key={i.toString()}>{x}<br /></React.Fragment>)}</p>
            <small>{arr.time}</small>
        </div>
    ));
    return (
        <div id="comment-box">{commentBox || 'no comments yet'}</div>
    );
}

export default Comments;